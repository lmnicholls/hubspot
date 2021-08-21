import React from "react";
import { useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import cylinder from "highcharts/modules/cylinder";
import highcharts3d from "highcharts/highcharts-3d";

export default function StatusGraph() {
  let yy = {};
  const deals = useSelector((state) => state.deals).map((deal) => {
    if (
      yy[deal.stage.status.toLowerCase()] === undefined ||
      yy[deal.stage.status.toLowerCase()] === 0
    ) {
      return (yy[deal.stage.status.toLowerCase()] = 1);
    } else {
      return (yy[deal.stage.status.toLowerCase()] =
        yy[deal.stage.status.toLowerCase()] + 1);
    }
  });

  console.log(yy);
  // console.log(deals);
  // console.log(yy);

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
      text: "Deals Per Status",
    },
    plotOptions: {
      series: {
        depth: 25,
        colorByPoint: true,
      },
    },
    xAxis: {
      categories: Object.keys(yy),
    },
    series: [
      {
        data: Object.values(yy),
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
