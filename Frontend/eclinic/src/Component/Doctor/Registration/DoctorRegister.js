import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
function DoctorRegister() {
    const [formData, setformData] = useState({});

    const handleChange=(e)=>{
        const {name ,value} = e.target
        setformData({
            ...formData,
            [name]:value
        })
    }

    const handleSubmit =async(e) =>{
      e.preventDefault()
      try{
        await axios.post('http://127.0.0.1:8000/doctor/DoctorRegisterView/',formData,{
          headers:{
            "Content-Type":'application/json'
          }
        })
        console.log('registerd')
      }
      catch(error){
        console.log('error   ',error)
      }
    }
  return (
    <div>
          <h2 className="mt-2 mb-2 text-center">Doctor Registration</h2>

      <div className="container  d-flex justify-content-center">
        <div className="row w-50 ">
          <form onSubmit={handleSubmit} className="row g-3">

            <div className="mt-2">

          <label className="form-label">Username</label>
          <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} required />
        </div>
            <div className="mt-2">

          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
        </div>

                <div className="mt-2">

          <label className="form-label">Password</label>
          <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
        </div>

               <div className="mt-2">

          <label className="form-label">Phone Number</label>
          <input type="text" className="form-control" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
        </div>

               <div className="mt-2">

          <label className="form-label">Specialization</label>
          <input type="text" className="form-control" name="specialization" value={formData.specialization} onChange={handleChange} required />
        </div>

                 <div className="mt-2">

          <label className="form-label">Hospital Name</label>
          <input type="text" className="form-control" name="Hospital_name" value={formData.hospital_name} onChange={handleChange} required />
        </div>

              <div className="mt-2">

          <label className="form-label">Gender</label>
          <select className="form-select" name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

                 <div className="mt-2">

          <button type="submit" className="btn btn-primary">Register</button>
          <p>Already Have Account <Link to={'/DoctorLogin'}>Login</Link></p>
        </div>
        </form>
        </div>
      </div>
         
    </div>
  )
}

export default  DoctorRegister
