import React from 'react'
import PatientHomePage from './PatientHomePage'
import SearchDoctors from './SearchDoctors'

function SlotBooking() {
  return (
    <div>
          <h1 className='text-center mt-5' >Book a Appoinment</h1>
        <div className="container  mt-4 ">  
          <div className="row">
            <div className="col-md-6">
                             <form action="#">

                <div className="mt-2 ">
                <label htmlFor="fullname" className='form-label fs-5'>Full name</label>
                <input type="text" className='form-control ' name='fullname' required/>
                </div>

                <div className="mt-2 ">
                <label htmlFor="fullname" className='form-label fs-5'>Hospital name</label>
                  <select class="form-select" required>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                  </select>
                </div>

                <div className="mt-2 ">
                <label htmlFor="fullname" className='form-label fs-5'>Speciality</label>
                  <select class="form-select" required>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                  </select>
                </div>

                <div className="mt-2 ">
                <label htmlFor="fullname" className='form-label fs-5'>Doctor</label>
                  <select class="form-select" required>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                  </select>
                </div>

                <div className="mt-2 ">
                <label htmlFor="fullname" className='form-label fs-5'>Available Slots</label>
                <p>slot 1 <input type="checkbox" /></p>
                <p>slot 1 <input type="checkbox" /></p>
                <p>slot 1 <input type="checkbox" /></p>
                </div>

                <button className='btn btn-primary' type='submit'>Book</button>
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