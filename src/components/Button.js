import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {
  const { confirm, danger, disabled } = props;

  // Seting css classes based on props
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

Button.propTypes = {
  confirm: PropTypes.bool,
  danger: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.string,
  onClick: PropTypes.func,
};
