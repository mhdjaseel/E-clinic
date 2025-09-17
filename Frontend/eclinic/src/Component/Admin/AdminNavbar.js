import React from 'react'
import { Link } from 'react-router-dom'

function AdminNavbar({username}) {
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
          <Link className="nav-link active " to="/PatientDashboard">Home</Link>
        </li>
        <li className="nav-item mx-3">
          <Link className="nav-link active" to="/history">History</Link>
        </li>
        <li className="nav-item mx-3">
          <Link className="nav-link active" to="/">Payments</Link>
        </li>
        <li className="nav-item mx-3">
          <Link className="nav-link active" to="/PatientProfile">Profile</Link>
        </li>
      </ul>

      <div className="d-flex ms-auto">
        <button type="submit" className="btn btn-success" >Logout</button>
      </div>
    </div>
  </div>
</nav>
    </div>
  )
}

export default AdminNavbar