import React from 'react'
import DoctorNavbar from './DoctorNavbar'
import UpcomingAppoinments from '../DoctorAppoinments/UpcomingAppoinments'

function DoctorProfile() {
  return (
    <div>
      <DoctorNavbar/>
        <UpcomingAppoinments/>
    </div>
  )
}

export default DoctorProfile