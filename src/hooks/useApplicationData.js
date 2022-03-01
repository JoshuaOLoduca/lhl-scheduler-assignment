import { useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    let newState = { ...state };
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

    webSocket.onmessage = function (event) {
      var msg = JSON.parse(event.data);
      if (msg.type !== SET_INTERVIEW) return;

      const { id, interview } = msg;
      dispatch({ type: SET_INTERVIEW, value: { id, interview } });
    };

    return () => {
      webSocket.close();
    };
  }, []);

  return { state, bookInterview, deleteInterview, setDay };
}
