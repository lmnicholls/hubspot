import React from "react";
import { useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_drilldown from "highcharts/modules/drilldown";
import moment from "moment";

export default function DaysToCloseDeals() {
  HC_drilldown(Highcharts);

  const deals = useSelector((state) => state.deals);

  const dealsWonObject = {};

  const dealsByUser = deals.forEach((deal) => {
    if (deal.stage.status.toUpperCase() === "CLOSED WON") {
      let dateCreated = moment(deal.dateCreated, "YYYY-MM-DD");
      let dateClosed = moment(deal.lastActivityDate, "YYYY-MM-DD");
      let elapsedTime = moment.duration(dateClosed.diff(dateCreated)).asDays();

      if (dealsWonObject[deal.user] === undefined) {
        dealsWonObject[deal.user] = [elapsedTime];
      } else {
        dealsWonObject[deal.user].push(elapsedTime);
      }
    }
  });

  let dealDaysToCloseArray = Object.values(dealsWonObject);
  let AvgDealDaysToClose = dealDaysToCloseArray.forEach((dealArray) => {
    let totalDays = 0;
    for (let i = 0; i < dealArray.length; i++) {
      totalDays += i;
      let numDeals = dealArray.length;
    }
  });

  const chartOptions = {
    chart: {
      type: "column",
    },
    title: {
      verticalAlign: "top",
      text: "Average Time to Close a Deal",
    },
    yAxis: {
      title: {
        text: "Days to Close",
      },
    },

    xAxis: {
      title: {
        text: "Owner",
      },
      categories: Object.keys(dealsWonObject),
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        data: Object.entries(dealsWonObject),
      },
    ],
  };

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        oneToOne={true}
      />
    </>
  );
}
