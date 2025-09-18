import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function AppointmentRequest() {
  const [locations, setLocations] = useState([]);
  const [Department, setDepartment] = useState([]);
  const [data, setData] = useState({ date: "", location: "", departments: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      const token = localStorage.getItem("access");
      if (!token) {
        toast.error("Token not found");
        navigate("/PatientLogin");
        return;
      }

      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/LocationDetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLocations(response.data);
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    };

    fetchLocations();

    const fetchDepartments = async () => {
      const token = localStorage.getItem("access");
      if (!token) {
        toast.error("Token not found");
        navigate("/PatientLogin");
        return;
      }

      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/DepartmentDetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDepartment(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch Department:", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(locations);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access");

    if (!token) {
      toast.error("Token not found");
      navigate("/PatientLogin");
      return;
    }

    if (!data.date || !data.location) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      console.log(data);
      await axios.post("http://127.0.0.1:8000/AppoinmentRequest/", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Successfully sent appointment request");
      setData({ date: "", location: "" }); // Clear form
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to send request");
      console.error("Error sending request:", error);
    }
  };

  return (
    <>
      <Navbar/>
      <div className="container mt-3">
        <h2 className="text-center">Appoinment Request</h2>
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Select Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="form-control"
                value={data.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Preferred Department
              </label>
              <select
                id="departments"
                name="departments"
                className="form-select"
                value={data.departments}
                onChange={handleChange}
                required
              >
                <option value="">Select department</option>
                {Department.map((loc) => (
                  <option key={loc.id} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Preferred Location
              </label>
              <select
                id="location"
                name="location"
                className="form-select"
                value={data.location}
                onChange={handleChange}
                required
              >
                <option value="">Select Location</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.location_name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AppointmentRequest;
