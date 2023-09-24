import React, { useEffect, useRef, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import './VocabularyTraining.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Store/store';
import { VocTrainingState, fetchFeedback, fetchNextExercise } from '../../Store/VocabularyTrainingSlice';

const VocabularyTraining: React.FC = () => {  
  
  const dispatch = useDispatch<AppDispatch>();
  
  const scrollableDiv = useRef<HTMLDivElement>(null);

  const trainingState: VocTrainingState = useSelector((state: RootState) => state.vocabularyTraining);
    useSelector(() => {
  });

  useEffect(() => {
    if (trainingState.exercises.length == 0 || trainingState.exercises[trainingState.exercises.length-1].feedback)
      dispatch(fetchNextExercise());
      if (scrollableDiv.current) scrollableDiv.current.scrollTop = scrollableDiv.current.scrollHeight;      
  }, [dispatch]);


  const navigate = useNavigate();

  const onHomeClick = () => {
    navigate('/');
  };

  const [answerText, setAnswerText] = useState('');

  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setAnswerText(event.target.value);
  };

  const onSubmitClick = async () => {
    const text = answerText;
    setAnswerText("");
    await dispatch(fetchFeedback(text));
    await dispatch(fetchNextExercise());
    if (scrollableDiv.current) scrollableDiv.current.scrollTop = scrollableDiv.current.scrollHeight;      
  }


  const onKeyDown = async (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) 
    {
      event.preventDefault();
      await onSubmitClick();
    }        
  };

  const renderBoldWord = (phrase: string, word: string) => {      
      const index = phrase.toLocaleLowerCase().indexOf(word.toLocaleLowerCase());
      if (index!=-1)
        return (        
          <>     
            <span>{phrase.substring(0, index)}<strong>{phrase.substring(index, index+word.length, )}</strong>{phrase.substring(index+word.length)}</span>
          </>
        )
      else
      return <span>{phrase}{"("+word+")"}</span>
  }

  const renderExerciseHistory = () => {
    return (
      <div>
        {trainingState.exercises.map(ex => (
        <div key={ex.originalPhrase}>          
          <hr/>
          <p className='translateThisLabel'>Translate this: </p>
          <p className='nativePhrase'>{ex.nativePhrase}</p>
          {ex.fixedPhrase && (
            <>
              <span className='phrasesLabel'>Your: </span><span>{ex.answer}</span><br/> 
              <span className='phrasesLabel'>Fixed: </span><span>{ex.fixedPhrase}</span><br/> 
              <span className='phrasesLabel'>Original: </span><span>{renderBoldWord(ex.originalPhrase, ex.word)}</span><br/>               
              <p className='feedBack'>{ex.feedback}</p>
          </>)}
        </div>))}        
      </div>
    );
  }

  return (
    <div className="vtrain">
        <div className="top-bar">
          <button className="home-button" onClick={onHomeClick}>Home</button>
        </div>

        <div className="excercise-area" ref={scrollableDiv}>        
          {renderExerciseHistory()}
        </div>

        <div className="answer-area">
          <textarea
            className="answer-input" 
            placeholder="Type your text here..."
            value={answerText} 
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
          >
          </textarea>
          <button className="submit-button" onClick={onSubmitClick}>Submit</button>
        </div>
    </div>
  );
}

export default VocabularyTraining;