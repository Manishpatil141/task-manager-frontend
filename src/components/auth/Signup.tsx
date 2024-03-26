import React, { useState, FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from '../../assets/images/backgroundimage.jpg'; // Path to your background image
import '../../assets/styles/Signup.css';
import { signUpUser } from '../../services/users.api';
import { validateSignupForm } from '../../helpers/validations/user.validation';

const Signup: React.FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
   
    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = validateSignupForm(firstName, lastName, username, email, password, confirmPassword);
        if (validationErrors) {
            setErrors(validationErrors);
            // Clear validation errors after 3 seconds
            setTimeout(() => {
                setErrors({
                    firstName: '',
                    lastName: '',
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
            }, 3000);
            return;
        }

        try {
            // Call the signup API
            const userData = { firstName, lastName, username, email, password };
            const response = await signUpUser(userData);
            if (response.data.code === 409) {
                setErrorMessage(response.data.status);
                setTimeout(() => {
                    // Redirect to login page after 2 seconds
                    window.location.href = '/login';
                }, 2000);
            }
            if (response.data.code === 200) {
                setErrorMessage(response.data.status);
                setTimeout(() => {
                    // Redirect to login page after 2 seconds
                    window.location.href = '/login';
                }, 2000);
                
            }

        } catch (error) {
            setErrorMessage('Signup failed');
        }
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
                    <div className="card" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                        <div className="card-body">
                            <form onSubmit={handleSignup}>
                                <div className="mb-3 row">
                                    <div className="col">
                                        <input
                                            type="text"
                                            className={`form-control ${errors.firstName && 'is-invalid'}`}
                                            placeholder="First Name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                        {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                                    </div>
                                    <div className="col">
                                        <input
                                            type="text"
                                            className={`form-control ${errors.lastName && 'is-invalid'}`}
                                            placeholder="Last Name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                        {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className={`form-control ${errors.username && 'is-invalid'}`}
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email && 'is-invalid'}`}
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
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
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className={`form-control ${errors.confirmPassword && 'is-invalid'}`}
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                                </div>
                                {errorMessage && <div className="error-message" style={{ color: 'red',  marginLeft:'30%',marginBottom:'10%',position:'relative'}}>{errorMessage}</div>}
                                <button type="submit" className="btn btn-primary">Signup</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
