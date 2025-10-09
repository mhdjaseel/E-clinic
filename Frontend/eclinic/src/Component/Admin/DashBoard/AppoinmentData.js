import { useState } from "react";
import { useLocation } from "react-router-dom";

function AppoinmentData() {
  const location = useLocation()
  const data = location.state ||{}
  return (
    <div className="container">
      <div className="card  mx-auto mt-5 shadow ">
        <div className="bg-primary rounded text-white fs-3 text-center p-3">
          Appoinment Details
        </div>
        <div className="card-body">
          <div className="row mt-2">
          <div className="col-md-6">
            <p><strong>Patient</strong>:{data.patient.user?.username}</p>
            <p><strong>Doctor</strong>:{data.doctor.user?.username}</p>
            <p><strong>Department</strong>:{data.departments.name}</p>

          </div>
          <div className="col-md-6">
            <p><strong>Date</strong>:{data.slot?.date}</p>
            <p><strong>Slot</strong>:{data.slot?.slot?.start_time} - {data.slot?.slot?.end_time}</p>
            <p><strong>Location</strong>:{data.doctor?.hospital_name?.name},{data.location.location_name}</p>

          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default AppoinmentData;
