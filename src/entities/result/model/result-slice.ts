import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: 0,
  correct: 0,
  incorrect: 0,
  unanswered: 0,
};

const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    setResult(state, action) {
      return {
        ...{
          correct: action.payload === true ? state.correct + 1 : state.correct,
          incorrect: action.payload === false ? state.incorrect + 1 : state.incorrect,
          unanswered: action.payload === null ? state.unanswered + 1 : state.unanswered,
          total: action.payload.total || state.total,
        },
      };
    },
  },
});

export const { setResult } = resultSlice.actions;
export default resultSlice.reducer;
