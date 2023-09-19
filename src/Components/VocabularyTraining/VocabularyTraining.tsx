import React, { useEffect, useRef } from 'react';
import { useNavigate  } from 'react-router-dom';
import './VocabularyTraining.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Store/store';
import { VocTrainingState, fetchNextExercise } from '../../Store/VocabularyTrainingSlice';

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

  const renderExerciseHistory = () => {
    return (
      <div>
        {trainingState.exerciseItems.map(ex => (<div>{ex.text}</div>))}
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
          >            
          </textarea>          
        </div>
    </div>
  );
}

export default VocabularyTraining;