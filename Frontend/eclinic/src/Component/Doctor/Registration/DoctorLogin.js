import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
function DoctorLogin() {
  const [formData, setformData] = useState({});
  const [error, seterror] = useState('');
  const navigate = useNavigate();

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value
    });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    seterror('');

    try {
      const response = await axios.post("http://127.0.0.1:8000/doctor/DoctorLoginView/", formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      const { access, refresh } = response.data;
      localStorage.setItem('doctor_access',access)
      localStorage.setItem('doctor_refresh',refresh)

      toast.success(response.data.message)

       navigate('/DoctorProfile')

    }
     catch (error) {
      toast.error(error.response?.data?.message)

  };
  }
  return (
    <div>
      <div className="container w-50 mt-5 d-flex justify-content-center shadow ">
        <div className="col-md-4 p-4">
          <h3 className='mt-2 mb-2 text-center'>Doctor Login</h3>
          <form style={{ fontFamily: 'serif', fontWeight: 'bold' }} onSubmit={HandleSubmit}>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            <div className="mt-2">
              <label htmlFor="fullname" className='form-label'>Full name</label>
              <input type="text" className='form-control' name='username' required onChange={HandleChange} />
            </div>

            <div className="mt-2">
              <label htmlFor="password" className='form-label'>Password</label>
              <input type="password" className='form-control' name='password' onChange={HandleChange} required />
            </div>

            <p>Don't have an account? <Link to='/DoctorRegister'>Register</Link></p>

            <button className='btn btn-primary' type='submit'>Login</button>
          </form>
        </div>
      </div>
      
    </div>
  );
}

export default DoctorLogin;
