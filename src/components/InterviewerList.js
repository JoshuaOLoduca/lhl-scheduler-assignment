import React from "react";
import InterViewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterViewerList(props) {
  const { interviewers, value, onChange } = props;

  const intervListItems = interviewers.map((elm) => (
    <InterViewerListItem
      name={elm.name}
      avatar={elm.avatar}
      selected={value === elm.id}
      setInterviewer={() => onChange(elm.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{intervListItems}</ul>
    </section>
  );
}
