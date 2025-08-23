import React from 'react'
import {Link} from 'react-router-dom'

function InsuranceForm() {
  return (
    <div>
              
      <div className="container w-75 mt-5  d-flex justify-content-center shadow">
               <div className="col-md-4" p-4>
             <h3 className=' text-center mt-4 mb-4'>Insurance Details</h3>

                <form action="#" style={{fontFamily:'serif',fontWeight:'bold'}}>
                <div className="mt-2">
                <label htmlFor="cname" className='form-label'>Insurance Company name</label>
                <input type="text" className='form-control' name='cname' required/>
                </div>

                <div className="mt-2">
                <label htmlFor="pId" className='form-label'>Policy/Member ID Number</label>
                <input type="number" className='form-control' name='pId'required />
                </div>

                <div className="mt-2">
                <label htmlFor="pholder" className='form-label'>Full Name of Policyholder</label>
                <input type="text" className='form-control' name='pholder'required />
                </div>


                <div className="mt-2">
                <label htmlFor="password" className='form-label'>Insurance Plan Type</label>
                <select class="form-select" required>
                  <option value="1">PPO</option>
                  <option value="2">MMO</option>
                  <option value="2">Medicare</option>
                  <option value="2">Medicaid</option>

                </select>
                </div>

                <div className="mt-2">
                <label htmlFor="pdate" className='form-label'>Policy Effective Date</label>
                <input type="date" className='form-control' name='pdate' required/>
                </div>

                <div class="mt-2 mb-4">
                  <label for="insuranceImg" class="form-label">Upload Insurance Card</label>
                  <input type="file" className='form-control' name='insuranceImg' required/> 
                </div>
                <div className='d-flex justify-content-end mb-3'>
                <p><Link to='/'>Back</Link>
                <button className='btn btn-primary ms-3 btn-sm' type='submit' >Add details</button> 
                </p>
                </div>



              </form>
               </div>
      </div>
    </div>
  )
}

export default InsuranceForm