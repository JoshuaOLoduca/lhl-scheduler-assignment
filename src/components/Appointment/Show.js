import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

export default function Show(props) {
  const { student, interviewer, onEdit, onDelete } = props;

  return (
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        <h2 className="text--regular">
          {/* Students Name */}
          {student}
        </h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">
            {/* Interviewers Name */}
            {interviewer.name}
          </h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          {/* Edit Button */}
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            alt="Edit"
            onClick={onEdit}
          />
          {/* Delete Button */}
          <img
            className="appointment__actions-button"
            src="images/trash.png"
            alt="Delete"
            onClick={onDelete}
          />
        </section>
      </section>
    </main>
  );
}

Show.propTypes = {
  student: PropTypes.string.isRequired,
  interviewer: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
