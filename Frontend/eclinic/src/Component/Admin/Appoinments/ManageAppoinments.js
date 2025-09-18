import axios from 'axios'
import React ,{useState,useEffect}from 'react'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
function ManageAppoinments() {
    const navigate = useNavigate()
    const [Appoinments, setAppoinments] = useState([]);
    useEffect(()=>{
        const FetchAppoinments = async ()=>{
            const token = localStorage.getItem('admin_access')
            if (!token) {
                toast.error('Token Expired Please Login ')
                navigate('/AdminLogin')
            }
            try{
                const response = await axios.get('http://127.0.0.1:8000/adminapp/RequestedAppoinments',{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                setAppoinments(response.data)
                console.log(response.data)
            }
            catch(error){
               if (error.response?.status === 401) {
    toast.error('Unauthorized. Please login again.')
    navigate('/AdminLogin')
  } else {
    toast.error('Something went wrong while fetching appointments.')
    console.error(error)
  }

            }
        }

        FetchAppoinments()
    },[])

    const HandleCreate = async (data)=>{
        console.log(data)
        navigate('/CreateAppoinments',{state:{data}})
    }
  return (
    <div>
        <div className="container mt-4">
            <div className="row">
            <div className="col-md-6">
                <h2 className='text-center'>Appointment Requests </h2>
                    {
                        Appoinments.map((item)=>(
                                            <div className="card" key={item}>
                    <div className="card-header">
                        patient :{item.patient.user.username}
                    </div>
                    <div className="card-body">
                       <p> Date: {item.date} </p>
                        <p>Department:{item.departments}</p>
                        <p>Prefer Location :{item.location.location_name}</p>

                    </div>
                    <div className="btn d-flex justify-content-start">
                        <button className='btn btn-primary btn-sm ' onClick={()=>HandleCreate(item)}>create Appoinment</button>
                    </div>
                </div>
                        ))
                    }
            </div>
            <div className="col-md-6">
                <h2 className='text-center'>Reschedule Requests </h2>
            </div>
            </div>
        </div>
    </div>
  )
}

export default ManageAppoinments