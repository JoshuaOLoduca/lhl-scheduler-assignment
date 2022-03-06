import React from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import Status from "./Appointment/Status";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

import "components/Application.scss";

export default function Application(props) {
  // Loading in state and state helpers
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview,
    deleteInterviewUpdate,
  } = useApplicationData();

  // Getting interviewers for currently selected days
  // Used to populate interviewers list on interview creation/edit
  const interviewersForDay = getInterviewersForDay(state, state.day);

  // Geting appointment slots/interview-id for current day
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // Turning scheduled appointments to have relevent interview data
  // Returns array
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        {...appointment}
        key={appointment.id}
        interview={interview}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
        interviewers={interviewersForDay}
        deleteUpdate={() => deleteInterviewUpdate(appointment.id)}
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

        {/* Passing state stuff to days list */}
        <DayList days={state.days} value={state.day} onChange={setDay} />

        <nav className="sidebar__menu"></nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Inserting array of appointments here */}
        {schedule}
        {state.fetchingData ? (
          <Status message="Loading Data" />
        ) : (
          <Appointment key="last" time="5pm" />
        )}
      </section>
    </main>
  );
}
