import React ,{useEffect,useState}from 'react'
import { useLocation } from 'react-router-dom'
import DoctorNavbar from '../Profile/DoctorNavbar'
import axios from 'axios'
import { toast } from 'react-toastify'

function PatientDetails() {
    const location = useLocation()
    const {data} = location.state || {}
    const [Data, setData] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
      const patient_id=data.patient.id

      const token = localStorage.getItem("doctor_access");

      if (!token) {
        console.log("No token found");
        return;
      }
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/doctor/PatientMedicalHistory${patient_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response.data);
        console.log(response.data);
      } catch (error) {
        toast.error(error.response?.data);
      }
    };
    fetchData();
  }, []);


    return (
    <div>
        <DoctorNavbar/>
    <div className="card mx-auto mt-5 shadow" style={{ maxWidth: '700px', borderRadius: '10px' }}>

      <div className="bg-primary text-white text-center p-3" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
        <h3>Patient Details</h3>
      </div>
      <div className="card-body">
         <div className="row mb-3">
          <div className="col-md-6">
            <p><strong>Name:</strong> {data.patient.user?.username}</p>
            <p><strong>Address :</strong> {data.patient.address}</p>
            <p><strong>Gender:</strong> {data.patient.gender}</p>
            

          </div>
          <div className="col-md-6">
            <p><strong>Phone:</strong> {data.patient.phone_number} </p>
            <p><strong>Date Of Birth:</strong> {data.patient.date_of_birth}</p>
          </div>
          </div>
      </div>
      </div>
      
<div className="card mx-auto mt-5 shadow" style={{ maxWidth: '700px', borderRadius: '10px' }}>
  <div className="  text-center p-3" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
    <h4> Medical History</h4>
  </div>
  <div className="card-body">
    {Data.length === 0 ? (
      <div className="text-center text-muted">
        <p>No medical history found for this patient.</p>
      </div>
    ) : (
      <div className="d-flex flex-column gap-3">
        {Data.map((item, index) => (
          <div className="card border-0 shadow-sm" key={index}>
            <div className="card-header bg-info text-white">
              <strong> Appointment Date:</strong> {item.appointment?.slot?.date || 'N/A'}
            </div>
            <div className="card-body">
              <h5 className="card-title text-secondary">
                 Dr. {item.doctor?.user?.username || 'Unknown'} ({item.doctor?.specialization.name || 'N/A'})
              </h5>
              <p className="mb-2">
                 <strong>Hospital:</strong> {item.doctor?.hospital_name.name || 'N/A'}, {item.doctor?.hospital_name.location.location_name}
              </p>
              <p className="mb-2">
                 <strong>Disease Summary:</strong> {item.summary || 'N/A'}
              </p>

            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

    </div>
  )
}

export default PatientDetails