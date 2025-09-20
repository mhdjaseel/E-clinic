import React, { useState, useEffect } from 'react';
import AdminNavbar from '../Profile/AdminNavbar';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function CreateAppointments() {
    const [SelectedDoctor, setSelectedDoctor] = useState('');
    const [Slots, setSlots] = useState([]);
    const [SelectedSlots, setSelectedSlots] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [Visible, setVisible] = useState(false);
  const navigate = useNavigate()
  const location = useLocation();
  const { data } = location.state || {};
const formdata = {
    date:data.date,
    doctor:''
} 
  const formData = {
    departments: data.departments,
    location: data.location.id
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/adminapp/DoctorsAvailable/', formData, {
          headers: {
            "Content-Type": 'application/json'
          }
        });
        setDoctors(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const HandleDoctor = async (e)=>{
    const docId = e.target.value;
    console.log(docId)

    setSelectedDoctor(docId)
    e.preventDefault();

    formdata.doctor= docId
    console.log(formdata)
    
  const token = localStorage.getItem('admin_access');

    if (!token) {
      console.log('No token found');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/AvailableSlotView/', formdata, {
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${token}`
        }
        
      });
      setSlots(response.data)
      console.log(response.data)
      setVisible(true);

    } catch (error) {
      const res_error = error.response?.data.message 
      toast.error(res_error);
      setVisible(false)
    }
  };

const HandleBooking =async ()=>{
      const DetailData ={
        'request_id':data.id,
        'patient':data.patient.id,
        'doctor':SelectedDoctor,
        'slot':SelectedSlots[0].id,
        'Location':data.location.id,
        'departments':data.departments
      }
  
  
        console.log('data .....',DetailData)
  
      if ( SelectedSlots.length > 1) {
      toast.error('only one slot can book')
      return
      }
   const token = localStorage.getItem('admin_access');

    if (!token) {
      console.log('No token found');
      return;
    }
    try{
       const response = await axios.post('http://127.0.0.1:8000/AppointmentView/',DetailData , {
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${token}`
        }
        
      });
      setVisible(false)
      setSelectedSlots('')
      const res=response.data.message
      toast.success(res)
      navigate('/AdminDashboard')

    }
    catch(error){
      toast.error('failed try again')
      console.log(error.response?.data)
    }

  }


  return (
    <div>
      <AdminNavbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Create Appointment</h4>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Patient</label>
                  <input className="form-control" type="text" value={data.patient.user?.username} readOnly />
                </div>

                <div className="mb-3">
                  <label className="form-label">Department</label>
                  <input className="form-control" type="text" value={data.departments} readOnly />
                </div>

                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input className="form-control" type="text" value={data.location.location_name} readOnly />
                </div>

                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input className="form-control" type="text" value={data.date} readOnly />
                </div>

                <div className="mb-4">
                  <label className="form-label">Select Doctor</label>
                  <select className="form-select" name="doctor" value={SelectedDoctor} onChange={HandleDoctor}>
                    <option value="">-- Select Doctor --</option>
                    {
                      doctors.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.user?.username} - {item.hospital_name?.name}
                        </option>
                      ))
                    }
                  </select>
                </div>
                <div className="mb-4">
                  <label className="form-label">Available Slots</label>
                {Visible &&
                Slots.map((item, index) => (
                  <div className="mt-3" key={index}>
                    <p>{item.slot.start_time} - {item.slot.end_time} <input type="checkbox"
                    disabled={item.is_booked}
                 onChange={(e) => {
                  const value = e.target.value;
                  if (e.target.checked) {
                    setSelectedSlots([...SelectedSlots, item]);
                  } else {
                    setSelectedSlots(
                     SelectedSlots.filter((slot) => slot.id !== item.id)

                    );
                  }
                }}

                    /></p>


                  </div>
                ))
              }

                            {
                Visible && 
              <button className='btn btn-primary mt-3' onClick={HandleBooking} >Book</button>

              }
                </div>
                <div className="d-grid">
                  <button className="btn btn-success" >
                    Proceed to Confirm
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAppointments;
