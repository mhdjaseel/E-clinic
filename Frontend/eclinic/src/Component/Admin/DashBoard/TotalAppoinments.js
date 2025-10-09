
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function TotalAppoinments() {
  const navigate = useNavigate();
  const [Data,setData] = useState([]);
    const FetchData = async () => {
      const token = localStorage.getItem('admin_access');
      try {
        const response = await axios.get('http://127.0.0.1:8000/adminapp/TotalAppoinmentList', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        if (error?.response && error.response.status === 401) {
          toast.error('Token Expired. Please Login');
          navigate('/AdminLogin');
        }
      }
    };
  useEffect(() => {
    FetchData();
  }, []);
  return (
    <div>
      <div className="container my-5">
      

      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Patient</th>
                <th scope="col">Doctor</th>
                <th scope="col">Date</th>
                <th scope="col">Slot</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                Data.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.patient.user?.username}</td>
                    <td>{item.doctor.user?.username}</td>
                    <td>{item.slot.date}</td>
                    <td>{item.slot.slot.start_time} - {item.slot.slot.end_time}</td>

                    <td className="text-center">
                      <button className="btn btn-sm btn-outline-info me-2" onClick={()=>{navigate('/AdminLayout/AppoinmentData' , {state:item})}}>
                        👁 View
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  )
}

export default TotalAppoinments