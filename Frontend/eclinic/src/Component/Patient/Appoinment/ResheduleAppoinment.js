import axios from 'axios';
import React ,{useState}from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

function ResheduleAppoinment() {
    const [SelectedSlots, setSelectedSlots] = useState([]);
    const [Slots, setSlots] = useState();
    const [Visible, setVisible] = useState(false);
    const location = useLocation()
    const {id,doctor} = location.state || {}
    const navigate = useNavigate()
    const [Data, setData] = useState({
      doctor:doctor?.id,
      date:''
    });
  

    // Handle Click

    const HandleClick = async (e)=>{
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
      console.log(response.data)
      const res = response?.data.message 
      toast.success(res)
      setVisible(true)

    } catch (error) {
      const res_error = error.response?.data.message 
      toast.error(res_error);
      setVisible(false)
    }
  };


    
  const HandleBooking =   async()=>{


    const FormData ={
      'doctor':doctor.id,
      'selected_slot':SelectedSlots[0].id,
      'id':id
    }



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
       const response = await axios.put('http://127.0.0.1:8000/RescheduleView/',FormData , {
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
        <div className="mt-2">
                <label className='form-label fs-5'>Date</label>
                <input
                  type="date"
                  name="date"
                  onChange={(e)=>{
                    const {name,value} = e.target
                    setData({
                      ...Data,
                      [name]:value
                    })
                  }}
                  className='form-control'
                  required
                />
              </div>


              
              <button className='btn btn-primary mt-3' onClick={HandleClick}>View Slots</button>

              {
                Visible &&
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
  )
}

export default ResheduleAppoinment