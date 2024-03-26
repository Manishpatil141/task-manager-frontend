// import React, { useState, FormEvent } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import backgroundImage from '../../assets/images/backgroundimage.jpg'; // Adjust the path as necessary
// import '../../assets/styles/Signup.css'; // Adjust the path as necessary
// import { sendOtp } from '../../services/users.api';

// const ForgotPassword: React.FC = () => {
//     const [email, setEmail] = useState<string>('');
//     const [otp, setOtp] = useState<string>('');
//     const [newPassword, setNewPassword] = useState<string>('');
//     const [errorMessage, setErrorMessage] = useState<string>('');
//     const [verificationSent, setVerificationSent] = useState<boolean>(false);
//     const [otpVerificationActive, setOtpVerificationActive] = useState<boolean>(false);

//     const handleSendOtp = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
     
//         try {
//             const otpData = {email}
//             const response = await sendOtp(otpData)
//             setOtpVerificationActive(true);
//             console.log(response)
//             if (response.data.code) {
               
//             }
            
//             setErrorMessage('');
//         } catch (error) {
//             setErrorMessage('Failed to send OTP. Please try again.');
//         }

//     };

//     const handleVerifyOtp = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         // // Simulate verifying OTP with the backend
//         // try {
//         //     const response = await fetch('/api/otp/verify-otp', {
//         //         method: 'POST',
//         //         headers: {
//         //             'Content-Type': 'application/json',
//         //         },
//         //         body: JSON.stringify({ email, otp }),
//         //     });
//         //     if (!response.ok) {
//         //         throw new Error('Invalid OTP');
//         //     }
            
//         //     setErrorMessage('');
//         // } catch (error) {
//         //     setErrorMessage('Invalid OTP. Please try again.');
//         // }
//     };

//     const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         // // Simulate resetting the password with the backend
//         // try {
//         //     const response = await fetch('/api/password-reset/reset-password', {
//         //         method: 'POST',
//         //         headers: {
//         //             'Content-Type': 'application/json',
//         //         },
//         //         body: JSON.stringify({ email, newPassword }),
//         //     });
//         //     if (!response.ok) {
//         //         throw new Error('Failed to reset password');
//         //     }
//         //     // Redirect to a success page or show a success message
//         // } catch (error) {
//         //     setErrorMessage('Failed to reset password. Please try again.');
//         // }
//     };

//     return (
//         <div
//             className="container-fluid"
//             style={{
//                 backgroundImage: `url(${backgroundImage})`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//                 height: '100vh',
//                 width: '140vh', // Adjust width as needed
//             }}
//         >
//             <div className="row justify-content-center align-items-center" style={{ height: '100%' }}>
//                 <div className="col-md-7 " >
//                     <div className="card" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '20px' }}>
//                         <div className="card-body">
//                             <form onSubmit={otpVerificationActive ? handleResetPassword : (verificationSent ? handleVerifyOtp : handleSendOtp)}>
//                                 <div className="mb-3">
//                                     <input
//                                         type="email"
//                                         className="form-control"
//                                         placeholder="Email"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                     />
//                                 </div>
//                                 {verificationSent && (
//                                     <div className="mb-3">
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             placeholder="Enter OTP"
//                                             value={otp}
//                                             onChange={(e) => setOtp(e.target.value)}
//                                         />
//                                     </div>
//                                 )}
//                                 {otpVerificationActive && (
//                                     <div className="mb-3">
//                                         <input
//                                             type="password"
//                                             className="form-control"
//                                             placeholder="New Password"
//                                             value={newPassword}
//                                             onChange={(e) => setNewPassword(e.target.value)}
//                                         />
//                                     </div>
//                                 )}
//                                 {errorMessage && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
//                                 <button type="submit" className="btn btn-primary">
//                                     {verificationSent ? (otpVerificationActive ? 'Reset Password' : 'Verify OTP') : 'Send OTP'}
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ForgotPassword;


import React, { useState, FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from '../../assets/images/backgroundimage.jpg'; // Adjust the path as necessary
import '../../assets/styles/Signup.css'; // Adjust the path as necessary
import { resetPassword, sendOtp } from '../../services/users.api';


const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [otpSent, setOtpSent] = useState<boolean>(false);

    const handleSendOtp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const otpData = { email };
            const response = await sendOtp(otpData);
            if(response.data.code===200){
                setOtpSent(true);
            }
            // Set OTP as sent
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Failed to send OTP. Please try again.');
        }
    };

    const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Simulate resetting the password with the backend
            const data ={email, otp, newPassword}
            const response = await  resetPassword(data);
            if(response.data.code===200){
                setErrorMessage(response.data.status);
                setTimeout(() => {
                    // Redirect to login page after 2 seconds
                    window.location.href = '/login';
                }, 2000);
            }

            if(response.data.code===402 ||403){
                setErrorMessage(response.data.status);
            }

        } catch (error) {
            setErrorMessage('Failed to reset password. Please try again.');
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
                            {!otpSent ? (
                                <form onSubmit={handleSendOtp}>
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    {errorMessage && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
                                    <button type="submit" className="btn btn-primary">Send OTP</button>
                                </form>
                            ) : (
                                <form onSubmit={handleResetPassword}>
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email"
                                            value={email}
                                            readOnly
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="New Password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                    {errorMessage && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
                                    <button type="submit" className="btn btn-primary">Reset Password</button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
