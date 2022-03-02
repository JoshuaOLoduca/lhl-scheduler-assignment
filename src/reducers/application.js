export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case SET_DAY:
      newState.day = action.value;
      return newState;
    case SET_APPLICATION_DATA:
      return { ...newState, ...action.value };
    case SET_INTERVIEW: {
      const { id, interview } = action.value;
      const appointment = {
        ...state.appointments[id],
        interview: interview ? { ...interview } : null,
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };

      newState = { ...newState, appointments };
      updateSpots(newState, id);

      return newState;
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }

  function updateSpots(myState, interviewId) {
    const dayIndex = myState.days.findIndex((day) =>
      day.appointments.includes(interviewId)
    );

    myState.days[dayIndex].spots = myState.days[dayIndex].appointments.reduce(
      (prev, cur) => {
        const interview = myState.appointments[cur].interview;
        if (!interview) return prev + 1;
        return prev;
      },
      0
    );
  }
}
