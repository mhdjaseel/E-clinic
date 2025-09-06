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


  const [Slots, setSlots] = useState([]);
  const [Visible, setVisible] = useState(false);
  const location = useLocation()
  const {doctor} = location.state 
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
      console.log("Sending data:", Data);  

    try {
      const response = await axios.post('http://127.0.0.1:8000/AvailableSlotView/', Data, {
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Response data:", response.data);
      setSlots(response.data);

      setVisible(true);
    } catch (error) {
      const res_error = error.response?.data.message 
      toast.error(res_error);
      setVisible(false)
    }
  };
console.log(Slots)
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
                    <p>{item.slot.start_time} - {item.slot.end_time} <input type="checkbox" /></p>
                  </div>
                ))
              }
              
              {
                Visible && 
              <button className='btn btn-primary mt-3' >Book</button>

              }

            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default SlotBooking;
