import React from 'react';
import '../../assets/styles/loading.css';
import loadingGif from '../../assets/images/loading.gif'; // Import the loading GIF

const LoadingSpinner: React.FC = () => {
    return (
        <div className="loading-overlay">
            <img src={loadingGif} alt="Loading" className="loading-spinner loading-size" />
        </div>
    );
};

export default LoadingSpinner;
