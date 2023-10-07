import { useDispatch, useSelector } from 'react-redux';
import './Login.css';
import { AuthState, LoginData, fetchAuthToken } from '../../Store/GeneralSlice';
import { AppDispatch, RootState } from '../../Store/store';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
     
    const dispatch = useDispatch<AppDispatch>();    
    const navigate = useNavigate();

    const singedIn: boolean = useSelector((state: RootState) => state.signInState.signedIn);
    const errorMessage: string | null = useSelector((state: RootState) => state.signInState.errorMessage);

    useEffect(() => {
        if (singedIn) {
            console.log("navigate to root");
            navigate('/');
        }
    }, [singedIn, navigate]);

    const onLogin = async () => {
        await dispatch(fetchAuthToken({userName: userName, password: password}));        
    }

    const [userName, setUserName] = useState('');

    const handleUserNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setUserName(event.target.value);
    };

    const [password, setPassword] = useState('');

    const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(event.target.value);
    };
  

    return (
        <div className="main-container">
            <div className="items-container">
                <h1 className="header">Sign In</h1>
                <span className="label">Email address</span>
                <input type="email" className="input"
                    name="username"
                    value={userName}
                    onChange={handleUserNameChange}
                />
                <span className="label">Password</span>
                <input type="password" className="input"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                { errorMessage && <span className="message">{errorMessage}</span>}
                <button className="sign-in-button" onClick={onLogin} >Login</button>
            </div>
        </div>
        );
    }
  
export default Login;