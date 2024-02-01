import { useDispatch, useSelector } from 'react-redux';
import './MessagesArea.css';
import { AppDispatch, RootState } from '../../Store/store';
import { useEffect } from 'react';
import { fetchMessages } from '../../Store/MessagesSlice';
import { selectCurrentChatId } from '../../Store/ChatListSlice';
import Markdown from 'react-markdown'

const MessagesArea: React.FC = () => {  

    const dispatch = useDispatch<AppDispatch>();
    const { messages, loading, error } = useSelector((state: RootState) => state.messagesState);
    const selectedChatId = useSelector(selectCurrentChatId);
    
    useEffect(() => {
        if (selectedChatId === null) {            
        }
        else
            dispatch(fetchMessages());
    }, [dispatch, selectedChatId]);
    
    return (
        <div className="messages-area">
            {messages.map(m => (
            <div>
                <Markdown>{m.content}</Markdown>
            </div>
            ))}
        </div>
    );
}

export default MessagesArea;