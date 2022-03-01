import React from "react";

import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

process.env = Object.assign(process.env, {
  REACT_APP_WEBSOCKET_URL: "ws://localhost:8001",
});

it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);

  return waitForElement(() => getByText("Monday")).then(() => {
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});
