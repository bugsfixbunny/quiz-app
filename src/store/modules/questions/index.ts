import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { getQuestions } from '../../../api';
import { RootState } from '../../index';
import { Question } from '../../../types';

export interface QuestionState {
  questions: Question[];
  loading: boolean;
  current: number;
  answers: boolean[];
  error: any;
}

export const initialState: QuestionState = {
  questions: [],
  loading: false,
  current: 0,
  answers: [],
  error: null,
};

export const getQuestionList = createAsyncThunk('getQuestions', async () => {
  const response = await getQuestions();
  return response.data;
});

export const questionReducer = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setAnswer: (state, action) => {
      state.answers = [...state.answers, action.payload];
      state.current += 1;
    },
    resetAnswer: (state) => {
      state.answers = [];
      state.current = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestionList.pending, (state) => {
        state.loading = true;
        state.questions = [];
        state.error = null;
      })
      .addCase(getQuestionList.fulfilled, (state, action) => {
        state.questions = action.payload.results;
        state.error = null;
        state.loading = false;
      })
      .addCase(getQuestionList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const selectQuestion = (state: RootState) => state.questions;

export const selectQuestions = createSelector(
  selectQuestion,
  (state) => state.questions,
);

export const selectCurrent = createSelector(
  selectQuestion,
  (state) => state.current,
);

export const selectLoading = createSelector(
  selectQuestion,
  (state) => state.loading,
);

export const selectError = createSelector(
  selectQuestion,
  (state) => state.error,
);

export const selectAnswers = createSelector(
  selectQuestion,
  (state) => state.answers,
);

export const selectScore = createSelector(selectQuestion, (state) => {
  let score = 0;
  const len = state.questions.length;
  for (let i = 0; i < len; i++) {
    const correct_answer = state.questions[i].correct_answer === 'True';
    if (correct_answer === state.answers[i]) score++;
  }
  return score;
});

export const { setAnswer, resetAnswer } = questionReducer.actions;

export default questionReducer.reducer;
