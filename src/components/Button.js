import React from "react";

import "components/Button.scss";

export default function Button(props) {
  let classes = "button";
  const { confirm, danger, disabled } = props;

  if (confirm) classes += " button--confirm";
  if (danger) classes += " button--danger";
  if (disabled) classes += " button--disabled";

  return (
    <button onClick={props.onClick} className={classes} disabled={disabled}>
      {props.children}
    </button>
  );
}
