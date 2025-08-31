import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'

function DoctorLogin() {
    const [formData, setformData] = useState({});

    const HandleChange= (e)=>{
        const {name,value} =e.target
        setformData({
            ...formData,
            [name]: value
        })
    }

    const HandleSubmit=(e)=>{
        e.preventDefault()
        console.log(formData)
    }
  return (
    <div>
        <div className="container w-50 mt-5 d-flex justify-content-center shadow ">
            <div className="col-md-4 p-4">
              <h3 className='mt-2 mb-2 text-center'>Doctor Login</h3>
              <form action="#" style={{fontFamily:'serif',fontWeight:'bold'}} onSubmit={HandleSubmit}>
              
                <div className="mt-2">
                <label htmlFor="fullname" className='form-label' >Full name</label>
                <input type="text" className='form-control' name='username' required onChange={HandleChange}/>
                </div>

                <div className="mt-2">
                <label htmlFor="password" className='form-label'>Password</label>
                <input type="password" className='form-control' name='password'  onChange={HandleChange} required/>
                </div>



                <p>Didn't Have Account ? <Link to='/DoctorRegister'>Register</Link></p>

                <button className='btn btn-primary' type='submit'>Login</button>
              </form>
            </div>
          </div>
    </div>
  )
}

export default DoctorLogin