import { configureStore } from '@reduxjs/toolkit';
import vocabularyMapReducer from './VocabularyMapSlice';
import vocabularyTrainingReducer from './VocabularyTrainingSlice';

export const store = configureStore({
  reducer: {
    wordPoints: vocabularyMapReducer,
    vocabularyTraining: vocabularyTrainingReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;