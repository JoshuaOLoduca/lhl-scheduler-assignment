import React from "react";

import { render, cleanup } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Form />);
  });
});
