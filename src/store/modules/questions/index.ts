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
    submitAnswer: (state, action) => {
      state.answers[state.current] = action.payload;
      state.current += 1;

      if (state.current === state.questions.length) state.current = 0;
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

export const getResult = createSelector(selectQuestion, (state) => {
  const { questions, answers } = state;
  let correctAnswerCount = 0;
  let incorrectAnswerCount = 0;
  const correctness = questions.map((question: Question, index: number) => {
    const correct_answer = question['correct_answer'] === 'True' ? true : false;
    if (correct_answer === answers[index]) {
      correctAnswerCount++;
      return true;
    } else {
      incorrectAnswerCount++;
      return false;
    }
  });
  return {
    correctAnswerCount,
    incorrectAnswerCount,
    correctness,
  };
});

export const { submitAnswer } = questionReducer.actions;

export default questionReducer.reducer;
