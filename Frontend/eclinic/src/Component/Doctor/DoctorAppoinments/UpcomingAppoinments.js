import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UpcomingAppointments() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem('doctor_access');

      if (!token) {
        navigate('/DoctorLogin');
        return;
      }

      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/doctor/BookedDoctorAppoinments',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [navigate]);

  const handlePrescribe = () => {
    navigate('/PresciptionForm');
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 ">Upcoming Appointments</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          {appointments.length > 0 ? (
            appointments.map((item, index) => (
              <div
                className="card shadow-sm mb-4 border-0"
                key={index}
                style={{ borderLeft: '5px solid #007bff' }}
              >
                <div className="card-body">
                  <h5 className="card-title text-dark">
                     Patient: <strong>{item.patient.user.username}</strong>
                  </h5>
                  <p className="card-text mb-2">
                     <strong>Date:</strong> {item.slot.date}
                  </p>
                  <p className="card-text mb-3">
                     <strong>Time Slot:</strong>{' '}
                    {item.slot.slot.start_time} - {item.slot.slot.end_time}
                  </p>
                  <div className="d-flex">
                    <button className="btn btn-outline-primary me-3">
                      View Details
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={handlePrescribe}
                    >
                       Add Prescription
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="alert alert-info text-center" role="alert">
              No upcoming appointments found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpcomingAppointments;
