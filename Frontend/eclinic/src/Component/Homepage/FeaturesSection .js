// components/FeaturesSection.js
import React from 'react';
import './Css/FeaturesSection.css';

function FeaturesSection() {
  return (
    <div className="features">
      <h2>Why Choose E-Clinic?</h2>
      <div className="features-grid">
        <div className="feature-card">
          <img src="/Images/appointment.jpg" alt="Appointment" style={{ width: '200px', height: '150px' , borderRadius: '12px'}}/>
          <h3>Easy Appointments</h3>
          <p>Book appointments with your preferred specialists online.</p>
        </div>
        <div className="feature-card">
          <img src="/images/payment.jpg" alt="Payment"style={{ width: '200px', height: '150px' , borderRadius: '12px'}}/>
          <h3>Online Payments</h3>
          <p>Secure and simple payments for consultations and services.</p>
        </div>
        <div className="feature-card">
          <img src="/Images/Doctors.jpg" alt="Specialists" style={{ width: '200px', height: '150px' , borderRadius: '12px'}}/>
          <h3>Specialist Doctors</h3>
          <p>Access a wide variety of experienced and certified doctors.</p>
        </div>
      </div>
    </div>
  );
}

export default FeaturesSection;
