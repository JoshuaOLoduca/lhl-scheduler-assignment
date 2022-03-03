import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

// Shows Loading/Status for Appointment component
export default function Status(props) {
  const { message } = props;

  return (
    <main className="appointment__card appointment__card--status">
      {/* Image to rotate */}
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">
        {/* Text to show on right side of image */}
        {message}
      </h1>
    </main>
  );
}

Status.propTypes = {
  message: PropTypes.string.isRequired,
};
