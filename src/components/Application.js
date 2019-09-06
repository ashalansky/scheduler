import React from "react";
import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors.js";
import  useApplicationData  from "../hooks/useApplicationData";


export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  //const setDay = day => setState({ ...state, day });
  
  const appointments = getAppointmentsForDay(state, state.day);
  const ScheduleList = appointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);
  const interviewers = getInterviewersForDay(state, state.day);

    return (
     <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
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
      <Appointment
        key="last"
        time="5pm"
       />
    </section>
  </main>
  );
}

