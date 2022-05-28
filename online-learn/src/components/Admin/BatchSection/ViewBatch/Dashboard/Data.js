const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const lineChartData1 = [
  [
    { x: month[new Date(2022, 0, 1).getMonth()], y: 21 },
    { x: month[new Date(2022, 1, 1).getMonth()], y: 24 },
    { x: month[new Date(2022, 2, 1).getMonth()], y: 36 },
    { x: month[new Date(2022, 3, 1).getMonth()], y: 38 },
    { x: month[new Date(2022, 4, 1).getMonth()], y: 54 },
    { x: month[new Date(2022, 5, 1).getMonth()], y: 57 },
    { x: month[new Date(2022, 6, 1).getMonth()], y: 70 },
    { x: month[new Date(2022, 7, 1).getMonth()], y: 0 },
    { x: month[new Date(2022, 8, 1).getMonth()], y: 0 },
    { x: month[new Date(2022, 9, 1).getMonth()], y: 0 },
    { x: month[new Date(2022, 10, 1).getMonth()], y: 0 },
    { x: month[new Date(2022, 11, 1).getMonth()], y: 0 },
  ],
];

export const lineCustomSeries1 = [
  {
    dataSource: lineChartData1[0],
    xName: "x",
    yName: "y",
    name: "Feedback",
    width: "2",
    marker: { visible: true, width: 10, height: 10 },
    type: "Line",
  },
];

export const LinePrimaryXAxis1 = {
  valueType: "Category",
  labelFormat: "y",
  intervalType: "Months",
  edgeLabelPlacement: "Shift",
  majorGridLines: { width: 0 },
  background: "white",
};

export const LinePrimaryYAxis1 = {
  labelFormat: "{value}%",
  rangePadding: "None",
  minimum: 0,
  maximum: 100,
  interval: 20,
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
};

export const lineChartData2 = [
  [
    { x: month[new Date(2022, 0, 1).getMonth()], y: 100 },
    { x: month[new Date(2022, 1, 1).getMonth()], y: 120 },
    { x: month[new Date(2022, 2, 1).getMonth()], y: 153 },
    { x: month[new Date(2022, 3, 1).getMonth()], y: 210 },
    { x: month[new Date(2022, 4, 1).getMonth()], y: 220 },
    { x: month[new Date(2022, 5, 1).getMonth()], y: 274 },
    { x: month[new Date(2022, 6, 1).getMonth()], y: 321 },
    { x: month[new Date(2022, 7, 1).getMonth()], y: 0 },
    { x: month[new Date(2022, 8, 1).getMonth()], y: 0 },
    { x: month[new Date(2022, 9, 1).getMonth()], y: 0 },
    { x: month[new Date(2022, 10, 1).getMonth()], y: 0 },
    { x: month[new Date(2022, 11, 1).getMonth()], y: 0 },
  ],
];

export const lineCustomSeries2 = [
  {
    dataSource: lineChartData2[0],
    xName: "x",
    yName: "y",
    name: "Students",
    width: "2",
    marker: { visible: true, width: 10, height: 10 },
    type: "Line",
  },
];

export const LinePrimaryXAxis2 = {
  valueType: "Category",
  labelFormat: "y",
  intervalType: "Months",
  edgeLabelPlacement: "Shift",
  majorGridLines: { width: 0 },
  background: "white",
};

export const LinePrimaryYAxis2 = {
  labelFormat: "{value}",
  rangePadding: "None",
  minimum: 0,
  maximum: 500,
  interval: 50,
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
};
