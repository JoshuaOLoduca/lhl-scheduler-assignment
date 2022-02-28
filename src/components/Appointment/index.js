import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form.js";
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";
import axios from "axios";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const DELETING = "DELETING";

export default function Appointment(props) {
  const { time, interview, bookInterview, id, interviewers} = props;
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
  }


  function deleteInterview(appointmentId) {
    transition(DELETING);

    axios.delete(`/api/appointments/${appointmentId}`)
      .then(() => transition(EMPTY))
      .catch(e => console.log(e))

  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={ interview.student }
          interviewer={ interview.interviewer }
          onDelete={ () => transition(DELETE) } />
      )}

      { mode === CREATE && <Form
        interviewers={ [...interviewers] }
        onCancel={ back }
        onSave={ save } /> }

      { mode === SAVING && <Status message={ 'Saving' } /> }

      { mode === DELETING && <Status message={ 'Deleting' } /> }
      
      { mode === DELETE && <Confirm
        message={ `Delete Interview for ${interview.student}?` }
        onConfirm={ () => deleteInterview(id) }
        onCancel={ back } /> }
    </article>
  );
}
