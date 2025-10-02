import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminDashboard() {
  const [Data, setData] = useState();
  const [PaymentData, setPaymentData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin_access");
    if (!token) {
      toast.error("Token Expired Please Login");
      navigate("/AdminLogin");
    }

    const FetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/adminapp/AppoinmentsCounts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error("Token expired, please login");
          navigate("/AdminLogin");
        }
      }
    };

    const FetchPaymentData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/adminapp/RecentPayments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPaymentData(response.data);
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    };

    FetchData();
    FetchPaymentData();
  }, [navigate]);

  const cardItems = [
    {
      title: "Appointment Requests",
      count: Data?.booking,
      icon: "fa-calendar-check",
      description: "New appointments waiting for approval",
      route: "/AdminLayout/ManageAppoinments",
    },
    {
      title: "Reschedule Requests",
      count: Data?.reshedule,
      icon: "fa-calendar-alt",
      description: "Users requested to reschedule their appointments",
      route: "/AdminLayout/ManageAppoinments",
    },
    {
      title: "Cancelled Appointments",
      count: Data?.cancel,
      icon: "fa-calendar-times",
      description: "Appointments that were cancelled by users",
      route: "/AdminLayout/ManageAppoinments",
    },
    {
      title: "Total Users",
      count: Data?.users,
      icon: "fa-users",
      description: "Number of registered users",
      route: "/AdminLayout/ManageAppoinments",
    },
    {
      title: "Total Appointments",
      count: Data?.appoinments,
      icon: "fa-notes-medical",
      description: "All appointments including completed and pending",
      route: "/AdminLayout/ManageAppoinments",
    },
    {
      title: "Total Payments",
      count: Data?.payments,
      icon: "fa-credit-card",
      description: `Total payments received to date`,
      route: "/AdminLayout/ManageAppoinments",
    },
  ];

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Admin Dashboard</h3>
      <div className="row mt-2">
        {cardItems.map((item, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div
              className="card h-100 shadow-sm border-0 hover-effect"
              onClick={() => navigate(item.route)}
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


      {PaymentData && (
        <div className="row mt-5">
          <div className="col-md-6 offset-md-3">
            <div className="card shadow-sm text-center">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">Recent Payments</h5>
              </div>
              <div className="card-body">
                <table class="table">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Date</th>
      <th scope="col">Paid by</th>
      <th scope="col">Amount</th>
      <th scope="col">Currency</th>
    </tr>
  </thead>
  <tbody>
        {
          PaymentData.map((item,index)=>(
                <tr>
      <th scope="row">{item?.id}</th>
      <td>{item?.created_at}</td>

      <td>{item?.paid_by.user.username}</td>
      <td>{item?.amount}</td>
      <td>{item?.currency}</td>
    </tr>
          ))
        }
  </tbody>
</table>
              </div>
            </div>
          </div>
        </div>
      )} 
    </div>
  );
}

export default AdminDashboard;
