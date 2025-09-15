// components/CallToAction.js
import React from 'react';
import './Css/CallToAction.css';
import { Link } from 'react-router-dom';

function CallToAction() {
  return (
    <div className="cta">
      <h2>Ready to take charge of your health?</h2>
      <p>Log in or register now and get started with E-Clinic.</p>
      <div className="cta-buttons">
         <Link  className=" ctaButtons btn secondary"  to={'PatientLogin/'}> Patient Login </Link>
        <Link  className="ctaButtons btn secondary"  to={'DoctorLogin/'}>Doctor Login </Link>
      </div>
    </div>
  );
}

export default CallToAction;
