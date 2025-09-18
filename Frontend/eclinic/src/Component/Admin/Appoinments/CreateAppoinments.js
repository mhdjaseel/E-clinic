import React from 'react'

import AdminNavbar from '../Profile/AdminNavbar'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
function CreateAppoinments() {
    const location = useLocation()
    const {data} = location.state || {}

    // useEffect(() => {
        
    // const fetchData = async() =>{
    //     try{
    //         await axios.post()
    //     }
    // }
    // }, []);
    return (
    <div>
        <AdminNavbar/>
        <div className="container mt-3 d-flex justify-content-center">
            
            
            <div className="col-md-6">
            <h2 >Create Appoinment</h2>

                <div className="card shadow-sm">
                    <div className="card-body">
                        <label className='form-label mt-2'>Patient</label>
                        <input className='form-control mt-1' type="text" placeholder={data.patient.user?.username} readOnly/>

                        <label className='form-label mt-2'>Department</label>
                        <input className='form-control mt-1' type="text" placeholder={data.departments} readOnly/>

                        <label className='form-label mt-2'>Location</label>
                        <input className='form-control mt-1' type="text" placeholder={data.location.location_name } readOnly/>

                        <label className='form-label mt-2'>Date</label>
                        <input className='form-control mt-1' type="text" placeholder={data.date} readOnly/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateAppoinments