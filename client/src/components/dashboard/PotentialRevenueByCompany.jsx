import React from "react";
import { useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function PotentialForRevenueByCompany() {
  let dealObject = {};
  const deals = useSelector((state) => state.deals);
  const stages = ["INITIATED", "QUALIFIED", "CONTRACT SENT"];

  deals
    .filter((deal) => stages.includes(deal.stage.status.toUpperCase()))
    .map((deal) => {
      let currentCompany = deal.company.companyName;
      let stageStatus = deal.stage.status.toUpperCase();
      let dealAmount = deal.amount;
      return {
        company: currentCompany,
        stageStatus,
        dealAmount,
      };
    })
    .forEach((deal) => {
      if (dealObject[deal.company] === undefined) {
        dealObject[deal.company] = [0, 0, 0];

        if (deal.stageStatus.toUpperCase() === "INITIATED") {
          return (dealObject[deal.company][0] += deal.dealAmount);
        }
        if (deal.stageStatus.toUpperCase() === "QUALIFIED") {
          return (dealObject[deal.company][1] += deal.dealAmount);
        }
        if (deal.stageStatus.toUpperCase() === "CONTRACT SENT") {
          return (dealObject[deal.company][2] += deal.dealAmount);
        }
      } else {
        if (deal.stageStatus.toUpperCase() === "INITIATED") {
          return (dealObject[deal.company][0] += deal.dealAmount);
        }
        if (deal.stageStatus.toUpperCase() === "QUALIFIED") {
          return (dealObject[deal.company][1] += deal.dealAmount);
        }
        if (deal.stageStatus.toUpperCase() === "CONTRACT SENT") {
          return (dealObject[deal.company][2] += deal.dealAmount);
        }
      }
    });

  const chartOptions = {
    chart: {
      type: "bar",
      style: {
        fontFamily: "Quicksand",
        fontWeight: "bold",
      },
    },
    title: {
      text: "Potential Revenue by Company",
    },
    xAxis: {
      categories: Object.keys(dealObject),
    },
    yAxis: {
      min: 0,
      title: {
        text: "Revenue ($)",
      },
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      series: {
        stacking: "normal",
      },
    },
    series: [
      {
        name: "INITIATED",
        data: Object.values(dealObject).map((status) => status[0]),
      },
      {
        name: "QUALIFIED",
        data: Object.values(dealObject).map((status) => status[1]),
      },
      {
        name: "CONTRACT SENT",
        data: Object.values(dealObject).map((status) => status[2]),
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
