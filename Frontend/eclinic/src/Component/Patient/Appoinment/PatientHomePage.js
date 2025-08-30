import React, { useEffect ,useState} from "react";
import "./Css/Patienthome.css";
import {  useNavigate} from "react-router-dom";
import BookedSlot from "./BookedSlot";
import HealthTip from "./HealthTip";

import Navbar from "./Navbar";
function PatientHomePage() {
    const navigate = useNavigate()
     const HandleClick =()=>{
        navigate('/SlotBooking')
     }

 
 
  return (
    <div>
      <Navbar/>

      <div className="container">
        <div className="row justify-content-end mt-5">
          <div className="col-md-2 ">
            <button className="btn btn-primary" onClick={HandleClick}><i className="fa-regular fa-calendar-check"></i> Book a Slot</button>
          </div>
        </div>
      </div>




        <div className="container  d-flex justify-content-center">
        <div className="col-md-12 mt-5 w-50">
          <BookedSlot/>
        </div>
      </div>

      <div className="container border border-dark rounded-3 mt-5 d-flex justify-content-center w-50">
        <div className="col-md-12 mt-5 w-50">
          <HealthTip/>
        </div>
      </div>

    </div>
  );
}

export default PatientHomePage;
