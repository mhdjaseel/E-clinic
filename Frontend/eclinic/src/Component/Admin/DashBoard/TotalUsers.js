import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function TotalUsers() {
  const navigate = useNavigate();
  const [Users, setUsers] = useState([]);

  useEffect(() => {
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

    FetchData();
  }, []);

  return (
    <div className="container my-5">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Total Users</h2>
        <button className="btn btn-success" onClick={() => navigate('/admin/create-user')}>
          ➕ Create User
        </button>
      </div>

      {/* Table Section */}
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
                      <button className="btn btn-sm btn-outline-danger">
                        🚫 Block
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
  );
}

export default TotalUsers;
