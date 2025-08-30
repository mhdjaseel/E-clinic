import React, { useEffect ,useState} from "react";
import "./Css/Patienthome.css";
import { Link ,useNavigate} from "react-router-dom";
import BookedSlot from "./BookedSlot";
import HealthTip from "./HealthTip";
import axios from "axios";
import InsuranceDetails from "../Insurance/InsuranceDetails";
import NoInsurance from "../Insurance/NoInsurance";
import HaveInsurance from "../Insurance/HaveInsurance";
function Navbar() {
    const navigate = useNavigate()
     const HandleClick =()=>{
        navigate('/SlotBooking')
     }
const [Info, setInfo] = useState({});
const [InsuranceData, setInsuranceData] = useState({});
  useEffect(() => {
    
    // Fetch User Data............

    const FetchData = async ()=>{
    const token = localStorage.getItem('access')
      
    if(!token){
      alert('Token expired')
      return
    }

    try{

      const response = await axios.get('http://127.0.0.1:8000/PatientDetailsView/',{
        headers:{
            Authorization:`Bearer ${token}`
        }
      })
      setInfo(response.data)
    }
    catch(error){
      alert(error)
    }
    }

  FetchData()
  
    

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
        <li className="nav-item mx-3">
          <Link className="nav-link active" to="/PatientProfile">Profile</Link>
        </li>
      </ul>

      <div className="d-flex ms-auto">
        <button type="submit" className="btn btn-success">Logout</button>
      </div>
    </div>
  </div>
</nav>


    </div>
  );
}

export default Navbar;
