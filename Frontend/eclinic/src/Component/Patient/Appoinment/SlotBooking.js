import React, { useState ,useEffect} from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate ,useLocation} from 'react-router-dom';

function SlotBooking() {
  const [Data, setData] = useState({
  doctor: '',
  date: ''
});
  const [SelectedSlots, setSelectedSlots] = useState([]);
  const [Slots, setSlots] = useState([]);
  const [Visible, setVisible] = useState(false);
  const location = useLocation()
  const {doctor} = location.state
  const navigate = useNavigate()
  useEffect(() => {
    if (doctor?.id) {
      setData(prev=>({
                  ...prev,
          doctor:doctor.id
    }))
    }

  }, []);



  const HandleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const HandleClick = async (e) => {
    e.preventDefault();
  const token = localStorage.getItem('access');

    if (!token) {
      console.log('No token found');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/AvailableSlotView/', Data, {
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${token}`
        }
        
      });
      setSlots(response.data)
      setVisible(true);

    } catch (error) {
      const res_error = error.response?.data.message 
      toast.error(res_error);
      setVisible(false)
    }
  };

    // console.log('slot .....',SelectedSlots[0].slot.id )

  const HandleBooking =   async()=>{


    const FormData ={
      'doctor':doctor.id,
      'slot':SelectedSlots[0].id
    }
                    console.log('response data.....',Slots)

                    console.log('id.....',SelectedSlots[0].id)

      console.log('data .....',FormData)

    if ( SelectedSlots.length > 1) {
    toast.error('only one slot can book')
    return
    }
    const token = localStorage.getItem('access');

    if (!token) {
      console.log('No token found');
      return;
    }
    try{
       const response = await axios.post('http://127.0.0.1:8000/AppointmentView/',FormData , {
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${token}`
        }
        
      });
      setVisible(false)
      setSelectedSlots('')
      const res=response.data.message
      toast.success(res)
      navigate('/PatientDashboard')

    }
    catch(error){
      toast.error('failed try again')
      console.log(error.response?.data)
    }

  }


  return (
    <div>
      <Navbar />

      <h1 className='text-center mt-5'>Book an Appointment</h1>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={HandleClick}>


                <div className="mt-2">
                <label className='form-label fs-5'>Doctor</label>
                <input
                  type="text"
                  className='form-control'
                  readOnly
                  value={doctor.user?.username}

                />
              </div>

                  <div className="mt-2">
                <label className='form-label fs-5'>Hospital</label>
                <input
                  type="text"
                  className='form-control'
                  readOnly
                  value={doctor.Hospital_name}

                />
              </div>

              <div className="mt-2">
                <label className='form-label fs-5'>Date</label>
                <input
                  type="date"
                  name="date"
                  onChange={HandleChange}
                  className='form-control'
                  required
                />
              </div>


              
              <button className='btn btn-primary mt-3' >View Slots</button>

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

            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default SlotBooking;
