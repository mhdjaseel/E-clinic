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
        console.log(response.data)
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
      window.location.reload();  
    }
    catch(error){
      console.log(error)
    }
  }

  // Handle Re Schedule

  const HandleReschedule = (datas) =>{
    navigate('/ResheduleAppoinment',{state :{datas}})
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
            <p><strong>Doctor: </strong>{Data.data.doctor.user?.username}</p>
            <p><strong>Hospital: </strong>{Data.data.doctor.hospital_name.name} </p>
            <p><strong>Specialization: </strong> {Data.data.doctor.specialization.name},{Data.data.location.location_name}</p>
          </div>

          <div className="col-md-6">
            <p><strong>Slot: </strong>{Data.data.slot.slot.start_time} - {Data.data.slot.slot.end_time} </p>
            <p><strong>Date: </strong> {Data.data.slot.date} </p>
            <p><strong>Status: </strong> {Data.data.status}</p>
          </div>

        </div>
        
        <div className="row mt-2">
            <div className="col-md-12">
            <button className='btn btn-danger ms-2' data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Cancel</button>
            <button className='btn btn-info ms-4' onClick={()=>{HandleReschedule(Data)}}>Reschedule</button>
            </div>
        </div>
             
    </div>
        }
      
    </div>
        </div>
        
<div className="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">Cancel Appoinment</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        Are You Sure To Cancel Appoinment  ?
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={HandleCancel}>Yes</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default AppoinmentDetails