import React from 'react';
import './Css/HeroSection.css'; // create this CSS file
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <>


    <header>
      <div className="container">
        <div className="row align-items-center py-2">
          {/* Left Side - Heading */}
          <div className="col-md-6">
            <h3 className="mb-0 text-primary">
              E-Clinic
            </h3>
          </div>

          {/* Right Side - Login Button */}
          <div className="col-md-6 d-flex justify-content-end">
            <Link className="btn btn-outline-primary btn-sm" to="/AdminLogin">
              <i className="fas fa-user-cog"></i> Admin
            </Link>
          </div>
        </div>
      </div>
    </header>
  



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
    </>

  );
}

export default HeroSection;
