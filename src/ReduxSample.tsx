import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCount,
  increment,
  decrement,
  incrementByAmount
} from "./features/customCounter/customCounterSlice";

const ReduxSample: React.FC = () => {
  const [number, setNumber] = React.useState(0);
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  return (
    <div>
      <h3>Redux Sample</h3>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <span data-testid="count-value">{count}</span>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(incrementByAmount(number | 0))}>
          IncrementByAmount
        </button>
        <input
          type="text"
          placeholder="Enter"
          value={number}
          onChange={e => setNumber(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default ReduxSample;
