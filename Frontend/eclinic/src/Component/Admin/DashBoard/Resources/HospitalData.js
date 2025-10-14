import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function HospitalData() {
  const navigate = useNavigate()
  const [SelectedDep, setSelectedDep] = useState([]);
  const [OtherData, setOtherData] = useState({});
  const [Data2, setData2] = useState();
  const [Data, setData] = useState([]);
  const token = localStorage.getItem("admin_access");

  const FetchData = async ()=>{
    try {
      const response = await axios.get('http://127.0.0.1:8000/adminapp/HospitalDetailsView',
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      )
      setData(response.data)
      console.log(response.data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
                toast.error("Token expired, please login");
                navigate("/AdminLogin");
        }
    }
  }

  const departmentDatas = async ()=>{
    try {
      const response = await axios.get('http://127.0.0.1:8000/adminapp/departmentsAndLocations',
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      )
      setData2(response.data)
      console.log(response.data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
                toast.error("Token expired, please login");
                navigate("/AdminLogin");
        }
    }
  }

  useEffect(() => {
  FetchData()
  departmentDatas()
  }, []);

  const handleSelectChange = (e)=>{
   const selectedOptions = Array.from(e.target.selectedOptions).map(option => Number(option.value));
    setSelectedDep(selectedOptions);
  

  }

  
  const HandleSubmit = async(e)=>{
    e.preventDefault()
    
 try {
      const FormData = {
        'name':OtherData.name,
        'staffs':Number(OtherData.staffs),
        'location':Number(OtherData.location),
        'departments':SelectedDep
      }
      console.log(FormData)
      const response = await axios.post('http://127.0.0.1:8000/adminapp/CreateHospitalView/',FormData,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setOtherData({
        'name':'',
        'staffs':'',
        'location':''
        })
        setSelectedDep([])
        toast.success('successfully Created Hospital')
        await FetchData()
      } catch (error) {
      if (error.response && error.response.status === 401) {
                toast.error("Token expired, please login");
                navigate("/AdminLogin");
        }
    }
  }

  const HandleChange = (e)=>{
    const {name,value} = e.target
    setOtherData({
      ...OtherData,
      [name]:value
    })
  }

  const DeleteHospital = async (id)=>{
   try {
      const response = await axios.delete('http://127.0.0.1:8000/adminapp/DeleteHospitalView/',
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data:{
             id:id
           }
          }
      )
      toast.success('Deleted Hospital')
      await FetchData()
    } catch (error) {
      if (error.response && error.response.status === 401) {
                toast.error("Token expired, please login");
                navigate("/AdminLogin");
        }
      toast.error(error?.response?.data?.error)
    }
  }
  return (
      <>
      <h2 className='text-center'>Registered Hospitals</h2>
      <div className="container">
        <div className="row ">
          <div className="col-md-12 d-flex justify-content-end">
            <button className='btn btn-primary btn-sm' data-bs-toggle="modal" data-bs-target="#createHospital">Add Hospital</button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto d-flex justify-content-center mt-5">
        
      <table className="min-w-full divide-y divide-gray-200 shadow-sm mt-5">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Location</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Departments</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Staff Count</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Action</th>

          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {Data.map((hospital, index) => (
            <tr key={index}>
              <td className="px-4 py-2 whitespace-nowrap">{hospital.name}</td>
              <td className="px-4 py-2 whitespace-nowrap">{hospital.location.location_name}</td>
              <td className="px-4 py-2 whitespace-nowrap">
                {hospital.departments.map((dep)=>dep.name).join(',')}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">{hospital.staffs}</td>
              <td className="px-4 py-2 whitespace-nowrap"><button className='btn btn-danger btn-sm'onClick={()=>{DeleteHospital(hospital.id)}}>Delete</button></td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="modal fade" id="createHospital" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Create Hospital</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form action="#" onSubmit={HandleSubmit}>
          <label className='form-label' htmlFor="name" >Hospital Name</label>
          <input type="text" placeholder='Hospitalname' name='name' className='form-control' value={OtherData.name} required onChange={HandleChange}/>
          <label className='form-label' htmlFor="name">Hospital Name</label>

          <input type="text" placeholder='staffs' name='staffs' className='form-control'required onChange={HandleChange} value={OtherData.staffs}/>
          
          <label className='form-label' htmlFor="name">Departments</label>
          <select name="departments" 
          multiple={true}
          className='mt-3 ms-4'
          value={SelectedDep}
           onChange={handleSelectChange}
          required

          >
            
          {
            Data2?.departments.map((deps)=>(
              <option key={deps.id} value={deps.id}>{deps.name}</option>
            ))
          }

          </select>
          <label className='form-label' htmlFor="name">Location</label>

          <select name="location" 
          className='mt-3 ms-4'
          value={OtherData.location}
          onChange={HandleChange}
          required
          >
            <option value="null" >select location</option>
          {
            Data2?.locations.map((loc)=>(
              <option key={loc.id} value={loc.id}>{loc.location_name}</option>
            ))
          }

          </select>
          <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit"  className="btn btn-primary">Create</button>
      </div>
        </form>
      </div>
      
    </div>
  </div>
</div>
</>
  )
}

export default HospitalData