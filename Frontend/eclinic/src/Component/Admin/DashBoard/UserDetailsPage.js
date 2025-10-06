import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UserDetailsPage() {
  const location = useLocation();
  const userId = location.state || {};
  const navigate = useNavigate();
  const [Users, setUsers] = useState([]);
  useEffect(() => {
    const FetchData = async () => {
      const token = localStorage.getItem("admin_access");
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/adminapp/UserDetailsView/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        if (error?.response && error.response.status === 401) {
          toast.error("Token Expired. Please Login");
          navigate("/AdminLogin");
        }
      }
    };
  }, []);
  console.log(userId);

  return (
    <div>
      <div
        className="card mx-auto mt-5 shadow"
        style={{ maxWidth: "700px", borderRadius: "10px" }}
      >
        <div
          className="bg-primary text-white text-center p-3"
          style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
        >
          <h3> Profile</h3>
        </div>
        <div className="card-body">
{userId.user_type === "patient" && (
  <div className="row mb-3">
    <div className="col-md-6">
      <p><strong>Name:</strong> {userId?.username}</p>
      <p><strong>Date Of Birth:</strong> {userId.user_details?.date_of_birth}</p>
      <p><strong>Gender:</strong> {userId.user_details?.gender}</p>
    </div>
    <div className="col-md-6">
      <p><strong>Phone:</strong> {userId.user_details?.phone_number}</p>
      <p><strong>Email:</strong> {userId?.email}</p>
      <p><strong>Address:</strong> {userId.user_details?.address}</p>
    </div>

    <h4 className="text-center fw-bold mt-3">Insurance Details</h4>
    
    {
      userId.user_details?.had_insurance && userId.user_details?.insurance?.length > 0 ? (
        <div className="row mb-3">
          <div className="col-md-6">
            <p><strong>Policy Number:</strong> {userId.user_details.insurance[0]?.Policy_number}</p>
            <p><strong>Company Name:</strong> {userId.user_details.insurance[0]?.Company_name}</p>
            <p><strong>Policy Date:</strong> {userId.user_details.insurance[0]?.Policy_date}</p>
          </div>

          <div className="col-md-6">
            <p><strong>Policy Holder:</strong> {userId.user_details.insurance[0]?.Policy_holder}</p>
            <p><strong>Plan Type:</strong> {userId.user_details.insurance[0]?.Plan_type}</p>
            
          </div>

          <div className="text-center mt-2">
            {userId.user_details.insurance[0]?.Verified === true ? (
              <p className="text-success fw-bold">✅ Insurance is Verified</p>
            ) : (
              <p className="text-danger fw-bold">❌ Insurance is not Verified</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-muted text-center">No insurance data available.</p>
      )
    }
  </div>
)}


          {userId.user_type === "doctor" && (
            <div className="row mb-3">
              <div className="col-md-6">
                <p>
                  <strong>Name:</strong> {userId?.username}
                </p>
                <p>
                  <strong>Specialization:</strong>{" "}
                  {userId.doctor?.specialization.name}
                </p>
                <p>
                  <strong>Gender:</strong> {userId.doctor?.gender}
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Phone:</strong> {userId.doctor?.phone_number}
                </p>
                <p>
                  <strong>Email:</strong> {userId?.email}
                </p>
                <p>
                  <strong>Hospital:</strong> {userId.doctor.hospital_name.name}
                </p>
              </div>
            </div>
          )}
          <hr />
        </div>
      </div>
    </div>
  );
}

export default UserDetailsPage;
