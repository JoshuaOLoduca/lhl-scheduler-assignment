export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
export const UPDATE_INTERVIEW = "UPDATE_INTERVIEW";
export const DELETE_INTERVIEW_UPDATE = "DELETE_INTERVIEW_UPDATE";

export default function reducer(state, action) {
  // Deep clone of state
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    // Sets the current day
    case SET_DAY:
      // Setting current day to provided one
      newState.day = action.value;
      return newState;
    case SET_APPLICATION_DATA:
      delete newState.fetchingData;
      return { ...newState, ...action.value };
    // Attaching update bool to interview
    case UPDATE_INTERVIEW: {
      const { id, interview } = action.value;

      const newInterview = interview ? { ...interview, update: true } : null;

      // Sending modified interview through reducer to add it to states
      return reducer(newState, {
        type: SET_INTERVIEW,
        value: { id, interview: newInterview },
      });
    }
    // Removes update bool from interview
    case DELETE_INTERVIEW_UPDATE: {
      const { id } = action.value;
      // Deleting update key from interview
      delete newState.appointments[id].interview.update;

      return newState;
    }
    // Inserting interview into state
    case SET_INTERVIEW: {
      const { id, interview } = action.value;
      // Setting interview for appointment in state
      // Will set null if there is no interview
      const appointment = {
        ...state.appointments[id],
        interview: interview ? { ...interview } : null,
      };

      // Appending new appointment to list of appointments
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };

      // Updating newState to have appointment
      newState = { ...newState, appointments };
      // Updates spot count for day that id belongs to
      // Uses pass by reference
      updateSpots(newState, id);

      return newState;
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }

  function updateSpots(myState, interviewId) {
    // Getting day index via interview ID
    const dayIndex = myState.days.findIndex((day) =>
      day.appointments.includes(interviewId)
    );

    // Updating spots for day by counting null interviews for that day
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
