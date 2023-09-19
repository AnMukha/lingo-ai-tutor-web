import React, { useEffect, useRef, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import './VocabularyTraining.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Store/store';
import { VocTrainingState, fetchFeedback, fetchNextExercise } from '../../Store/VocabularyTrainingSlice';

const VocabularyTraining: React.FC = () => {  
  
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchNextExercise());
  }, [dispatch]);

  const trainingState: VocTrainingState = useSelector((state: RootState) => state.vocabularyTraining);
    useSelector(() => {
  });

  const navigate = useNavigate();

  const onHomeClick = () => {
    navigate('/');
  };

  const [answerText, setInputValue] = useState('');

  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(event.target.value);
  };

  const onSubmitClick = async () => {
    await dispatch(fetchFeedback(answerText));
    await dispatch(fetchNextExercise());
  }

  const renderExerciseHistory = () => {
    return (
      <div>
        {trainingState.exercises.map(ex => (
        <div key={ex.originalPhrase}>
          <p>Translate this: </p>
          {ex.nativePhrase}
          {ex.fixedPhrase && (
            <>
              <p>You translation: </p>
              {ex.answer}
              <p>You translation after fix: </p>
              {ex.fixedPhrase}
              <p>Explanations: </p>
              {ex.feedback}
              <p>Original phrase was: </p>
              {ex.originalPhrase}          
              <p>Word: </p>
              {ex.word}
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

        <div className="excercise-area">
          {renderExerciseHistory()}
        </div>

        <div className="answer-area">
          <textarea 
            className="answer-input" 
            placeholder="Type your text here..."
            value={answerText} 
            onChange={handleInputChange}
          >
          </textarea>
          <button onClick={onSubmitClick}>Submit</button>
        </div>
    </div>
  );
}

export default VocabularyTraining;