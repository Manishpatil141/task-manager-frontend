import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import logo from '../../assets/images/logo.png';
import '../../assets/styles/sideNavBar.css'; // Import the CSS file

const Sidebar: React.FC = () => {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 sidebar-container">
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <img src={logo} alt="Company Logo" width="100" height="100" className="logo-img" />
            </a>
            <hr style={{ border: 'none', borderBottom: '2px solid black', marginBottom: '20px' }} />

            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href="#" className="nav-link active" aria-current="page">
                        <i className="bi bi-house-door"></i> Home
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-nowrap">
                        <i className="bi bi-star"></i> Starred Tasks
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-nowrap">
                        <i className="bi bi-grid-3x3-gap"></i> Category
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-nowrap">
                        <i className="bi bi-person"></i> Profile
                    </a>
                </li>
            </ul>
            <ul className="nav nav-pills flex-column">
            <hr style={{ border: 'none', borderBottom: '1px solid black', marginBottom: '20px' }} />
                <li>
                    <a href="#" className="nav-link text-nowrap logout-link">
                        <i className="bi bi-box-arrow-right"></i> Logout
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
