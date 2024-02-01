import { useDispatch, useSelector } from 'react-redux';
import './ChatListArea.css';
import { AppDispatch, RootState } from '../../Store/store';
import { useEffect } from 'react';
import { addNewChat, fetchChats, selectChat } from '../../Store/ChatListSlice';

const ChatListArea: React.FC = () => {  

    const dispatch = useDispatch<AppDispatch>();
    const { chats, selectedChat, loading, error } = useSelector((state: RootState) => state.chatListState);

    useEffect(() => {
        dispatch(fetchChats());
    }, [dispatch]);

    const onNewChatButtonClick = () => {
        dispatch(addNewChat());
    }

    const chatClick = (index: number) => {
        dispatch(selectChat(index));
    }
    
    if (error)
    return (<div>error</div>);

    if (loading)
    return (<div>...loading...</div>);

    return (
        <div className="chat-list-area">
            <div>
                <button className='add-chat-button' onClick={onNewChatButtonClick}>New chat</button>
            </div>
            <ul className='chat-list'>
            { chats.map((item, index) => 
            (
                <li key={index} className={index == selectedChat ? 'chat-item-selected': 'chat-item'} onClick={() => chatClick(index)}>
                    <span className='chat-title'>{item.title}</span>
                </li>
            )) }
            </ul>
        </div>
    );
}

export default ChatListArea;