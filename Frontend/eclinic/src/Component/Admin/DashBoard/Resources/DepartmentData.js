import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function DepartmentData() {
   const navigate = useNavigate()
  const [Data, setData] = useState([]);
  const [Name, setName] = useState('');
  const token = localStorage.getItem("admin_access");

  const FetchData = async ()=>{
    try {
      const response = await axios.get('http://127.0.0.1:8000/adminapp/departmentsAndLocations',
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
  useEffect(() => {
    console.log(Name)
    FetchData()
  }, [Name]);

  const HandleSubmit = async()=>{
  try {
      const response = await axios.post('http://127.0.0.1:8000/adminapp/CreateDepartmentView/',{name:Name},
        {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
      )
      toast.success('created Department')
      setName('')
      await FetchData()

    } catch (error) {
      if (error.response && error.response.status === 401) {
                toast.error("Token expired, please login");
                navigate("/AdminLogin");
        }
    }
  
}
  

  const HandleDelete = async(id)=>{
    try {
      const response = await axios.delete('http://127.0.0.1:8000/adminapp/DeleteDepartmentView/',
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data:{
             id:id
           }
          }
      )
      toast.success('Deleted Department')
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
       <div>
      <h2 className='text-center'>Available Locations</h2>
      <div className="container">
        <div className="row ">
          <div className="col-md-12 d-flex justify-content-end">
            <button className='btn btn-primary btn-sm' data-bs-toggle="modal" data-bs-target="#exampleModal">Add Department</button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto d-flex justify-content-center">
        
      <table className="min-w-full divide-y divide-gray-200 shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">id</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">name</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Action</th>

          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {Data?.departments?.map((item, index) => (
            <tr key={index}>
              <td className="px-4 py-2 whitespace-nowrap">{item.id}</td>
              <td className="px-4 py-2 whitespace-nowrap">{item.name}</td>
              
          
              <td className="px-4 py-2 whitespace-nowrap"><button className='btn btn-danger btn-sm' onClick={()=>{HandleDelete(item.id)}}>Delete</button></td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">create Department</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form action="#" onSubmit={HandleSubmit}>
      <div class="modal-body">
        <label htmlFor="name" className='form-label'>Department name</label>
        <input type="text" name="name" id="name" className='form-control' value={Name} placeholder='Department name' onChange={(e)=>{setName(e.target.value)}}/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Create</button>
      </div>
      </form>
    </div>
  </div>
</div>
    </div>
  )
}

export default DepartmentData