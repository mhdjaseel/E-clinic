// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from './HeroSection ';
import FeaturesSection from '../Homepage/FeaturesSection '
import CallToAction from './CallToAction ';
import './Css/Homepage.css'
function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <CallToAction />
    </div>
  );
}

export default HomePage;
