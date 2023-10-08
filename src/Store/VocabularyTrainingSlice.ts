import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";

interface Exercise {
    word: string,
    nativePhrase: string;    
    originalPhrase: string;    
    answer?: string;
    fixedPhrase?: string;
    feedback?: string;
    strategy: NextWordStrategyEnum;
}

export interface VocTrainingState {
    exercises: Exercise[],    
    loading: boolean
}

const initialState: VocTrainingState = {
    exercises: [],    
    loading: false
};

interface NextWordStrategyEnum {
  [key: number]: string;
}

export interface WordTranslateExercise {
    word: string,
    nativePhrase: string;
    originalPhrase: string;
    number: number;
    strategy: NextWordStrategyEnum
  }

export interface WordTranslateFeedback {
    feedback: string;
    fixedPhrase: string;
    answer: string;
}

  export const fetchNextExercise = createAsyncThunk('vocabularyTraining/fetchNextExercise', async () => {
    const response = await axios.get<WordTranslateExercise>('/api/voc-train-next');
    return response.data;
  });

  export const fetchFeedback = createAsyncThunk('vocabularyTraining/fetchSubmit', async (answer: string, {getState}) => {
    const { vocabularyTraining } = getState() as RootState;
    const currentExercise = vocabularyTraining.exercises[vocabularyTraining.exercises.length-1];
    const response = await axios.post<WordTranslateFeedback>('/api/voc-train-submit',
        { 
          exerciseText: currentExercise.nativePhrase, 
          answerText: answer, 
          word: currentExercise.word, 
          strategy: currentExercise.strategy
        });
    response.data.answer = answer;
    return response.data;
  });

const vocabularyTrainingSlice = createSlice({
    name: "vocabularyTraining",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchNextExercise.pending, (state) => {
            state.loading = true;
          })          
          .addCase(fetchNextExercise.fulfilled, (state, action) => {
            state.loading = false;
            state.exercises.push({
                word: action.payload.word, 
                originalPhrase: action.payload.originalPhrase,
                nativePhrase: action.payload.nativePhrase,
                strategy: action.payload.strategy
            });
          })

          .addCase(fetchFeedback.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchFeedback.fulfilled, (state, action) => {
              state.loading = false;
              const last = state.exercises[state.exercises.length-1];
              last.feedback = action.payload.feedback;
              last.fixedPhrase = action.payload.fixedPhrase;    
              last.answer = action.payload.answer;          
          })
        },
});


export default vocabularyTrainingSlice.reducer;
