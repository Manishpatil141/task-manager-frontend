import { axiosInstance } from "./request";

export const signUpUser = async (userData: any) => {
    try {
        const response = await axiosInstance.post('users/signup', userData);
        return response;
    } catch (error) {
        throw new Error('Failed to sign up user');
    }
};

export const loginUser = async (loginData: any) => {
    try {
        const response = await axiosInstance.post('users/login', loginData);
        return response;
    } catch (error) {
        throw new Error('Failed to log in user');
    }
};

export const sendOtp = async (otpData:any)=>{
    try{
        const response = await axiosInstance.post('users//send-otp',otpData);
        return response
    }catch(error){
        throw new Error('Failed to send otp')
    }
}

export const resetPassword = async(data:any)=>{
    try{
        const response = await axiosInstance.post('users/reset-password',data)
        return response
    }catch(error){
        throw new Error('Failed to reset password')
    }
}