import React, { useEffect ,useState} from "react";
import "./Css/Patienthome.css";
import { Link ,useNavigate} from "react-router-dom";
import BookedSlot from "./BookedSlot";
import HealthTip from "./HealthTip";
import axios from "axios";
function PatientHomePage() {
    const navigate = useNavigate()
     const HandleClick =()=>{
        navigate('/SlotBooking')
     }
const [Info, setInfo] = useState({});
  useEffect(() => {
    
    const FetchData = async ()=>{
    const token = localStorage.getItem('access')
      
    if(!token){
      alert('Token expired')
      return
    }

    try{

      const response = await axios.post('http://127.0.0.1:8000/PatientDetailsView/',{},{
        headers:{
            Authorization:`Bearer ${token}`
        }
      })
      setInfo(response.data)
      console.log(Info)
    }
    catch(error){
      alert(error)
    }
    }

    
  FetchData();
  }, []);


  return (
    <div>
     <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ fontFamily: "Arial" }}>
  <div className="container-fluid">
 {Info.user && (
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
          <Link className="nav-link active " to="/PatientDashboard">Home</Link>
        </li>
        <li className="nav-item mx-3">
          <Link className="nav-link active" to="/history">History</Link>
        </li>
        <li className="nav-item mx-3">
          <Link className="nav-link active" to="/">Payments</Link>
        </li>
        <li className="nav-item mx-3">
          <Link className="nav-link active" to="/">Doctor</Link>
        </li>
      </ul>

      <div className="d-flex ms-auto">
        <button type="submit" className="btn btn-success">Logout</button>
      </div>
    </div>
  </div>
</nav>

  <div className="container">
        <div className="row  mt-5">
          <div className="col-md-10 text-center">
            <h2 className="">Booked Appoinments</h2>
          </div>
          <div className="col-md-2 text-end ">
            <button className="btn btn-primary" onClick={HandleClick}><i className="fa-regular fa-calendar-check"></i> Book a Slot</button>
          </div>
        </div>
      </div>

      <div className="container  d-flex justify-content-center">
        <div className="col-md-12 mt-5 w-50">
          <BookedSlot />
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
