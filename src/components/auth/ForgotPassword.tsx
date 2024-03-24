import React, { useState, FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from '../../assets/images/backgroundimage.jpg'; // Path to your background image
import '../../assets/styles/Signup.css'; // Assuming you have a Login.css file for styling

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [verificationSent, setVerificationSent] = useState<boolean>(false);

    const handleSendOtp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Your logic to send OTP to the registered email address
        // This could involve calling a backend API
        // For demonstration purposes, we'll assume OTP sending is successful
        console.log(email)
        setVerificationSent(true);
        setErrorMessage('');
    };

    const handleVerifyOtp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(otp)
        // Your logic to verify the OTP entered by the user
        // This could involve calling a backend API to validate the OTP
        // For demonstration purposes, we'll assume the entered OTP is correct
        if (otp === '123456') {
            // Redirect to a new page to set a new password
            window.location.href = '/reset-password';
        } else {
            setErrorMessage('Invalid OTP. Please try again.');
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
                width: '140vh', // Adjust width as needed
            }}
        >
            <div className="row justify-content-center align-items-center" style={{ height: '100%' }}>
                <div className="col-md-7 " >
                    <div className="card" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '20px' }}>
                        <div className="card-body">
                            <form onSubmit={verificationSent ? handleVerifyOtp : handleSendOtp}>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                {verificationSent && (
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                        />
                                    </div>
                                )}
                                {errorMessage && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
                                <button type="submit" className="btn btn-primary">
                                    {verificationSent ? 'Verify OTP' : 'Send OTP'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
