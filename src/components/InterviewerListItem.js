import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterViewerListItem(props) {
  const { name, avatar, selected, setInterviewer } = props;

  // setting classes based on props
  const classes = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  return (
    <li className={classes} onClick={setInterviewer}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}

InterViewerListItem.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  setInterviewer: PropTypes.func.isRequired,
};
