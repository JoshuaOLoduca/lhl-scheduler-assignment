import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  UPDATE_INTERVIEW,
  DELETE_INTERVIEW_UPDATE,
} from "reducers/application";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {},
    updates: {},
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

  function deleteInterviewUpdate(id) {
    dispatch({
      type: DELETE_INTERVIEW_UPDATE,
      value: { id },
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
    // If we are testing, dont bother with websocket listening
    if (process.env.JEST_TESTING) return;
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    webSocket.onmessage = function (event) {
      var msg = JSON.parse(event.data);
      if (msg.type !== SET_INTERVIEW) return;

      const { id, interview } = msg;
      dispatch({ type: UPDATE_INTERVIEW, value: { id, interview } });
    };

    return () => {
      webSocket.close();
    };
  }, []);

  return {
    state,
    bookInterview,
    deleteInterview,
    setDay,
    deleteInterviewUpdate,
  };
}
