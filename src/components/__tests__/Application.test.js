import React from "react";
import axios from "axios";

import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  getByDisplayValue,
} from "@testing-library/react";

import Application from "components/Application";

process.env = Object.assign(process.env, {
  JEST_TESTING: true,
});

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for the second day by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    fireEvent.click(getByText(container, "Tuesday"));
    expect(getByText(container, "Leopold Silvers")).toBeInTheDocument();

    const appointment = getAllByTestId(container, "appointment")[1];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Cohana Roy"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Tuesday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // Initialize app
    const { container } = render(<Application />);

    // Wait for mock axios to get data and update reducer
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Gets all dayListItems
    const day = getAllByTestId(container, "day").find((day) =>
      // Finds the one containing the text "Monday"
      queryByText(day, "Monday")
    );
    // Test to see if data from mock db is there
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

    // Hey all appoiontments
    const appointment = getAllByTestId(container, "appointment").find(
      // return the appointment that contains name "Archie Cohen"
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
    // Click on Delete button on Appointment
    fireEvent.click(getByAltText(appointment, "Delete"));
    // Test for delete confirmation
    expect(
      getByText(appointment, "Delete Interview for Archie Cohen?")
    ).toBeInTheDocument();

    // Confirm deletion
    fireEvent.click(getByText(appointment, "Confirm"));
    // Test for Deleting indicator
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // wait for delete to finish, then check to see if appointment was replaced with "Add" button
    await waitForElement(() => getByAltText(appointment, "Add"));
    // Test to see that update Spots is working
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // Initialize app
    const { container } = render(<Application />);
    // Wait for mock axios to get data and update reducer
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Gets all dayListItems
    const day = getAllByTestId(container, "day").find((day) =>
      // Finds the one containing the text "Monday"
      queryByText(day, "Monday")
    );
    // Test to see if spots is what the database provided
    expect(getByText(day, "1 spot remaining"));

    // Get all appointments and find specific one
    const appointment = getAllByTestId(container, "appointment").find(
      // Return appointment with "Archie Cohen"
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
    // Edit Appointment for "Archie Cohen"
    fireEvent.click(getByAltText(appointment, "Edit"));
    expect(getByDisplayValue(appointment, "Archie Cohen")).toBeInTheDocument();

    fireEvent.change(getByDisplayValue(appointment, "Archie Cohen"), {
      target: { value: "Crchie Aohen" },
    });
    fireEvent.click(getByText(appointment, "Edit"));
    await waitForElement(() => getByText(appointment, "Crchie Aohen"));
    expect(getByText(day, "1 spot remaining"));
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    fireEvent.click(getByText(container, "Tuesday"));
    expect(getByText(container, "Leopold Silvers")).toBeInTheDocument();

    const appointment = getAllByTestId(container, "appointment")[1];

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Cohana Roy"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Couldnt save details"));
    expect(getByText(appointment, "Couldnt save details")).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    // Initialize app
    const { container } = render(<Application />);

    // Wait for mock axios to get data and update reducer
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Gets all dayListItems
    const day = getAllByTestId(container, "day").find((day) =>
      // Finds the one containing the text "Monday"
      queryByText(day, "Monday")
    );
    // Test to see if data from mock db is there
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

    // Hey all appoiontments
    const appointment = getAllByTestId(container, "appointment").find(
      // return the appointment that contains name "Archie Cohen"
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
    // Click on Delete button on Appointment
    fireEvent.click(getByAltText(appointment, "Delete"));
    // Test for delete confirmation
    expect(
      getByText(appointment, "Delete Interview for Archie Cohen?")
    ).toBeInTheDocument();

    // Confirm deletion
    fireEvent.click(getByText(appointment, "Confirm"));
    // Test for Deleting indicator
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // wait for delete to finish, then check to see if appointment was replaced with "Add" button
    await waitForElement(() =>
      getByText(appointment, "Couldnt delete appointment")
    );
    // Test to see that update Spots is working
    expect(
      getByText(appointment, "Couldnt delete appointment")
    ).toBeInTheDocument();
  });
});
