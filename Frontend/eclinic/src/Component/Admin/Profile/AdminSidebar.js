import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminSidebar() {
  
  

  const username = localStorage.getItem('admin_name');
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem('admin_access');
    localStorage.removeItem('admin_refresh');
    navigate('/Adminlogin');
  };

  return (
    <>
    <div className="d-flex flex-column vh-100 bg-primary text-light p-3" style={{ width: '250px' }}>
      <div className="mb-4">
        <h5>{username}</h5>
      </div>

      <nav className="flex-grow-1">
        <ul className="nav flex-column">
            <li className="nav-item ">
            <Link className="nav-link active text-white" to='/AdminLayout/AdminDashboard'>Home</Link>
          </li>

          <li className="nav-item">
                        <Link className="nav-link active text-white" to='#'>Users</Link>

          </li>
          <li className="nav-item ">
                        <Link className="nav-link active text-white" to='/AdminLogin'>Resources</Link>

          </li>


        </ul>
      </nav>

      <div className="mt-auto pt-3 border-top">
        <button
          className="btn btn-danger w-100"
          onClick={Logout}
        >
          Logout
        </button>
      </div>
      
    </div>
    </>

  );
}

export default AdminSidebar;
