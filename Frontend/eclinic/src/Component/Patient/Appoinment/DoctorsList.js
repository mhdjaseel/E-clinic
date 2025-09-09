import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

function DoctorsList() {
  const [DoctorsList, setDoctorsList] = useState([]);
  const navigate = useNavigate();

  const HandleClick = (doctor) => {
    navigate('/SlotBooking', { state: { doctor } });
  };

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/DoctorsListView');
        setDoctorsList(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    FetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="text-center mt-4 mb-4">Available Doctors</h1>

      <div className="container">
        <div className="row">
          {DoctorsList.map((doctor, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div className="card doctor-card shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src="https://via.placeholder.com/60"
                      alt="Doctor"
                      className="rounded-circle me-3"
                      width="60"
                      height="60"
                    />
                    <div>
                      <h5 className="card-title mb-0">{doctor.user?.username || 'Dr. Unknown'}</h5>
                      <small className="text-muted">{doctor.specialization}</small>
                    </div>
                  </div>
                  <p className="mb-1"><strong>Hospital:</strong> {doctor.Hospital_name}</p>
                  <p className="mb-1"><strong>Phone:</strong> {doctor.phone_number}</p>
                  <p className="mb-3"><strong>Gender:</strong> {doctor.gender}</p>
                  <button className="btn btn-primary w-100" onClick={() => HandleClick(doctor)}>
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DoctorsList;
