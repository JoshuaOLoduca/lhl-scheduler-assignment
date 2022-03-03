import React from "react";
import PropTypes from "prop-types";
import InterViewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterViewerList(props) {
  const { interviewers, value, onChange } = props;

  // Creating an array of listItems
  const intervListItems = interviewers.map((elm) => (
    <InterViewerListItem
      key={elm.id}
      name={elm.name}
      avatar={elm.avatar}
      selected={value === elm.id}
      setInterviewer={() => onChange(elm.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {/* Inserting array into list */}
        {intervListItems}
      </ul>
    </section>
  );
}

// Prop Validation
InterViewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};
