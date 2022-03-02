export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const appointmentsForDay = [];

  for (const item of state.days) {
    if (item.name === day) {
      item.appointments.forEach((id) =>
        appointmentsForDay.push(state.appointments[id])
      );
      break;
    }
  }

  return appointmentsForDay;
}

export function getInterviewersForDay(state, day) {
  //... returns an array of appointments for that day
  const InterviewersForDay = [];

  for (const item of state.days) {
    if (item.name === day) {
      item.interviewers.forEach((id) => {
          InterviewersForDay.push(
            state.interviewers[id]
          );
      });

      break;
    }
  }

  return InterviewersForDay;
}

export function getInterview(state, appointment) {
  let interview = null;

  if (appointment && appointment.interviewer) {
    interview = {
      ...appointment,
      student: appointment.student,
      interviewer: state.interviewers[appointment.interviewer],
    };
  }
  return interview;
}
