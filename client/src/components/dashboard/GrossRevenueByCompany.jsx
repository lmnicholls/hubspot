import React from "react";
import { useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function GrossRevenueByCompany() {
  let dealObject = {};
  const deals = useSelector((state) => state.deals);

  deals
    .filter((deal) => deal.stage.status.toUpperCase() === "CLOSED WON")
    .map((deal) => {
      let currentCompany = deal.company.companyName;
      let dealAmount = deal.amount;
      return {
        company: currentCompany,
        dealAmount,
      };
    })
    .forEach((deal) => {
      if (dealObject[deal.company] === undefined) {
        dealObject[deal.company] = 0;

        return (dealObject[deal.company] += deal.dealAmount);
      } else {
        return (dealObject[deal.company] += deal.dealAmount);
      }
    });

  const chartOptions = {
    chart: {
      type: "column",
      style: {
        fontFamily: "Quicksand",
        fontWeight: "bold",
      },
    },
    title: {
      text: "Gross Revenue by Company",
    },
    xAxis: {
      categories: Object.keys(dealObject),
    },
    yAxis: {
      min: 0,
      title: {
        text: "Gross Revenue",
      },
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      column: {
        colorByPoint: true,
      },
    },
    series: [
      {
        name: "Gross Revenue",
        data: Object.values(dealObject).map((company) => company),
        showInLegend: false,
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
