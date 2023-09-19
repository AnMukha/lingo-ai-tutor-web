import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Exercise {
    word: string,
    nativePhrase: string;    
    originalPhrase: string;    
    answer?: string;
    fixedPhrase?: string;
    feedback?: string;    
}

export interface VocTrainingState {
    exercises: Exercise[],    
    loading: boolean
}

const initialState: VocTrainingState = {
    exercises: [],    
    loading: false
};

export interface WordTranslateExercise {
    word: string,
    nativePhrase: string;
    originalPhrase: string;
  }

export interface WordTranslateFeedback {
    feedback: string;
    fixedPhrase: string;
    answer: string;
}

  export const fetchNextExercise = createAsyncThunk('vocabularyTraining/fetchNextExercise', async () => {
    const response = await axios.get<WordTranslateExercise>('https://localhost:7168/api/voc-train-next');
    return response.data;
  });

  export const fetchFeedback = createAsyncThunk('vocabularyTraining/fetchSubmit', async (phrase: string) => {
    const response = await axios.post<WordTranslateFeedback>('https://localhost:7168/api/voc-train-submit',{ text: phrase });
    response.data.answer = phrase;
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
                nativePhrase: action.payload.nativePhrase
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
