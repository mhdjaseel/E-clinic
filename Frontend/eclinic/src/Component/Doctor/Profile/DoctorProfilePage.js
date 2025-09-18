import React ,{useEffect,useState}from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import DoctorNavbar from './DoctorNavbar';

function DoctorProfilePage() {
     const [Info, setInfo] = useState({});
     const navigate = useNavigate()
     
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


  return (
    <div>
    <DoctorNavbar/>
     <div className="card mx-auto mt-5 shadow" style={{ maxWidth: '700px', borderRadius: '10px' }}>
      <div className="bg-primary text-white text-center p-3" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
        <h3>Doctor Profile</h3>
      </div>
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-md-6">
            <p><strong>Name:</strong>{Info.user?.username}</p>
            <p><strong>Hospital :</strong> {Info.hospital_name?.name}</p>
            <p><strong>Gender:</strong> {Info.gender}</p>
            

          </div>
          <div className="col-md-6">
            <p><strong>Phone:</strong> {Info.phone_number} </p>
            <p><strong>specialization:</strong> {Info.specialization}</p>

          </div>
        </div>
            
        
        
    </div>
    </div>
    </div>
  )
}

export default DoctorProfilePage