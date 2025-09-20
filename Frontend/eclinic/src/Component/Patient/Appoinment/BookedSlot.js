import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BookedSlot() {
  const [Data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const FetchBookings = async () => {
      const token = localStorage.getItem("access");

      if (!token) {
        navigate("/PatientLogin");
        return;
      }

      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/BookedPatientAppoinments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    FetchBookings();
  }, []);

  const HandleDetails =(id)=>{
    
    navigate('/AppoinmentDetails' , { state: { appointmentId: id } })
  }
  return (
    <div className="container mt-2">
      <div className="text-center mb-4">
        <h2 className="fw-bold ">Booked Appointments</h2>
        <hr style={{ width: "200px", margin: "auto" }} />
      </div>

      {Data.length === 0 ? (
        <div className="text-center text-muted mt-5">
          <h5>No appointments booked yet.</h5>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {Data.map((item, index) => (
            <div className="col" key={index}>
              <div className="card shadow-sm border-0 h-100">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                  <span><i className="bi bi-calendar-event me-2"></i>{item.slot.date}</span>
                  <span className="badge bg-light text-dark">{item.slot.slot.start_time} - {item.slot.slot.end_time}</span>
                </div>
                <div className="card-body">
                  <h5 className="card-title mb-2">
                    <i className="bi bi-person-circle me-2"></i>
                    Dr. {item.doctor.user.username}  {item.status === 'rescheduled' && <span className="badge bg-success ms-5">Resheduled</span>}
                  </h5>
                  <p className="card-text mb-1">
                    <strong>Specialization:</strong> {item.doctor.specialization.name}
                  </p>
                  <p className="card-text mb-3">
                    <strong>Hospital:</strong> {item.doctor.hospital_name.name}, {item.location.location_name}
                  </p>
                  <button className="btn btn-outline-primary w-100" onClick={()=>{HandleDetails(item.id)}}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookedSlot;
