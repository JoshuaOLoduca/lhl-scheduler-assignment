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
