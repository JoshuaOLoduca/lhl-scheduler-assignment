import React, { useEffect } from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form.js";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import PropTypes from "prop-types";

import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVING = "ERROR_SAVING";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const {
    time,
    interview,
    bookInterview,
    deleteInterview,
    id,
    interviewers,
    deleteUpdate,
  } = props;

  // Initializing view manager
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // Saves interview to database/state
  function save(name, interviewer) {
    const newInterview = {
      student: name,
      interviewer,
    };

    // Set view mode to saving status
    transition(SAVING);

    // Save interview in db and state
    bookInterview(id, newInterview)
      // When done, show interview
      .then(() => transition(SHOW))
      // If it fails, let user know
      .catch((e) => transition(ERROR_SAVING, true));
  }

  // For deleting an interview
  function cancelInterview(appointmentId) {
    // Show deleting status
    transition(DELETING);

    // Delete interview from db and state
    deleteInterview(appointmentId)
      // When done, show add button
      .then(() => transition(EMPTY))
      // if it cant, let user know
      .catch((e) => transition(ERROR_DELETE, true));
  }

  // Preventing stale states
  // Runs on interview update, transition call or on view change (last 2 are basically the same)
  useEffect(() => {
    // If the interview is null and we are editing or showing an interview, stop that
    if (interview === null && (mode === SHOW || mode === EDIT)) {
      transition(EMPTY);
    }

    // If we have an interview with the interview attribute,
    // Show the interview, no matter what the user is doing to it
    if (interview && interview.update) {
      deleteUpdate();
      transition(SHOW);
    }
  }, [interview, transition, mode, deleteUpdate]);

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time} />

      {/* If view mode is Empty, show add button */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {/* If mode is show and we have an interview, show scheduled interview */}
      {mode === SHOW && interview && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(DELETE)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {/* If we clicked add from empty state */}
      {/* Show create form */}
      {mode === CREATE && (
        <Form
          interviewers={[...interviewers]}
          onCancel={back}
          onSave={save}
          mode={CREATE}
        />
      )}

      {/* Once we confirm an interview, show user saving circle */}
      {mode === SAVING && <Status message={"Saving"} />}

      {/* Show deleting circle if user confirmed delete */}
      {mode === DELETING && <Status message={"Deleting"} />}

      {/* Asking for delete confirmation */}
      {mode === DELETE && (
        <Confirm
          message={`Delete Interview for ${interview.student}?`}
          onConfirm={() => cancelInterview(id)}
          onCancel={back}
        />
      )}

      {/* Showing edit form */}
      {mode === EDIT && (
        <Form
          student={interview && interview.student}
          interviewers={[...interviewers]}
          interviewer={interview && interview.interviewer.id}
          onCancel={back}
          onSave={save}
          mode={EDIT}
        />
      )}

      {/* Show error on db saving failure */}
      {mode === ERROR_SAVING && (
        <Error message={"Couldnt save details"} onClose={back} />
      )}

      {/* Show error on db delete failure */}
      {mode === ERROR_DELETE && (
        <Error message={"Couldnt delete appointment"} onClose={back} />
      )}
    </article>
  );
}

Appointment.propTypes = {
  time: PropTypes.string,
  interview: PropTypes.object,
  bookInterview: PropTypes.func,
  deleteInterview: PropTypes.func,
  id: PropTypes.number,
  interviewers: PropTypes.array,
  deleteUpdate: PropTypes.func,
};
