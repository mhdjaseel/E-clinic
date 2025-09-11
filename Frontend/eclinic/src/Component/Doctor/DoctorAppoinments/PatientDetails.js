import React from 'react'
import { useLocation } from 'react-router-dom'
import DoctorNavbar from '../Profile/DoctorNavbar'

function PatientDetails() {
    const location = useLocation()
    const {data} = location.state || {}
    console.log('data.....',data)
    return (
    <div>
        <DoctorNavbar/>
    <div className="card mx-auto mt-5 shadow" style={{ maxWidth: '700px', borderRadius: '10px' }}>

      <div className="bg-primary text-white text-center p-3" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
        <h3>Patient Details</h3>
      </div>
      <div className="card-body">
         <div className="row mb-3">
          <div className="col-md-6">
            <p><strong>Name:</strong> {data.patient.user?.username}</p>
            <p><strong>Address :</strong> {data.patient.address}</p>
            <p><strong>Gender:</strong> {data.patient.gender}</p>
            

          </div>
          <div className="col-md-6">
            <p><strong>Phone:</strong> {data.patient.phone_number} </p>
            <p><strong>Date Of Birth:</strong> {data.patient.date_of_birth}</p>

          </div>
          </div>
      </div>
      </div>
    </div>
  )
}

export default PatientDetails