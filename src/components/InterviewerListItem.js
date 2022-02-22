import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterViewerListItem(props) {
  const { id, name, avatar, setInterviewer } = props;
  return (
    <li className="interviewers__item" onClick={() => setInterviewer(id)}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      Sylvia Palmer
    </li>
  );
}
