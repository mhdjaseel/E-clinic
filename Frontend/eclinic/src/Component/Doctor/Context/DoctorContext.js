import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 1. Create the context
export const DoctorContext = createContext();

// 2. Create the provider component
export const DoctorProvider = ({ children }) => {
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      const token = localStorage.getItem('doctor_access');

      if (!token) {
        navigate('/DoctorLogin');
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/doctor/DoctorProfileView/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDoctor(response.data);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
        // Handle expired/invalid token
        navigate('/DoctorLogin');
      }
    };

    fetchDoctor();
  }, [navigate]);
  return (
    <DoctorContext.Provider value={doctor}>
      {children}
    </DoctorContext.Provider>
  );
};
