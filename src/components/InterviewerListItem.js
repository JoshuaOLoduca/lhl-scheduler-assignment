import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterViewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props;

  const classes = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  return (
    <li className={classes} onClick={() => setInterviewer(id)}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}
