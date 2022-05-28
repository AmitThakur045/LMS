import React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  ColumnSeries,
  DataLabel,
} from "@syncfusion/ej2-react-charts";

const BarGraph = ({ barCustomSeries, barPrimaryXAxis, barPrimaryYAxis }) => {
  return (
    <ChartComponent
      id="charts"
      primaryXAxis={barPrimaryXAxis}
      primaryYAxis={barPrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      legendSettings={{ background: "white" }}>
      <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]} />
      <SeriesCollectionDirective>
        {barCustomSeries.map((item, index) => (
          <SeriesDirective key={index} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default BarGraph;
