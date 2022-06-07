import React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  DateTime,
  Legend,
  Tooltip,
  Category,
} from "@syncfusion/ej2-react-charts";

const LineGraph = ({
  lineCustomSeries,
  LinePrimaryXAxis,
  LinePrimaryYAxis,
  chartId,
  height,
  width,
}) => {

  console.log(lineCustomSeries);

  return (
    <ChartComponent
      id={chartId}
      height={height}
      width={width}
      primaryXAxis={LinePrimaryXAxis}
      primaryYAxis={LinePrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      legendSettings={{ background: "white" }}>
      <Inject services={[LineSeries, DateTime, Legend, Tooltip, Category]} />
      <SeriesCollectionDirective>
        {lineCustomSeries.map((item, index) => (
          <SeriesDirective key={index} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineGraph;
