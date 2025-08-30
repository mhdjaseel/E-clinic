import React ,{useEffect,useState}from 'react';
import axios from 'axios';
import Navbar from '../Appoinment/Navbar';
import { useNavigate } from "react-router-dom";

const PatientProfile = () => {
    const [Info, setInfo] = useState({});
    
  const [InsuranceData, setInsuranceData] = useState();
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
  
    // Fetch Insurance Data............

    const FetchInsuranceData = async ()=>{
    const token = localStorage.getItem('access')
      
    if(!token){
      alert('Token expired')
      return
    }

    try{

      const response = await axios.get('http://127.0.0.1:8000/InsuranceDetails/',{
        headers:{
            Authorization:`Bearer ${token}`
        }
      })
      setInsuranceData(response.data)
    }
    catch(error){
      alert(error)
    }
    }

  FetchInsuranceData()
  
  }, []); 
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/InsuranceForm");
  };

  return (
    <>
    <Navbar/>
    <div className="card mx-auto mt-5 shadow" style={{ maxWidth: '700px', borderRadius: '10px' }}>

      <div className="bg-primary text-white text-center p-3" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
        <h3>Patient Profile</h3>
      </div>
      <div className="card-body">
        {
            Info &&(
                <div className="row mb-3">
          <div className="col-md-6">
            <p><strong>Name:</strong> {Info.user?.username}</p>
            <p><strong>Date Of Birth:</strong> {Info.date_of_birth}</p>
            <p><strong>Gender:</strong> {Info.gender}</p>
            

          </div>
          <div className="col-md-6">
            <p><strong>Phone:</strong> {Info.phone_number}</p>
            <p><strong>Email:</strong> {Info.user?.email}</p>
            <p><strong>Address:</strong> {Info.address}</p>

          </div>
        </div>
            )
        }
        <hr />
        
      </div>
    </div>
    <div className="card mx-auto mt-5 shadow" style={{ maxWidth: '700px', borderRadius: '10px' }}>

      <div className="bg-primary text-white text-center p-3" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
        <h3>Insurance Details</h3>
      </div>
      <div className="card-body">
           {InsuranceData && InsuranceData.length > 0 ? (
  InsuranceData.map((item, index) => (
    <div className="row mb-3" key={index}>
      <div className="col-md-6">
        <p><strong>Insurance Company Name:</strong> {item.Company_name}</p>
        <p><strong>Policy/Member ID Number:</strong> {item.Policy_number}</p>
        <p><strong>Full Name of Policyholder:</strong> {item.Policy_holder}</p>
      </div>
      <div className="col-md-6">
        <p><strong>Insurance Plan Type:</strong> {item.Plan_type}</p>
        <p><strong>Policy Effective Date:</strong> {item.Policy_date}</p>
        <p><strong>Verified:</strong> {item.Verified ? ' Yes' : ' No'}</p>
      </div>
      {
       item.Verified === false &&   <small  style={{ color: 'orange', fontWeight: 'bold' }}>Insurance verified only After Verification</small>
        
      }
    </div>
  ))
) : (
    <div className="row mx-auto">
        <div className="col-md-6">
                <h4>
  No insurance data available

    </h4>
        </div>
        <div className="col-md-6"> 
                        <button
              className="btn btn-primary "
              onClick={handleClick}
            >
              Add Details
            </button>
        </div>
    </div>
)}
        </div>
    </div>
    </>

  );
};

export default PatientProfile;