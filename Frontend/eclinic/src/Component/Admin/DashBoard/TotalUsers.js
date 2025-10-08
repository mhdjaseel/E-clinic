import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function TotalUsers() {
  const navigate = useNavigate();
  const [Users, setUsers] = useState([]);
    const FetchData = async () => {
      const token = localStorage.getItem('admin_access');
      try {
        const response = await axios.get('http://127.0.0.1:8000/adminapp/TotalUserList', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(response.data);
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

    const BlockUser = async(id,username)=>{
      const token = localStorage.getItem('admin_access');
      try {
        console.log(id)
        await axios.post('http://127.0.0.1:8000/adminapp/BlockUserView/',{id:id},{headers:
          {
            Authorization:`Bearer ${token}`
          }
        })
        toast.success('blocked '+username)
    FetchData();

      } catch (error) {
        console.log(error);
        if (error?.response && error.response.status === 401) {
          toast.error('Token Expired. Please Login');
          navigate('/AdminLogin');
        }
      }
        
    }

        const UnBlockUser = async(id,username)=>{
      const token = localStorage.getItem('admin_access');
      try {
        console.log(id)
        await axios.post('http://127.0.0.1:8000/adminapp/UnBlockUserView/',{id:id},{headers:
          {
            Authorization:`Bearer ${token}`
          }
        })
        toast.success('Unblocked '+username)
    FetchData();

      } catch (error) {
        console.log(error);
        if (error?.response && error.response.status === 401) {
          toast.error('Token Expired. Please Login');
          navigate('/AdminLogin');
        }
      }
        
    }
  return (
    <div className="container my-5">
      

      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">User Type</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                Users.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>
                      <span className={`badge ${item.user_type === 'patient' ? 'bg-success' : 'bg-primary'}`}>
                        {item.user_type}
                      </span>
                    </td>
                    <td className="text-center">
                      <button className="btn btn-sm btn-outline-info me-2" onClick={()=>{navigate('/AdminLayout/UserDetailsPage' , {state:item})}}>
                        👁 View
                      </button>
                      {
                        item.is_active === true ?(
                      <button className="btn btn-sm btn-outline-danger" onClick={()=>{BlockUser(item.id,item.username)}}>
                        🚫 Block
                      </button>
                        ):
                      (
                        <button className="btn btn-sm btn-outline-success" onClick={()=>{UnBlockUser(item.id,item.username)}}>
                        UnBlock
                      </button>
                      )
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TotalUsers;
