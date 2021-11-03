import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { rest } from "msw";
import { setupServer } from "msw/node";

import customCounterReducer from "../src/features/customCounter/customCounterSlice";
import ReduxAsyncSample from "./ReduxAsyncSample";

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: "DummyName" }));
  })
);
// 最初に１回だけ実行される
beforeAll(() => {
  server.listen();
});
// テストケースが１つ終わるたびに実行される
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
// 最後に実行される
afterAll(() => server.close());

describe("ReduxAsyncSample Test", () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterReducer
      }
    });
  });

  it("FetchDummy display value (payload=5)", async () => {
    render(
      <Provider store={store}>
        <ReduxAsyncSample />
      </Provider>
    );
    userEvent.click(screen.getByText("FetchDummy"));
    expect(await screen.findByTestId("count-value")).toHaveTextContent("105");
  });

  it("FetchJSON display username", async () => {
    render(
      <Provider store={store}>
        <ReduxAsyncSample />
      </Provider>
    );
    expect(screen.queryByRole("heading")).toBeNull();
    userEvent.click(screen.getByText("FetchJSON"));
    expect(await screen.findByText("DummyName")).toBeInTheDocument();
  });

  it("FetchJSON failed display username", async () => {
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/users/1",
        (req, res, ctx) => {
          return res(ctx.status(404));
        }
      )
    );
    render(
      <Provider store={store}>
        <ReduxAsyncSample />
      </Provider>
    );
    expect(screen.queryByRole("heading")).toBeNull();
    userEvent.click(screen.getByText("FetchJSON"));
    expect(await screen.findByText("anonymous")).toBeInTheDocument();
  });
});
