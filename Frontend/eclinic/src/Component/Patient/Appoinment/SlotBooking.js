import React,{useState} from 'react'
import PatientHomePage from './PatientHomePage'
import SearchDoctors from './SearchDoctors'
import Navbar from './Navbar'
import axios from 'axios'
function SlotBooking() {
  const [Data, setData] = useState('');
  const HandleChange= (e)=>{
      setData(e.target.value)
  }

  const HandleClick = async (e)=>{
    e.preventDefault()
    const token = localStorage.getItem('access')
    if (!token) {
      console.log('not token found.........')
    }

    try{
      await axios.post('http://127.0.0.1:8000/AppointmentView/',{doctor:Data},{
        headers:{
          "Content-Type":'application/json',
           Authorization:`Bearer ${token}`
        }
      })
      console.log('succesfully')
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div>
      <Navbar/>
          <h1 className='text-center mt-5' >Book a Appoinment</h1>
        <div className="container  mt-4 ">  
          <div className="row">
            <div className="col-md-6">
                  <form action="#">



                <div className="mt-2 ">
                <label htmlFor="fullname" className='form-label fs-5'>Doctor</label>
                  <input type="text" onChange={HandleChange} className='form-control' />
                </div>

                {/* <div className="mt-2 ">
                <label htmlFor="fullname" className='form-label fs-5'>Available Slots</label>
                <p>slot 1 <input type="checkbox" /></p>
                <p>slot 1 <input type="checkbox" /></p>
                <p>slot 1 <input type="checkbox" /></p>
                </div> */}

                <button className='btn btn-primary' type='submit' onClick={HandleClick}>Book</button>
                </form>
            </div>
            <div className="col-md-6">
            <SearchDoctors/>
           </div>
          </div>

        </div>
    </div>
  )
}

export default SlotBooking