import React from 'react';
import './Css/HeroSection.css'; // create this CSS file
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <div className="hero">
      <div className="hero-text">
        <h1>Welcome to E-Clinic</h1>
        <p>Your trusted platform for digital healthcare. Book appointments, consult doctors, and manage your health effortlessly.</p>
        <div className="hero-buttons">
         <Link  className="heroButtons btn secondary"  to={'PatientRegister/'}>Register as Patient</Link>
        <Link  className="heroButtons btn secondary"  to={'DoctorRegister/'}>Register as Doctor</Link>

        </div>
      </div>
      <div className="hero-image">
        <img src="/images/Main.jpg" alt="E-Clinic illustration" />
      </div>
    </div>
  );
}

export default HeroSection;
