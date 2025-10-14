import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function Resourses() {
    const navigate  = useNavigate()
    const [Data, setData] = useState();
    const token = localStorage.getItem("admin_access");

    const FetchData = async () => {
      try {

        const response = await axios.get(
          "http://127.0.0.1:8000/adminapp/ResourseCounts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
        console.log(response.data)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error("Token expired, please login");
          navigate("/AdminLogin");
        }
      }
    };
useEffect(() => {
    FetchData()
}, []);
   const cardItems = [
  {
    title: "Hospitals",
    count: Data?.hospitals,
    icon: "fa-solid fa-hospital", 
    description: "Available Hospitals for service",
    route: "/AdminLayout/HospitalData",
  },
  {
    title: "Locations",
    count: Data?.locations,
    icon: "fas fa-map-marker-alt", 
    description: "Available Locations where service provided",
    route: "/AdminLayout/LocationData",
  },
  {
    title: "Departments",
    count: Data?.departments,
    icon: "fas fa-building", 
    description: "Available Departments for service",
    route: "/AdminLayout/DepartmentData",
  },
  {
    title: "Timeslot",
    count: Data?.timeslots,
    icon: "fas fa-clock", 
    description: "Fixed Timeslots for doctor",
    route: "/AdminLayout/Timeslots",
  },
];

  return (
    <div>
                <div className="container mt-4">
      <h3 className="text-center mb-4">Admin Dashboard</h3>
      <div className="row mt-2">
        {cardItems.map((item, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div
              className="card h-100 shadow-sm border-0 hover-effect"
              onClick={() => navigate(item.route,{state:item.title})}
              style={{ cursor: "pointer", borderRadius: "12px" }}
            >
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3">
                    <i
                      className={`fas ${item.icon} fa-2x text-primary`}
                      style={{ minWidth: "40px" }}
                    ></i>
                  </div>
                  <div>
                    <h5 className="card-title mb-0">{item.title}</h5>
                    <small className="text-muted">{item.description}</small>
                  </div>
                </div>
                <hr />
                <h4 className="text-end text-success">
                  {item.count ?? <span className="text-muted">Loading...</span>}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
</div>
  )
}

export default Resourses