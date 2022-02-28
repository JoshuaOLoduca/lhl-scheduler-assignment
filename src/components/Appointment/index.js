import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form.js";
import Status from "./Status";

import useVisualMode from "hooks/useVisualMode";

import {getInterviewersForDay} from "../../helpers/selectors"

import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

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

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show student={interview.student} interviewer={interview.interviewer} />
      )}
      {mode === CREATE && <Form interviewers={[...interviewers]} onCancel={() => back()} onSave={save} />}
      {mode === SAVING && <Status message={'Saving'} />}
    </article>
  );
}
