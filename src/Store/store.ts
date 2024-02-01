import { configureStore } from '@reduxjs/toolkit';
import vocabularyMapReducer from './VocabularyMapSlice';
import vocabularyTrainingReducer from './VocabularyTrainingSlice';
import generalStateReducer from './GeneralSlice';
import chatListStateReducer from './ChatListSlice';
import messageListStateReducer from './MessagesSlice'

export const store = configureStore({
  reducer: {
    wordPoints: vocabularyMapReducer,
    vocabularyTraining: vocabularyTrainingReducer, 
    signInState: generalStateReducer,
    chatListState: chatListStateReducer,
    messagesState: messageListStateReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;