import React from 'react'
import { useNavigate } from 'react-router-dom'

function UpcomingAppoinments() {
    const navigate = useNavigate()

    const HandlePrescribe = ()=>{
        navigate('/PresciptionForm')
    }
  return (
    <div>
        <h2 className='text-center mt-3'>Upcoming Appoinments</h2>
        <div className="container d-flex justify-content-center mt-4">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                        <h4>Patient Name</h4>
                    </div>
                    <div className="card-body">
                        <h5>Date</h5>
                        <h5>slot</h5>
                    </div>
                    <div className="btn d-flex justify-content-start">
                    <button className='btn btn-primary'>View Details</button>
                    <button className='btn btn-primary ms-4' onClick={HandlePrescribe}>Add Prescription</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpcomingAppoinments