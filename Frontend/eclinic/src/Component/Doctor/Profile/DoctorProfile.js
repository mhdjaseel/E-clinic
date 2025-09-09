import React from 'react'
import DoctorNavbar from './DoctorNavbar'
import UpcomingAppoinments from '../DoctorAppoinments/UpcomingAppoinments'
import { useNavigate } from 'react-router-dom'

function DoctorProfile() {
     const navigate = useNavigate()

    const HandleSlots = ()=>{
    navigate('/SetSlots')
  }
  return (
    <div>
      <DoctorNavbar/>
      <div className="container mt-3">
        <div className="col-md-12">
          <div className="btn d-flex justify-content-end">
          <button className='btn btn-primary' onClick={HandleSlots}><i className="fa-regular fa-calendar-check"></i> Set Slots</button>

          </div>

        </div>
      </div>
        <UpcomingAppoinments/>
    </div>
  )
}

export default DoctorProfile