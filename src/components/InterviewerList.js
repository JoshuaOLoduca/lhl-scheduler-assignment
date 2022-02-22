import React from "react";
import InterViewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterViewerList(props) {
  const { interviewers, interviewer, setInterviewer } = props;

  const intervListItems = interviewers.map((elm) => (
    <InterViewerListItem
      name={elm.name}
      id={elm.id}
      avatar={elm.avatar}
      selected={interviewer === elm.id}
      setInterviewer={setInterviewer}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{intervListItems}</ul>
    </section>
  );
}
