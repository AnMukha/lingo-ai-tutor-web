import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ExerciseItem {
    text: string
}

export interface VocTrainingState {
    exerciseItems: ExerciseItem[],
    loading: boolean
}

const initialState: VocTrainingState = {
    exerciseItems: [],
    loading: false
};

export interface WordTranslateExercise {
    word: string,
    nativePhrase: string;
  }

export const fetchNextExercise = createAsyncThunk('vocabularyTraining/fetchNextExercise', async () => {
    const response = await axios.get<WordTranslateExercise>('https://localhost:7168/api/voc-train-next');
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
            state.exerciseItems.push({ text: action.payload.nativePhrase });
        })  
    },
});
  

export default vocabularyTrainingSlice.reducer;