import React from "react";
import Button from "components/Button";
import PropTypes from "prop-types";
import "./styles.scss";

export default function Confirm(props) {
  const { onCancel, onConfirm, message } = props;

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">
        {/* Show what the user is confirming to */}
        {message}
      </h1>
      <section className="appointment__actions">
        {/* Cancel Button */}
        <Button onClick={onCancel} danger>
          Cancel
        </Button>
        {/* Confirm Button */}
        <Button onClick={onConfirm} danger>
          Confirm
        </Button>
      </section>
    </main>
  );
}

Confirm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};
