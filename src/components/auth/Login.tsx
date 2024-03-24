import React, { useState, FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from '../../assets/images/backgroundimage.jpg'; // Path to your background image
import '../../assets/styles/Signup.css'; // Assuming you have a Login.css file for styling

const Login: React.FC = () => {
    const [loginIdentifier, setLoginIdentifier] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(loginIdentifier, password);
        // Your login logic here
    };

    const handleForgotPassword = () => {
        window.location.href = '/forgot-password';
    };

    return (
        <div
            className="container-fluid"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                width: '140vh', // Adjust height as needed
            }}
        >
            <div className="row justify-content-center align-items-center" style={{ height: '100%' }}>
                <div className="col-md-7 " >
                    <div className="card" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', height:'250px' }}>
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Email or Username"
                                        value={loginIdentifier}
                                        onChange={(e) => setLoginIdentifier(e.target.value)}
                                    />
                                    
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {errorMessage && <div className="error-message" style={{ color: 'red',  marginLeft:'30%'}}>{errorMessage}</div>}
                                <button type="button" className="btn btn-link" onClick={handleForgotPassword}>Forgot Password?</button>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
