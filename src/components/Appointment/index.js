import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form.js";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";
import axios from "axios";

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
  const { time, interview, bookInterview, deleteInterview, id, interviewers} = props;
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  function save(name, interviewer) {
    const newInterview = {
      student: name,
      interviewer
    };

    transition(SAVING)

    bookInterview(id, newInterview)
      .then(() => transition(SHOW))
      .catch(e => transition(ERROR_SAVING, true))
  }


  function cancelInterview(appointmentId) {
    transition(DELETING);

    deleteInterview(appointmentId)
      .then(() => transition(EMPTY))
      .catch(e => transition(ERROR_DELETE, true))
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={ interview.student }
          interviewer={ interview.interviewer }
          onDelete={ () => transition(DELETE) }
          onEdit={() => transition(EDIT)}/>
      )}

      { mode === CREATE && <Form
        interviewers={ [...interviewers] }
        onCancel={ back }
        onSave={ save } /> }

      { mode === SAVING && <Status message={ 'Saving' } /> }

      { mode === DELETING && <Status message={ 'Deleting' } /> }
      
      { mode === DELETE && <Confirm
        message={ `Delete Interview for ${interview.student}?` }
        onConfirm={ () => cancelInterview(id) }
        onCancel={ back } /> }
      
      { mode === EDIT && <Form
        student={ interview.student }
        interviewers={ [...interviewers] }
        interviewer={ interview.interviewer.id }
        onCancel={ back }
        onSave={ save }/> }
      
      { mode === ERROR_SAVING && <Error
        message={ 'Couldnt save details' }
        onClose={ back }/> }
      
      { mode === ERROR_DELETE && <Error
        message={ 'Couldnt delete appointment' }
        onClose={ back }/> }
    </article>
  );
}
