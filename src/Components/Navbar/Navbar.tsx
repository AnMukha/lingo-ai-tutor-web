import React from 'react';
import './Navbar.css';
import { Link, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Store/store';
import { AuthState, signedOut } from '../../Store/GeneralSlice';
import axios from 'axios';


const Navbar: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const singInState: AuthState = useSelector((state: RootState) => state.signInState);
  
  const onSignIn = () => 
  {
    navigate('/login');
  };

  const onSignOut = () =>
  {
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];    
    dispatch(signedOut());
  };

  return (
    <nav className="navbar">
          <ul>
            <li>
              Training
              <ul className="dropdown">
                <li>
                  <Link to="/vocabulary-train" className="nav-item">Vocabulary</Link>
                </li>
                <li>
                  <Link to="/chat" className="nav-item">Chat</Link>
                </li>
              </ul>
            </li>
            <li>
              Knowledge Overview
              <ul className="dropdown">
                <li>
                    <Link to="/vocabulary-overview" className="nav-item">Vocabulary Overview</Link>
                </li>
                <li>Grammar Results</li>
              </ul>
            </li>
            <li onClick={singInState.signedIn? onSignOut: onSignIn }>{singInState.signedIn? "Sign Out": "Sign In"  }</li>
          </ul>              
    </nav>
  );
}

export default Navbar;