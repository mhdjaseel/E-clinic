import axios from 'axios';
import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { toast,ToastContainer } from 'react-toastify';

function Login() {
  const [Form, setForm] = useState();
  const navigate = useNavigate()
  const HandleChange= (e)=>{
    const {name,value} = e.target
    setForm({
      ...Form,
      [name]:value
    })
  }

  const HandleSubmit = async(e)=>{
    e.preventDefault()
    try{
      const response = await axios.post('http://127.0.0.1:8000/patientLogin/',Form,{
      headers:{
        "Content-Type":'application/json'
      }})

      const { access, refresh } = response.data;
      localStorage.setItem('access',access)
      localStorage.setItem('refresh',refresh)
      toast.success('Login successful!');
      navigate('/PatientDashboard' )

  }
  
  catch(error){
    toast.error('Invalid Credentials')
  }
}
  return (
    <div>
          <div className="container w-50 mt-5 d-flex justify-content-center shadow ">
            <div className="col-md-4 p-4">
              <h3 className='mt-2 mb-2 text-center'>Patient Login</h3>
              <form action="#" style={{fontFamily:'serif',fontWeight:'bold'}} onSubmit={HandleSubmit}>
              
                <div className="mt-2">
                <label htmlFor="fullname" className='form-label' >Full name</label>
                <input type="text" className='form-control' name='username' required onChange={HandleChange}/>
                </div>

                <div className="mt-2">
                <label htmlFor="password" className='form-label'>Password</label>
                <input type="password" className='form-control' name='password'  onChange={HandleChange} required/>
                </div>



                <p>Didn't Have Account ? <Link to='/'>Register</Link></p>

                <button className='btn btn-primary' type='submit'>Login</button>
              </form>
            </div>
          </div>
      <ToastContainer position="top-center" autoClose={2000} theme="light" />

    </div>
  )
}

export default Login