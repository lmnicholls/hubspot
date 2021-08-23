import React from "react";
import { useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function DealsClosedVsLost() {
  const deals = useSelector((state) => state.deals);

  const count = function (ary, classifier) {
    classifier = classifier || String;
    return ary.reduce(function (counter, item) {
      var p = classifier(item);
      counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
      return counter;
    }, {});
  };

  const dealStatus = function (deal) {
    return deal.stage.status.toLowerCase();
  };

  const dealTypeCount = count(deals, dealStatus);

  const chartOptions = {
    chart: {
      type: "pie",
    },
    title: {
      verticalAlign: "top",
      text: "Deals Closed Won vs. Closed Lost",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      floating: true,
      borderWidth: 1,
      backgroundColor: "#FFFFFF",
      shadow: true,
      itemMarginTop: 5,
      itemMarginBottom: 5,
      x: 0,
      y: 40,
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
        name: "Percentage",
        data: [
          {
            y: dealTypeCount["Closed Won".toLowerCase()],
            name: "Closed Won: " + dealTypeCount["Closed Won".toLowerCase()],
          },
          {
            y: dealTypeCount["Closed Lost".toLowerCase()],
            name: "Closed Lost: " + dealTypeCount["Closed Lost".toLowerCase()],
          },
        ],
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
