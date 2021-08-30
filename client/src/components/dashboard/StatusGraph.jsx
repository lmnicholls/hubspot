import React from "react";
import { useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import cylinder from "highcharts/modules/cylinder";
import highcharts3d from "highcharts/highcharts-3d";

export default function StatusGraph() {
  let dealObject = {};
  const deals = useSelector((state) => state.deals);

  deals.map((deal) => {
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
      style: {
        fontFamily: "Quicksand",
        fontWeight: "bold",
      },
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 15,
        depth: 30,
        viewDistance: 100,
      },
    },
    title: {
      text: "Status of Deals",
    },
    plotOptions: {
      series: {
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
