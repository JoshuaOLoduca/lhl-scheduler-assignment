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
    appointments: {},
    interviewers: {},
    updates: {},
  });

  // To update database with interview data
  // Returns promise
  function bookInterview(id, interview) {
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((result) => {
        // Update state via reducer on success
        dispatch({ type: SET_INTERVIEW, value: { id, interview } });
        return;
      });
  }

  // Deletes interview from server
  // Returns promise
  function deleteInterview(appointmentId) {
    return axios.delete(`/api/appointments/${appointmentId}`).then((data) => {
      // Updates state via reducer on success
      dispatch({
        type: SET_INTERVIEW,
        value: { id: appointmentId, interview: null },
      });
      return;
    });
  }

  // Deletes interview update attribute
  function deleteInterviewUpdate(id) {
    dispatch({
      type: DELETE_INTERVIEW_UPDATE,
      value: { id },
    });
  }

  // Updates state.day to provided day
  const setDay = (day) => dispatch({ type: SET_DAY, value: day });

  // Initial data load
  // Runs once, fetches data from server for render, then updates state when data is recieved
  useEffect(() => {
    // Queries all needed end points
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      // Deconstructs array to get results
      const [days, appointments, interviewers] = all;

      // Sends the data of results to reducer
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

  // Registers webSockets with server
  // Runs once
  useEffect(() => {
    // If we are testing, dont bother with websocket listening
    if (process.env.JEST_TESTING) return;

    // Listen on Environment provided url
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    // When server sends us a message, parse it
    webSocket.onmessage = function (event) {
      var msg = JSON.parse(event.data);
      // If the data isnt about setting an interview, do nothing
      if (msg.type !== SET_INTERVIEW) return;

      // Adding new interview data to state via reducer
      const { id, interview } = msg;
      dispatch({ type: UPDATE_INTERVIEW, value: { id, interview } });
    };

    // Incase we ever get reloaded, close the websocket
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
