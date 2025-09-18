import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AdminNavbar() {
  const username = localStorage.getItem('admin_name')
  const navigate = useNavigate()
  const Logout = ()=>{
    localStorage.removeItem('admin_access')
    localStorage.removeItem('admin_refresh')
    navigate('/Adminlogin')

  }
  return (
    <div>
         <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ fontFamily: "Arial" }}>
  <div className="container-fluid">
 
  <h4>{username}</h4>


    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto" style={{fontSize:18}}>
        <li className="nav-item mx-3">
          <Link className="nav-link active " to="/AdminDashboard">Home</Link>
        </li>
        <li className="nav-item mx-3">
          <Link className="nav-link active" to="#">Appoinments</Link>
        </li>
        <li className="nav-item mx-3">
          <Link className="nav-link active" to="#">users</Link>
        </li>
        <li className="nav-item mx-3">
          <Link className="nav-link active" to="#">History</Link>
        </li>
      </ul>

      <div className="d-flex ms-auto">
        <button type="submit" className="btn btn-success" onClick={Logout}>Logout</button>
      </div>
    </div>
  </div>
</nav>
    </div>
  )
}

export default AdminNavbar