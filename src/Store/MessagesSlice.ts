import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch, RootState } from "./store";
import { selectCurrentChatId } from "./ChatListSlice";

interface Message {
    content: string;
}

interface MessageListState {
    messages: Message[];    
    error: string | null;
    loading: boolean;
}

const initialState: MessageListState = {
    messages: [],    
    error: null,
    loading: false
}

export const fetchMessages = createAsyncThunk('chatList/fetchMessageList', async (_, thunkAPI) => {
    const chatId = selectCurrentChatId(thunkAPI.getState() as RootState);
    const response = await axios.get<Message[]>(`/api/chats/${chatId}/messages`);
    return response.data;
});

export const submitMessage = (message: Message) => async (dispatch: AppDispatch) => {  
  dispatch(addMessageLocally(message));
  const newMessageResponse = await dispatch(postMessage(message));  
  dispatch(updateLastMessageLocally(newMessageResponse.payload));
  const stubMessage: Message = { content: "...waiting for GPT responce...", }
  dispatch(addMessageLocally(stubMessage));
  const gptMessageResponse = await dispatch(progressChat());
  if (gptMessageResponse.payload)
    dispatch(updateLastMessageLocally(gptMessageResponse.payload));
}

const progressChat = createAsyncThunk('chatList/progressChat', async (_, thunkAPI) => {
  const chatId = selectCurrentChatId(thunkAPI.getState() as RootState);
  const response = await axios.put(`/api/chats/${chatId}/progressChat`);
  return response.data;
});


const postMessage = createAsyncThunk('chatList/submitMessage', async (message: Message, thunkAPI) => {
  const chatId = selectCurrentChatId(thunkAPI.getState() as RootState);
  const response = await axios.post(`/api/chats/${chatId}/submitMessage`, message);
  return response.data;
});

const messageListSlice = createSlice({
    name: 'messageList',
    initialState,
    reducers: {
      addMessageLocally: (state, action) => {
        state.messages.push(action.payload);
      },
      updateLastMessageLocally: (state, action) => {
        state.messages[state.messages.length - 1] = action.payload;
      }
    },

    extraReducers: (builder) => {
      builder
        .addCase(fetchMessages.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchMessages.fulfilled, (state, action) => {
          state.loading = false;
          state.messages = action.payload;
        })
        .addCase(fetchMessages.rejected, (state, action) => {
          state.loading = false;
          state.error = "error";
        });
    },
  });
  
  const { addMessageLocally, updateLastMessageLocally } = messageListSlice.actions;

  export default messageListSlice.reducer;
