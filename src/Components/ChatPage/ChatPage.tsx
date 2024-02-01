import React, { useEffect, useRef, useState } from 'react';
import './ChatPage.css';
import ChatListArea from '../ChatListArea/ChatListArea';
import MessagesArea from '../MessagesArea/MessagesArea';
import ChatInputArea from '../ChatInputArea/ChatInputArea';

const ChatPage: React.FC = () => {  

    return (
        <div className='chat-page'>
            <div className='chat-list-area'>
                <ChatListArea></ChatListArea>
            </div>
            <div className='messages-area'>
                <MessagesArea></MessagesArea>
            </div>
            <div className='input-area'>
                <ChatInputArea></ChatInputArea>
            </div>
        </div>
    );

}

export default ChatPage;