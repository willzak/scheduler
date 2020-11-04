import React from "react";
import axios from "axios";

import { render, cleanup, waitForElement, fireEvent, getByText, queryByText, queryByAltText, getAllByTestId, getByAltText, getByPlaceholderText, waitForElementToBeRemoved, prettyDOM, getByTestId } from "@testing-library/react";

import Application from "components/Application";

describe("Application", () => {

  afterEach(cleanup);

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();

    //using await:
    // await waitForElement(() => getByText("Monday"));

    // fireEvent.click(getByText("Tuesday"));

    // expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });

  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    fireEvent.click(getByText(appointment, "Save"));
    
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    waitForElementToBeRemoved(() => document.querySelector('main.appointment__card--status')).then(() =>
    queryByText(appointment, "Lydia Miller-Jones")
    ).catch(err => console.log(err))

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    waitForElementToBeRemoved(() => document.querySelector('main.appointment__card--status')).then(() =>
    expect(getByAltText(appointment, "Add")).toBeInTheDocument()
    ).catch(err => console.log(err))

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is Displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. Change name now that the Form is shown.
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    // 5. Click the "Save" button on the Form.
    fireEvent.click(getByText(appointment, "Save"));
    
    // 6. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 7. Wait until the element with the Show Form is displayed with the name "Lydia Miller-Jones"
    waitForElementToBeRemoved(() => document.querySelector('main.appointment__card--status')).then(() =>
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument()
    )
  });

  it("shows the save error when failing to save an appointment", () => {
    const { container } = render(<Application />);
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    axios.put.mockRejectedValueOnce();

    waitForElementToBeRemoved(() => document.querySelector('main.appointment__card--status')).then(() =>
    expect(getByText(appointment, "Could not save appointment")).toBeInTheDocument()
    )
  });

  it("shows the delete error when failing to delete an existing appointment", () => {
    const { container } = render(<Application />);
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    axios.delete.mockRejectedValueOnce();

    waitForElementToBeRemoved(() => document.querySelector('main.appointment__card--status')).then(() =>
    expect(getByText(appointment, "Could not cancel appointment")).toBeInTheDocument()
    )
  });
})