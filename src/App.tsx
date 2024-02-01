import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VocabularyTraining from './Components/VocabularyTraining/VocabularyTraining';
import VocabularyOverview from './Components/VocabularyOverview/VocabularyOverview';
import Login from './Components/Login/Login';
import { AuthState } from './Store/GeneralSlice';
import { useSelector } from 'react-redux';
import { RootState } from './Store/store';
import axios from 'axios';
import ChatPage from './Components/ChatPage/ChatPage';

const App: React.FC = () => {

  const authState: AuthState = useSelector((state: RootState) => state.signInState);

  useEffect(() => {    
    const token = localStorage.getItem('authToken');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
}, []);

  return (
    <BrowserRouter>   
      {authState.signedIn? 
      (      
      <Routes>
        <Route path="/" element=
        {
          <Navbar/>
        }/>
        <Route path="vocabulary-train" element=
        {
          <VocabularyTraining/>
        }/>
        <Route path="vocabulary-overview" element=
        {
          <VocabularyOverview/>
        }/>
        <Route path="chat" element=
        {
          <ChatPage/>
        }/>        
        <Route path="login" element=
        {
          <Login/>
        }/>
      </Routes>
):
<Routes>  
<Route path="/" element=
        {
          <Navbar/>
        }/>        
    <Route path="*" element=
        {
          <Login/>
        }/>        
    
</Routes>
}
    </BrowserRouter>
  );
}

export default App;
