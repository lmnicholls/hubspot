import React from "react";
import { useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_drilldown from "highcharts/modules/drilldown";

export default function DealsClosedVsLost() {
  HC_drilldown(Highcharts);

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

  const dealsLostObject = {};
  const dealsLost = deals.filter((deal) => {
    if (deal.stage.status.toUpperCase() === "CLOSED LOST") {
      return (dealsLostObject[deal.company.companyName] = deal.amount);
    }
  });

  const dealsWonObject = {};
  const dealsWon = deals.filter((deal) => {
    if (deal.stage.status.toUpperCase() === "CLOSED WON") {
      return (dealsWonObject[deal.company.companyName] = deal.amount);
    }
  });
  console.log(dealsWon);
  console.log(Object.entries(dealsWonObject));

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
      align: "left",
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
            drilldown: "closed won",
          },
          {
            y: dealTypeCount["Closed Lost".toLowerCase()],
            name: "Closed Lost: " + dealTypeCount["Closed Lost".toLowerCase()],
            drilldown: "closed lost",
          },
        ],
      },
    ],
    drilldown: {
      series: [
        {
          id: "closed won",
          data: Object.entries(dealsWonObject),
        },
        {
          id: "closed lost",
          data: Object.entries(dealsLostObject),
        },
      ],
    },
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
