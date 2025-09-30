import React from 'react';
import './Cancel.css';
import { useNavigate } from 'react-router-dom';

const Cancel = () => {
    const navigate = useNavigate()
    const onRetry = ()=>{
        navigate('/AppoinmentRequest')
    }
  return (
    <div className="cancel-container bg-danger">
      <div className="cancel-card">
        <i className="fas fa-times-circle cancel-icon"></i>
        <h2 className="cancel-title">Payment Failed</h2>
        <p className="cancel-message">
          Your appointment payment could not be processed. Please try again.
        </p>
        <button className="cancel-button" onClick={onRetry}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Cancel;
