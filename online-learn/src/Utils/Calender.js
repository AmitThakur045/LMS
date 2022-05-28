import React, { useState } from "react";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
// import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

const Scheduler = ({ scheduleData }) => {
  return (
    <ScheduleComponent
      height="620px"
      eventSettings={{ dataSource: scheduleData }}>
      <Inject
        services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}
      />
    </ScheduleComponent>
  );
};

export default Scheduler;
