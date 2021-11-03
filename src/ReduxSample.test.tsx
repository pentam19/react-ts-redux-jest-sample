import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import ReduxSample from "./ReduxSample";
import { configureStore } from "@reduxjs/toolkit";
import customCounterReducer from "./features/customCounter/customCounterSlice";
afterEach(() => {
  cleanup();
});

describe("Redux Integration Test", () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterReducer
      }
    });
  });

  it("display value increment click", () => {
    render(
      <Provider store={store}>
        <ReduxSample />
      </Provider>
    );
    userEvent.click(screen.getByText("+"));
    userEvent.click(screen.getByText("+"));
    userEvent.click(screen.getByText("+"));
    expect(screen.getByTestId("count-value")).toHaveTextContent("3");
  });

  it("display decrement click", () => {
    render(
      <Provider store={store}>
        <ReduxSample />
      </Provider>
    );
    userEvent.click(screen.getByText("-"));
    userEvent.click(screen.getByText("-"));
    expect(screen.getByTestId("count-value")).toHaveTextContent("-2");
  });

  it("display value incrementByAmount", () => {
    render(
      <Provider store={store}>
        <ReduxSample />
      </Provider>
    );
    userEvent.type(screen.getByPlaceholderText("Enter"), "30");
    userEvent.click(screen.getByText("IncrementByAmount"));
    expect(screen.getByTestId("count-value")).toHaveTextContent("30");
  });
});
