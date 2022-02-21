import React from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {
  const { confirm, danger, disabled } = props;
  let classes = classNames("button", {
    "button--confirm": confirm,
    "button--danger": danger,
  });

  return (
    <button onClick={props.onClick} className={classes} disabled={disabled}>
      {props.children}
    </button>
  );
}
