import React,{useState,useEffect} from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

function AppoinmentDetails() {
    const [Data, setData] = useState();
    const location = useLocation()
    const { appointmentId } = location.state || {};
    const navigate = useNavigate();
    useEffect(() => {
    const FetchBookings = async () => {
      const token = localStorage.getItem("access");

      if (!token) {
        navigate("/PatientLogin");
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/PatientAppoinmentsDetails/${appointmentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    FetchBookings();
  }, []);

  // Handle Cancel 
  const HandleCancel = async ()=>{
      const token = localStorage.getItem("access");
    
      if (!token) {
        navigate("/PatientLogin");
        return;
      }
    try{
      const response= await axios.delete(`http://127.0.0.1:8000/CancelAppoinmentView/${appointmentId}`,
        {
          headers: {
              Authorization: `Bearer ${token}`,
            },
    })
      
      const res=response.data.message
      toast.success(res)
      navigate('/PatientDashboard')

    }
    catch(error){
      console.log(error)
    }
  }

  // Handle Re Schedule

  const HandleReschedule = (datas) =>{
    navigate('/ResheduleAppoinment',{state :{id:datas.id, doctor:datas.doctor}})
  }

  return (
    <div>
        <Navbar/>
        <div className="container">
            <div className="card mx-auto mt-5 shadow" style={{ maxWidth: '700px', borderRadius: '10px' }}>
      <div className="bg-primary text-white text-center p-3" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
        <h3> Appoinment Details</h3>
      </div>
        {
            Data && 
            <div className="card-body">
        <div className="row mb-3">

          <div className="col-md-6">
            <p><strong>Doctor: </strong>{Data.doctor.user.username}</p>
            <p><strong>Hospital: </strong>{Data.doctor.Hospital_name} </p>
            <p><strong>Specialization: </strong> {Data.doctor.specialization}</p>
          </div>

          <div className="col-md-6">
            <p><strong>Slot: </strong>{Data.slot.slot.start_time} - {Data.slot.slot.end_time} </p>
            <p><strong>Date: </strong> {Data.slot.date} </p>
            <p><strong>Status: </strong> {Data.status}</p>
          </div>

        </div>
        
        <div className="row mt-2">
            <div className="col-md-12">
            <button className='btn btn-danger ms-2' onClick={HandleCancel}>Cancel</button>
            <button className='btn btn-info ms-4' onClick={()=>{HandleReschedule(Data)}}>Reschedule</button>
            </div>
        </div>
             
    </div>
        }
      
    </div>
        </div>
    </div>
  )
}

export default AppoinmentDetails