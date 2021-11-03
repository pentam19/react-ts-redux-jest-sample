import reducer, {
  fetchDummy
} from "../src/features/customCounter/customCounterSlice";

describe("ExtraReducer ReduxToolKit Test Sample", () => {
  const initialState = { mode: 0, value: 0 };
  it("fetchDummy fulfilled", () => {
    const action = { type: fetchDummy.fulfilled, payload: 5 };
    const state = reducer(initialState, action);
    expect(state.value).toEqual(105);
  });
  it("fetchDummy rejected", () => {
    const action = { type: fetchDummy.rejected, payload: 5 };
    const state = reducer(initialState, action);
    expect(state.value).toEqual(95);
  });
});
