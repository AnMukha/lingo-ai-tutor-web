import { useDispatch, useSelector } from 'react-redux';
import './ChatInputArea.css';
import { AppDispatch, RootState } from '../../Store/store';
import { submitMessage } from '../../Store/MessagesSlice';
import { useRef, useState } from 'react';

const ChatInputArea: React.FC = () => {  

    const dispatch = useDispatch<AppDispatch>();

    const scrollableDiv = useRef<HTMLDivElement>(null);

    const [answerText, setAnswerText] = useState('');

    const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setAnswerText(event.target.value);
    };
  
    const onSubmitClick = async () => {
      const text = answerText;
      setAnswerText("");
      await dispatch(submitMessage({ content: text }));
      if (scrollableDiv.current) scrollableDiv.current.scrollTop = scrollableDiv.current.scrollHeight;
    }
  
    const onKeyDown = async (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) 
      {
        event.preventDefault();
        await onSubmitClick();
      }
    };
  
    return (
        <div className="chat-input-area" ref={scrollableDiv}>
        <textarea
          className="message-input" 
          placeholder="Type your text here..."
          value={answerText} 
          onChange={handleInputChange}
          onKeyDown={onKeyDown}
        >
        </textarea>
        <button className="submit-button" onClick={() => onSubmitClick()}>Submit</button>
      </div>
    );
}

export default ChatInputArea;