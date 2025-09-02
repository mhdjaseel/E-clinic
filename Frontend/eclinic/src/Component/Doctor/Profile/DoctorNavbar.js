import React, { useState,useEffect } from 'react'
import axios from 'axios';

import { useNavigate ,Link} from 'react-router-dom';

function DoctorNavbar() {
    const navigate = useNavigate()
    const [Info, setInfo] = useState();
    useEffect(() => {
    
    // Fetch User Data............

    const FetchData = async ()=>{
    const token = localStorage.getItem('doctor_access')
      
    if(!token){
      navigate('/DoctorLogin')
      return
    }

    try{

      const response = await axios.get('http://127.0.0.1:8000/doctor/DoctorProfileView/',{
        headers:{
            Authorization:`Bearer ${token}`
        }
      })
      setInfo(response.data)
      console.log(response.data)
    }
    catch(error){
    if (error.response && error.response.status === 401) {
      alert('Session expired. Please log in again.');
      localStorage.removeItem('doctor_access');
      localStorage.removeItem('doctor_refresh');
      navigate('/DoctorLogin');
        }
    }
    }

  FetchData()
  
    

  }, []);
   const Logout=()=>{
  localStorage.removeItem('doctor_access')
  localStorage.removeItem('doctor_refresh')
  navigate('/DoctorLogin')
 }
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ fontFamily: "Arial" }}>
  <div className="container-fluid">
{Info && Info.user && (
  <a className="navbar-brand" href="#">{Info.user.username}</a>
)}

    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto" style={{fontSize:18}}>
        <li className="nav-item mx-3">
          <Link className="nav-link active " to="/DoctorProfile">Home</Link>
        </li>
        <li className="nav-item mx-3">
          <Link className="nav-link active" to="#">History</Link>
        </li>
        <li className="nav-item mx-3">
          <Link className="nav-link active" to="/DoctorProfilePage">Profile</Link>
        </li>
      </ul>

      <div className="d-flex ms-auto">
        <button type="submit" className="btn btn-success" onClick={Logout}>Logout</button>
      </div>
    </div>
  </div>
</nav>
    </div>
  )
}

export default DoctorNavbar