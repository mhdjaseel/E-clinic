import axios from 'axios'
import React ,{useState,useEffect}from 'react'
import {toast} from 'react-toastify'
import {useNavigate,useLocation} from 'react-router-dom'
import AdminSidebar from '../Profile/AdminSidebar'
function ManageAppoinments() {
    const location = useLocation()

    const title = location.state || {}
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
        navigate('/AdminLayout/CreateAppoinments',{state:{data}})
    }
  return (
<>
<div className='container mt-4'>
    <div className='row justify-content-center'>
        <div className="col-12">
            <h2 className='text-center mb-4'>
                {title === 'Appointment Requests' ? 'Appointment Requests' : 'Reschedule Requests'}
            </h2>
        </div>

        {
            Appoinments.map((item) => {
                const isMatchingStatus = title === 'Appointment Requests'
                    ? item.status === 'pending'
                    : item.status === 'rescheduled';

                if (!isMatchingStatus) return null;

                return (
                    <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={item.id}>
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-header bg-primary text-white">
                                <strong>Patient:</strong> {item.patient.user.username}
                            </div>
                            <div className="card-body">
                                <p><strong>Date:</strong> {item.date}</p>
                                <p><strong>Department:</strong> {item.departments}</p>
                                <p><strong>Preferred Location:</strong> {item.location.location_name}</p>
                            </div>
                            <div className="card-footer bg-white d-flex justify-content-start">
                                <button
                                    className='btn btn-outline-primary btn-sm'
                                    onClick={() => HandleCreate(item)}
                                >
                                    Create Appointment
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })
        }
    </div>
</div>

</>

  )
}

export default ManageAppoinments



           