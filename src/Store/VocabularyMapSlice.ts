import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface WordPoint {
  wrd: string,
  x: number;
  y: number;
  correctUses: number;
  nonUses: number;
}

interface PointsState {
  points: WordPoint[];
  loading: boolean;
  error: null | string;
}

const initialState: PointsState = {
  points: [],
  loading: false,
  error: null,
};

export const fetchWordMapPoints = createAsyncThunk('wordOverview/fetchWordMapPoints', async () => {
  const response = await axios.get<WordPoint[]>('/api/voc-map');
  return response.data;
});

const vocabularyMapSlice = createSlice({
  name: 'wordMap',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWordMapPoints.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWordMapPoints.fulfilled, (state, action) => {
        state.loading = false;
        state.points = action.payload;
      })
      .addCase(fetchWordMapPoints.rejected, (state, action) => {
        state.loading = false;
        state.error = "error";
      });
  },
});

export default vocabularyMapSlice.reducer;