import React from "react";
import { useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_drilldown from "highcharts/modules/drilldown";

export default function DealsClosedVsLost() {
  HC_drilldown(Highcharts);

  const deals = useSelector((state) => state.deals);

  const count = function (deals, classifier) {
    classifier = classifier || String;
    return deals.reduce(function (counter, deal) {
      var p = classifier(deal);
      counter[p] = counter.hasOwnProperty(p)
        ? counter[p] + deal.amount
        : deal.amount;
      return counter;
    }, {});
  };

  const dealStatus = function (deal) {
    return deal.stage.status.toLowerCase();
  };

  const dealTypeAmount = count(deals, dealStatus);

  const dealsInitiatedObject = {};
  deals.forEach((deal) => {
    if (deal.stage.status.toUpperCase() === "INITIATED") {
      return (dealsInitiatedObject[deal.company.companyName] = deal.amount);
    }
  });

  const dealsQualifiedObject = {};
  deals.forEach((deal) => {
    if (deal.stage.status.toUpperCase() === "QUALIFIED") {
      return (dealsQualifiedObject[deal.company.companyName] = deal.amount);
    }
  });

  const dealsContractSentObject = {};
  deals.forEach((deal) => {
    if (deal.stage.status.toUpperCase() === "CONTRACT SENT") {
      return (dealsContractSentObject[deal.company.companyName] = deal.amount);
    }
  });

  const chartOptions = {
    chart: {
      type: "pie",
      style: {
        fontFamily: "Quicksand",
        fontWeight: "bold",
      },
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
      },
    },
    title: {
      verticalAlign: "top",
      text: "Opportunity for Revenue",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        depth: 35,
        dataLabels: {
          enabled: true,
          format: `{point.name}: $ {point.y}`,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: "Percentage",
        data: [
          {
            y: dealTypeAmount["Initiated".toLowerCase()],
            name: "Initiated",
            drilldown: "initiated",
          },
          {
            y: dealTypeAmount["Qualified".toLowerCase()],
            name: "Qualified",
            drilldown: "qualified",
          },
          {
            y: dealTypeAmount["Contract Sent".toLowerCase()],
            name: "Contract Sent",
            drilldown: "contract sent",
          },
        ],
      },
    ],
    drilldown: {
      series: [
        {
          id: "initiated",
          name: "Initiated",
          data: Object.entries(dealsInitiatedObject),
        },
        {
          id: "qualified",
          name: "Qualified",
          data: Object.entries(dealsQualifiedObject),
        },
        {
          id: "contract sent",
          name: "Contract Sent",
          data: Object.entries(dealsContractSentObject),
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
