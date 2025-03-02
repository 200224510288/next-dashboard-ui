"use client"

import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar'
import moment from 'moment'
import { calendarEvents } from '@/lib/data'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useState } from 'react'

const localizer = momentLocalizer(moment)

const BigCalendar = () => {
    const [view, setView] = useState<View>(Views.WORK_WEEK); // Set the initial view as WORK_WEEK
  
    const handleonViewChange = (selectview: View) => {
        setView(selectview);
    }
    return (
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          views={["work_week", "day"]} // Available views for the calendar
          view={view} // Bind the current view state to the Calendar
          onView={handleonViewChange} // Handle the view change event
          style={{ height: "98%" }}
          min={new Date(2026, 1, 0, 8, 0, 0)} // Set the minimum time for the calendar
          max={new Date(2026, 1, 0, 17, 0, 0)} // Set the maximum time for the calendar
        />
    );
  };
  
  export default BigCalendar;
