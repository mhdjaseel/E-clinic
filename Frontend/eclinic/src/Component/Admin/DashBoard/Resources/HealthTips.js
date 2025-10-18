import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function HealthTips() {
    const navigate = useNavigate()
    const [Data, setData] = useState([]);
    const [Datas, setDatas] = useState({
      'title':'',
      'description':'',
      'image':''
    });
  const token = localStorage.getItem("admin_access");
  const FetchData = async ()=>{
    try {
      const response = await axios.get('http://127.0.0.1:8000/adminapp/HealthtipsDetailsView',
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
    FetchData()
  },[]);
  const HandleSubmit = async(e)=>{
    e.preventDefault()
    console.log(Datas)
  try {
    const formData = new FormData();
  formData.append('title', Datas.title);
  formData.append('description', Datas.description);
  formData.append('image', Datas.image);

      const response = await axios.post('http://127.0.0.1:8000/adminapp/CreateHealthTipView/',formData,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      )
      toast.success('created TimeSlot')
    setDatas({
  title: '',
  description: '',
  image: null
});
      await FetchData()

    } catch (error) {
      if (error.response && error.response.status === 401) {
                toast.error("Token expired, please login");
                navigate("/AdminLogin");
        }
    }
  
}
const HandleChange = (e)=>{
  const {name,value,files} = e.target
  if (name === 'image') {
    setDatas({ ...Datas, image: files[0] });
  } else {
    setDatas({ ...Datas, [name]: value });
  }

}
  
const HandleDelete = async (id)=>{
   try {
      const response = await axios.delete('http://127.0.0.1:8000/adminapp/DeleteHealthtipsView/',
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data:{
             id:id
           }
          }
      )
      toast.success('Deleted Health Tip')
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
      <h2 className='text-center'>Health Tips</h2>
      <div className="container">
        <div className="row ">
          <div className="col-md-12 d-flex justify-content-end">
            <button className='btn btn-primary btn-sm' data-bs-toggle="modal" data-bs-target="#exampleModal">Add Health tips</button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto d-flex justify-content-center">
        
      <table className="min-w-full divide-y divide-gray-200 shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">id</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Label</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">start time</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">End Time</th>

          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {Data.map((item, index) => (
            <tr key={index}>
              <td className="px-4 py-2 whitespace-nowrap">{item.id}</td>
              <td className="px-4 py-2 whitespace-nowrap">{item.title}</td>
              <td className="px-4 py-2 whitespace-nowrap" style={{maxWidth:400}}>{item.description}</td>
              <td className="px-4 py-2 whitespace-nowrap">
                <img src={`http://127.0.0.1:8000${item.image}`} style={{width:150,height:150}} alt="img"  />
              </td>
              
          
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
        <h5 class="modal-title" id="exampleModalLabel">create Health Tips</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
       <form action="#" onSubmit={HandleSubmit} encType="multipart/form-data">
      <div class="modal-body">
        <label htmlFor="label" className='form-label'> Title</label>
        <input type="text" name="title" id="title" className='form-control' value={Datas.title} placeholder='title' onChange={HandleChange} required/>

        <label htmlFor="Description" className='form-label'>Description</label>
        <textarea name="description" id="Description" className='form-control' value={Datas.description} placeholder='Description ' onChange={HandleChange} required cols="20" rows="5"></textarea>

        <label htmlFor="image" className='form-label'> Image</label>
        <input type="file" name="image" className='form-control'   onChange={HandleChange} required/>
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

export default HealthTips