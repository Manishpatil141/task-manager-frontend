import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../NavBars/side.navbar';
import TopNavbar from '../NavBars/top.navbar';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import background from "../../assets/images/addTask.jpg";
import ChangePasswordModal from '../TaskModels/changePassword.model';
import { userDetails } from '../../services/users.api';
 // Import ChangePasswordModal component

const Profile: React.FC = () => {
  // Hardcoded profile data
  const [profileData, setProfileData] = useState({
    email: 'example@email.com',
    firstName:"",
    lastName:"",
    userName: 'johndoe123',
    profilePhoto: background, // Placeholder image URL
  });


  
  useEffect(() => {
    const fetchUser = async () => {
        try {
            const userIdString = localStorage.getItem("user");
            if (userIdString !== null) {
                const userId = parseInt(userIdString);  // Convert user ID to a number
                if (!isNaN(userId)) {
                    const response = await userDetails({ userId });
                    setProfileData(response.data.data);
                } else {
                    console.error('User ID is not a valid number');
                }
            } else {
                console.error('User ID not found in localStorage');
            }
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    };

    fetchUser();
}, []);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false); // State to control modal visibility

  // Function to handle profile photo click
  const handleProfilePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Function to handle profile photo change
  const handleProfilePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setProfileData({
            ...profileData,
            profilePhoto: e.target.result as string,
          });
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  // Function to handle password change
  const handleChangePassword = () => {
    setShowPasswordModal(true); // Show the password change modal
  };

  // Function to close the password change modal
  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
  };

  // Function to handle password change
  const onChangePassword = (newPassword: string , currentPassword:string) => {
   console.log(newPassword,currentPassword)
    setShowPasswordModal(false); // Close the modal after changing the password
  };

  return (
    <div className="container-fluid" style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1">
          <TopNavbar onSearch={() => { }} />
          <section style={{ backgroundColor: 'transparent' }}>
            <MDBContainer className="py-5">
              <MDBRow className="justify-content-center align-items-center">
                <MDBCol md="8" className="mb-4 " style={{ marginLeft: '0.1px' }}>
                  <MDBCard style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    <MDBCardBody className="text-center">
                      <MDBCardImage
                        src={ background}
                        alt="avatar"
                        className="rounded-circle mx-auto mb-4"
                        style={{ width: '150px', height: '150px', cursor: 'pointer' }}
                        onClick={handleProfilePhotoClick}
                      />
                      <input
                        id="profile-photo"
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleProfilePhotoChange}
                      />
                      <MDBCardText className="mb-1"><strong>Name:</strong> {profileData.firstName+'\t'+profileData.lastName}</MDBCardText>
                      <MDBCardText className="mb-1"><strong>Username:</strong> {profileData.userName}</MDBCardText>
                      <MDBCardText className="mb-3"><strong>Email:</strong> {profileData.email}</MDBCardText>
                      <MDBBtn onClick={handleChangePassword}>Change Password</MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol md="4" className="mb-4">
                  {/* Additional details can be added here */}
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>
        </div>
      </div>
      {/* Render ChangePasswordModal if showPasswordModal is true */}
      <ChangePasswordModal showModal={showPasswordModal} onClose={handleClosePasswordModal} onChangePassword={onChangePassword} />
    </div>
  );
};

export default Profile;
