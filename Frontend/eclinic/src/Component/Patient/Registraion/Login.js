import React from 'react'
import {Link} from 'react-router-dom'

function Login() {
  return (
    <div>
          <div className="container w-50 mt-5 d-flex justify-content-center shadow ">
            <div className="col-md-4 p-4">
              <h3 className='mt-2 mb-2 text-center'>Patient Login</h3>
              <form action="#" style={{fontFamily:'serif',fontWeight:'bold'}}>
              
                <div className="mt-2">
                <label htmlFor="fullname" className='form-label'>Full name</label>
                <input type="text" className='form-control' name='fullname' required/>
                </div>

                <div className="mt-2">
                <label htmlFor="password" className='form-label'>Password</label>
                <input type="password" className='form-control' name='password' required/>
                </div>

       

                <p>Didn't Have Account ? <Link to='/'>Register</Link></p>

                <button className='btn btn-primary' type='submit'>Login</button>
              </form>
            </div>
          </div>
    </div>
  )
}

export default Login