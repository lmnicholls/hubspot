import React from "react";
import { useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import cylinder from "highcharts/modules/cylinder";
import highcharts3d from "highcharts/highcharts-3d";

export default function StatusGraph() {
  let dealObject = {};
  const deals = useSelector((state) => state.deals).map((deal) => {
    if (
      dealObject[deal.stage.status.toUpperCase()] === undefined ||
      dealObject[deal.stage.status.toUpperCase()] === 0
    ) {
      return (dealObject[deal.stage.status.toUpperCase()] = 1);
    } else {
      return (dealObject[deal.stage.status.toUpperCase()] =
        dealObject[deal.stage.status.toUpperCase()] + 1);
    }
  });

  highcharts3d(Highcharts);
  cylinder(Highcharts);

  const chartOptions = {
    chart: {
      type: "cylinder",
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 15,
        depth: 50,
        viewDistance: 25,
      },
    },
    title: {
      text: "Status of Deals",
    },
    plotOptions: {
      series: {
        depth: 25,
        colorByPoint: true,
      },
    },
    xAxis: {
      categories: Object.keys(dealObject),
    },
    yAxis: {
      title: {
        text: "# of Deals",
      },
    },
    series: [
      {
        data: Object.values(dealObject),
        name: "Deals",
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
