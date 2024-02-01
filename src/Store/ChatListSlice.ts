import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch, RootState } from "./store";

interface Chat {
    chatId: string | null;
    chatType: number;
    title: string;
}

interface ChatListState {
    chats: Chat[];
    selectedChat: number | null;
    error: string | null;
    loading: boolean;
}

const initialState: ChatListState = {
    chats: [],
    selectedChat: null,
    error: null,
    loading: false
}

export const fetchChats = createAsyncThunk('chatList/fetchChatList', async () => {
  console.log("getChats");
    const response = await axios.get<Chat[]>('/api/chats');
    console.log("chats received"+response.data);
    return response.data;
});

export const addChat = createAsyncThunk('chatList/addChat', async (newChat: Chat) => {
  const response = await axios.post<Chat>('/api/chats', newChat);
  return response.data;
});

export const addNewChat = () => async (dispatch: AppDispatch) => {
  const newChat: Chat = { chatId: null, title: "new chat", chatType: 0 };
  dispatch(addChatLocally(newChat));
  await dispatch(addChat(newChat));
  await dispatch(fetchChats());
}

const chatListSlice = createSlice({
    name: 'chatList',
    initialState,
    reducers: {
      addChatLocally(state, action) {
        state.chats.push(action.payload);        
      },      
      selectChat(state, action) {        
        state.selectedChat = action.payload
      }
    },

    extraReducers: (builder) => {
      builder
        .addCase(fetchChats.pending, (state) => {
          state.error = null;
          state.loading = true;          
        })
        .addCase(fetchChats.fulfilled, (state, action) => {
          state.error = null;
          state.loading = false;
          state.chats = action.payload;
        })
        .addCase(fetchChats.rejected, (state, action) => {
          state.loading = false;
          state.error = "error";
        });
    },
  });

  export const selectCurrentChatId = (state: RootState) => 
          state.chatListState.selectedChat == null? null: state.chatListState.chats[state.chatListState.selectedChat].chatId;
  
  export default chatListSlice.reducer;

  const { addChatLocally } = chatListSlice.actions;

  export const { selectChat } = chatListSlice.actions;
  