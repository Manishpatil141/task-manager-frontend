import React, { useState, FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from '../../assets/images/backgroundimage.jpg'; // Path to your background image
import '../../assets/styles/Signup.css'; // Assuming you have a Login.css file for styling
import { validateLoginForm } from '../../helpers/validations/user.validation';
import { loginUser } from '../../services/users.api';

const Login: React.FC = () => {
    const [loginIdentifier, setLoginIdentifier] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({
        loginIdentifier: '',
        password: '',
    });

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateLoginForm(loginIdentifier, password);
        if (validationErrors) {
            setErrors(validationErrors);
            // Clear validation errors after 3 seconds
            setTimeout(() => {
                setErrors({
                    loginIdentifier: '',
                    password: '',
                });
            }, 3000);
            return;
        }
        try {
            const userData = { loginIdentifier, password };
            const response = await loginUser(userData);
            if (response.data.code === 402 ||404) {
                setErrorMessage(response.data.status);
            }
            if (response.data.code === 200) {
                localStorage.setItem('accessToken', response.data.data.accessToken);
                localStorage.setItem('refreshToken', response.data.data.longLivedAccessToken);
                // setErrorMessage(response.data.status);
            }
        } catch (error) {
            setErrorMessage('Login failed');
        }
    };

    const handleForgotPassword = () => {
        window.location.href = '/forgot-password';
    };

    const handleSignUp = () => {
        window.location.href = '/signup'; // Replace 'registration' with the actual URL of your registration page
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
                    <div className="card" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', height: '260px' }}>
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className={`form-control ${errors.loginIdentifier && 'is-invalid'}`}
                                        placeholder="Email or Username"
                                        value={loginIdentifier}
                                        onChange={(e) => setLoginIdentifier(e.target.value)}
                                    />
                                    {errors.loginIdentifier && <div className="invalid-feedback">{errors.loginIdentifier}</div>}
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className={`form-control ${errors.password && 'is-invalid'}`}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>
                                {errorMessage && <div className="error-message" style={{ color: 'red', marginLeft: '30%' }}>{errorMessage}</div>}
                                <button type="button" className="btn btn-link" onClick={handleForgotPassword}>Forgot Password?</button>
                                <button type="button" className="btn btn-link" onClick={handleSignUp} style={{marginLeft:'55%'}}>Sign Up</button>
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
