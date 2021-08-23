import React from "react";
import { useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import cylinder from "highcharts/modules/cylinder";
import highcharts3d from "highcharts/highcharts-3d";

export default function OpportunityForRevenue() {
  let dealObject = {};
  const deals = useSelector((state) => state.deals);
  const stages = ["INITIATED", "QUALIFIED", "CONTRACT SENT"];

  deals
    .filter((deal) => stages.includes(deal.stage.status.toUpperCase()))
    .forEach((deal) => {
      if (
        dealObject[deal.stage.status.toUpperCase()] === undefined ||
        dealObject[deal.stage.status.toUpperCase()] === 0
      ) {
        return (dealObject[deal.stage.status.toUpperCase()] = deal.amount);
      } else {
        return (dealObject[deal.stage.status.toUpperCase()] =
          dealObject[deal.stage.status.toUpperCase()] + deal.amount);
      }
    });

  highcharts3d(Highcharts);
  cylinder(Highcharts);

  const chartOptions = {
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
      },
    },
    title: {
      text: "Opportunity for Revenue",
    },
    plotOptions: {
      pie: {
        innerSize: 100,
        depth: 45,
      },
      series: {
        dataLabels: {
          enabled: true,
          format: "{point.name} </br> $ {y}",
        },
      },
    },
    series: [
      {
        name: "Potential Revenue:",
        data: Object.entries(dealObject),
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
