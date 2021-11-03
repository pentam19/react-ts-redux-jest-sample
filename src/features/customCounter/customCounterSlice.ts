import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const sleep = (msec: number) => {
  const start: number = new Date().getTime();
  while (new Date().getTime() - start < msec);
};

// createAsyncThunkの第二引数で定義している関数の ↓戻り値の型 ↓引数の型
export const fetchDummy = createAsyncThunk<number, number>(
  "fetch/dummy",
  async num => {
    await sleep(2000);
    return num;
  }
);

export const fetchJSON = createAsyncThunk("fetch/api", async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users/1");
  const { username } = res.data;
  return username;
});

export const customCounterSlice = createSlice({
  name: "customCounter",
  initialState: {
    mode: 0,
    value: 0,
    username: ""
  },
  reducers: {
    increment: (state: { mode: number; value: number }) => {
      switch (state.mode) {
        case 0:
          state.value += 1;
          break;
        case 1:
          state.value += 100;
          break;
        case 2:
          state.value += 10000;
          break;
        default:
          break;
      }
    },
    decrement: (state: { value: number }) => {
      state.value -= 1;
    },
    // ユーザーからの入力
    incrementByAmount: (
      state: { mode: number; value: number },
      action: { payload: number }
    ) => {
      switch (state.mode) {
        case 0:
          state.value += action.payload;
          break;
        case 1:
          state.value += action.payload * 100;
          break;
        case 2:
          state.value += action.payload * 10000;
          break;
        default:
          break;
      }
    }
  },
  // 非同期系の結果を受け取った後の処理
  extraReducers: (builder: any) => {
    // fetchDummy 成功時
    builder.addCase(
      fetchDummy.fulfilled,
      (state: { mode: number; value: number }, action: { payload: number }) => {
        state.value = 100 + action.payload;
      }
    );
    // fetchDummy 失敗時
    builder.addCase(
      fetchDummy.rejected,
      (state: { mode: number; value: number }, action: { payload: number }) => {
        state.value = 100 - action.payload;
      }
    );
    // fetchJSON 成功時
    builder.addCase(
      fetchJSON.fulfilled,
      (state: { username: string }, action: { payload: string }) => {
        state.username = action.payload;
      }
    );
    // fetchJSON 失敗時
    builder.addCase(
      fetchJSON.rejected,
      (state: { username: string }, action: { payload: string }) => {
        state.username = "anonymous";
      }
    );
  }
});

export const {
  increment,
  decrement,
  incrementByAmount
} = customCounterSlice.actions;

// stateの中の値を返す関数
// name: "customCounter" の valueを返す
export const selectCount = (state: any) => state.customCounter.value;
// name: "customCounter" の usernameを返す
export const selectUsername = (state: any) => state.customCounter.username;

export default customCounterSlice.reducer;
