import React from "react";
import { useNavigate } from "react-router-dom";
function AdminDashboard() {
  const navigate = useNavigate()
  return (
    <div>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-4 mt-3">
            <div className="card shadow-sm" onClick={()=>{navigate('/AdminLayout/ManageAppoinments')}}>
              <div className="card-header">
                <h5>Appoinments Requests</h5>
              </div>
              <div className="card-body">
                <p>Request</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-3">
            <div className="card shadow-sm" onClick={()=>{navigate('/AdminLayout/ManageAppoinments')}}>
              <div className="card-header">
                <h5>Reschedule Requests</h5>
              </div>
              <div className="card-body">
                <p>Request</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-3">
            <div className="card shadow-sm" onClick={()=>{navigate('/AdminLayout/ManageAppoinments')}}>
              <div className="card-header">
                <h5> cancel Appoinments </h5>
              </div>
              <div className="card-body">
                <p>Request</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
