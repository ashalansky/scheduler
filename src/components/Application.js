import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import axios from "axios";
import "components/Application.scss";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview } from "../helpers/selectors.js";



export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  useEffect(() => {
    const apiDays = axios.get("/api/days");
    const apiAppt = axios.get("/api/appointments");
    const apiInt = axios.get("/api/interviewers");
    
    Promise.all([apiDays, apiAppt, apiInt])
    .then((all)=> {
      
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, []);

  const appointments = getAppointmentsForDay(state, state.day);

  const ScheduleList = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
   
    return (
     <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
  <DayList
    days={state.days}
    day={state.day}
    setDay={setDay}
  />
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
  </section>
    <section className={"schedule"}>
      {ScheduleList}
      <Appointment key="last" time="5pm" />
    </section>
  </main>
  );
}

