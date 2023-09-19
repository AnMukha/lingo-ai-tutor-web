import React, { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VocabularyTraining from './Components/VocabularyTraining/VocabularyTraining';
import VocabularyOverview from './Components/VocabularyOverview/VocabularyOverview';

const App: React.FC = () => {

  const [isSignedIn] = useState(true);

  const handleSignIn = () => {        
  };

  const handleSignOut = () => {
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element=
        {
          <Navbar isSignedIn={isSignedIn} onSignIn={handleSignIn} onSignOut={handleSignOut} />
        }/>
        <Route path="vocabulary-train" element=
        {
          <VocabularyTraining/>
        }/>
        <Route path="vocabulary-overview" element=
        {
          <VocabularyOverview/>
        }/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
