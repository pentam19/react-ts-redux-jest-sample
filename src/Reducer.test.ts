import reducer, {
  increment,
  incrementByAmount
} from "../src/features/customCounter/customCounterSlice";

describe("Reducer ReduxToolKit Test Sample", () => {
  describe("increment action", () => {
    it("mode=0 increment", () => {
      let initialState = { mode: 0, value: 1 };
      const action = { type: increment.type };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(2);
    });
    it("mode=1 increment", () => {
      let initialState = { mode: 1, value: 1 };
      const action = { type: increment.type };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(101);
    });
    it("mode=2 increment", () => {
      let initialState = { mode: 2, value: 1 };
      const action = { type: increment.type };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(10001);
    });
  });
  describe("incrementByAmount action", () => {
    it("mode=0 incrementByAmount", () => {
      let initialState = { mode: 0, value: 1 };
      const action = { type: incrementByAmount.type, payload: 3 };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(4);
    });
    it("mode=1 incrementByAmount", () => {
      let initialState = { mode: 1, value: 1 };
      const action = { type: incrementByAmount.type, payload: 3 };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(301);
    });
    it("mode=2 incrementByAmount", () => {
      let initialState = { mode: 2, value: 1 };
      const action = { type: incrementByAmount.type, payload: 3 };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(30001);
    });
  });
});
