import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import PropTypes from "prop-types";
import "./styles.scss";

export default function Form(props) {
  const { interviewers, onSave, onCancel } = props;

  // Setting up states
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // On cancel, reset form and run provided onCancel func from props
  function cancel() {
    reset();
    onCancel();
  }

  // Resets states
  function reset() {
    setStudent("");
    setInterviewer(null);
  }

  // Validating form before executing props.onSave
  function validate() {
    // If student name is empty, show error and return
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    // If no interviewer is selected, show error and return
    if (interviewer === null) {
      setError("Interviewer needs to be selected");
      return;
    }

    // Save interview to database
    onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          {/* Student name input */}
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(e) => {
              setStudent(e.target.value);
              setError("");
            }}
            value={student}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">
          {/* Error Container */}
          {error}
        </section>
        {/* Show all available interviewers */}
        <InterviewerList
          interviewers={interviewers}
          onChange={setInterviewer}
          value={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          {/* Cancel Button */}
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          {/* Save Button */}
          <Button onClick={validate} confirm>
            {student ? "Edit" : "Save"}
          </Button>
        </section>
      </section>
    </main>
  );
}

Form.propTypes = {
  interviewers: PropTypes.array,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  student: PropTypes.string,
  interviewer: PropTypes.number,
};
