import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

interface NavbarProps {
  isSignedIn: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isSignedIn, onSignIn, onSignOut }) => {
  return (
    <nav className="navbar">
          <ul>
            <li>
              Training
              <ul className="dropdown">
                <li>
                  <Link to="/vocabulary-train" className="nav-item">Vocabulary</Link>
                </li>
                <li>Grammar</li>
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
            <li onClick={onSignOut}>Sign Out</li>
          </ul>              
    </nav>
  );
}

export default Navbar;