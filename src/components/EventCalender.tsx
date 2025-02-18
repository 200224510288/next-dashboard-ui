"use client"

import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import Image from 'next/image';  // Import Image from next/image
 

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

//TEMPOARY DATA
const events = [
  {
    id: 1,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  }
];


const EventCalender = () => {
   const [value, onChange] = useState<Value>(new Date());

  return (
    <div className=''><Calendar onChange={onChange} value={value} />
        <div className="flex item-center justify-between">
        <h1>Events</h1>
        </div>

    <div className="flex flex-col gap-4">

      {events.map((event) => (
        <div key={event.id} className="">
          <div className="flex item-center justify-between">
          <h3>{event.title}</h3>
          <span>{event.time}</span>
          </div>
          <p>{event.description}</p>
        </div>
      ))}
    </div>

</div>
  );
}

export default EventCalender;