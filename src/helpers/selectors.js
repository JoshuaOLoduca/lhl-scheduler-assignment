export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const appointmentsForDay = [];

  state.days.forEach((item) => {
    if (item.name === day) {
      item.appointments.forEach((id) =>
        appointmentsForDay.push(state.appointments[id])
      );
    }
  });

  return appointmentsForDay;
}
export function getInterview(state, appointment) {
  let interview = null;

  if (appointment && appointment.interviewer) {
    interview = {
      student: appointment.student,
      interviewer: state.interviewers[appointment.interviewer],
    };
  }
  return interview;
}
