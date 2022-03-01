import { useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    const newState = { ...state };
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
          interview: { ...interview },
        };

        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };
        return { ...newState, appointments };
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {},
  });

  function bookInterview(id, interview) {
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((result) => {
        // updateSpots(-1);
        dispatch({ type: SET_INTERVIEW, value: { id, interview } });
        return;
      });
  }

  function deleteInterview(appointmentId) {
    return axios.delete(`/api/appointments/${appointmentId}`).then((data) => {
      // updateSpots(+1);
      dispatch({
        type: SET_INTERVIEW,
        value: { id: appointmentId, interview: null },
      });
      return;
    });
  }

  const setDay = (day) => dispatch({ type: SET_DAY, value: day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;

      dispatch({
        type: SET_APPLICATION_DATA,
        value: {
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data,
        },
      });
    });
  }, []);

  useEffect(() => {
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    webSocket.onopen = function (event) {};

    webSocket.onmessage = function (event) {
      var msg = JSON.parse(event.data);
      if (msg.type !== SET_INTERVIEW) return;
      const { id, interview } = msg;

      if (interview) updateSpots(id, -1);
      else updateSpots(id, +1);

      dispatch({ type: SET_INTERVIEW, value: { id, interview } });
    };

    function updateSpots(interviewId, num) {
      const newState = { ...state };
      const dayIndex = newState.days.findIndex((day) =>
        day.appointments.includes(interviewId)
      );

      newState.days[dayIndex].spots += num;
      dispatch({ type: SET_APPLICATION_DATA, value: newState });
    }

    return () => {
      webSocket.close();
    };
  }, [state]);

  return { state, bookInterview, deleteInterview, setDay };
}
