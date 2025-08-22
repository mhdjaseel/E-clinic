import React from 'react'
import './Css/Register.css'
import {useNavigate} from 'react-router-dom'
function Register() {
  const navigate = useNavigate()
    const handleClick = () => {
    navigate('/InsuranceDetails'); 
  };

  return (
    <div className='register pt-5'>
          <h2 className='text-center mt-3 mb-4' style={{fontFamily:'monospace',fontWeight:'bolder'}}>Welcome To E-Clinic</h2>
          <div className="container w-75  d-flex justify-content-center shadow ">
            <div className="col-md-4 p-4">
              <h3 className='mt-2 mb-2'>Patient Registraion</h3>
              <form action="#" style={{fontFamily:'serif',fontWeight:'bold'}}>
                <div className="mt-2">
                <label htmlFor="fullname" className='form-label'>Full name</label>
                <input type="text" className='form-control' name='fullname' required/>
                </div>

                <div className="mt-2">
                <label htmlFor="fullname" className='form-label'>Phone Number</label>
                <input type="number" className='form-control' name='number'required />
                </div>

                <div className="mt-2">
                <label htmlFor="email" className='form-label'>Email</label>
                <input type="email" className='form-control' name='email'required />
                </div>

               <div className="mt-2">
                <label htmlFor="password" className='form-label'>Password</label>
                <input type="password" className='form-control' name='password' required/>
                </div>

                <div className="mt-2">
                <select class="form-select" required>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                </select>
                </div>

                <div className="mt-2">
                <label htmlFor="dob" className='form-label'>Date Of Birth</label>
                <input type="date" className='form-control' name='dob' required/>
                </div>

                <div class="mt-2">
                  <label for="address" class="form-label">Address</label>
                  <textarea class="form-control" name='address' rows="3"required></textarea>
                </div>

                <button className='btn btn-primary mt-2 mb-2' onClick={handleClick}>Next</button>

              </form>
            </div>
          </div>
    </div>
  )
}

export default Register