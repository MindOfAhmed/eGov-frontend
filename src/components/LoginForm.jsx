import { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

export const LoginForm = ({ onLogin }) => {
    // create state variables to control the form
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // useNavigate is a hook that allows us to navigate to different pages
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault(); // this is to prevent the default form submission 
        try {
            // send a login request to the server and fetch the tokens
            const response = await axios.post('http://127.0.0.1:8080/token/', {
                username,
                password
            });
            // store the tokens in local storage as key-value pairs
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh)

            // clear any previous errors
            setError('');
            
            // update the state 
            onLogin();

            // redirect the user to the home page upon success
            navigate('/');
        } catch (error) {
            setError('Invalid credentials');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div className="col-md-12 d-flex justify-content-center align-items-center flex-column mt-5">
                <h1>Welcome Back!</h1>
                <div className="form-group col-md-6">
                    <label className="" >Username: </label>
                    <input 
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-6">
                    <label>Password: </label>
                    <input 
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                {error && <div className="form-group">{ error }</div>}
                <button type="submit" className="button mt-3">Login</button>
            </div>
        </form>
    );
};