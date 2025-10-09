import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Checkout from "../Payment/Checkout";

function AppointmentRequest() {
  const [Visible, setVisible] = useState(false);
  const [locations, setLocations] = useState([]);
  const [Department, setDepartment] = useState([]);
  const [data, setData] = useState({ date: "", location: "", departments: "" });
  const [haveInsurance, sethaveInsurance] = useState(false);
  const [Found, setFound] = useState(false);
  const [Insurance, setInsurance] = useState('');
  const [Paid, setPaid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
   const savedFormData = localStorage.getItem('appointmentFormData');
  if (savedFormData) {
    console.log("Restoring form data from localStorage:", savedFormData);
    setData(JSON.parse(savedFormData));
  }


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
      } catch (error) {
        console.error("Failed to fetch Department:", error);
      }
    };


    const fetchInsurance = async() =>{
       const token = localStorage.getItem("access");
      if (!token) {
      toast.error("Token not found");
      navigate("/PatientLogin");
      return;
    }
       try {
      const response = await axios.get("http://127.0.0.1:8000/PatientDetailsView", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInsurance(response.data)
      
      console.log(response.data)

    } catch (error) {
      console.error( error);
      
    }
    }

 

  const appoinment_fee = localStorage.getItem('appoinmentFee') === 'true'
  if (appoinment_fee) {
    setPaid(true)
  }

    fetchLocations();
    fetchDepartments();

    fetchInsurance()

  
  }, []);

  const handleChange = (e) => {
    const {name,value} = e.target
 const updatedData = {
    ...data,
    [name]: value,
  };
  setData(updatedData);
  localStorage.setItem('appointmentFormData', JSON.stringify(updatedData));
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access");

    if (!token) {
      toast.error("Token not found");
      navigate("/PatientLogin");
      return;
    }
    try {
      
      await axios.post("http://127.0.0.1:8000/AppoinmentRequest/", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Successfully sent appointment request");
      setData({ date: "", location: "", departments: "" });
      localStorage.removeItem('appointmentFormData')
      localStorage.removeItem('appoinmentFee')

      navigate('/PatientDashboard')

    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to send request");
      console.error("Error sending request:", error);
      
    }
  };


const HandleInsurance = (e) => {
  const value = e.target.value;

  setVisible(true);

  if (value === 'yes') {
      sethaveInsurance(true);

    if (Insurance.had_insurance) {
      setFound(true);
    } else {
      setFound(false);
    }
  } else {
    sethaveInsurance(false);
    setFound(false);
  }
};

  console.log(Insurance.had_insurance)
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

{
  !Paid ? (
    <>
      <div className="mt-3">
        <label className="form-label d-block mb-2">
          Do you have insurance?
        </label>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="insurance"
            id="insuranceYes"
            value="yes"
            onChange={HandleInsurance}
          />
          <label className="form-check-label" htmlFor="insuranceYes">
            Yes
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="insurance"
            id="insuranceNo"
            value="no"
            onChange={HandleInsurance}
          />
          <label className="form-check-label" htmlFor="insuranceNo">
            No
          </label>
        </div>
      </div>

      {Visible && (
        haveInsurance ? (
          Found ? (
            <>
              <Checkout amount={50} />
              <p className="fs-5">Please complete payment to continue</p>
            </>
          ) : (
            <p className="fs-5 text-danger">Insurance not found</p>
          )
        ) : (
          <>
            <Checkout amount={100} />
            <p className="fs-5">Please complete payment to continue</p>
          </>
        )
      )}
    </>
  ) : (
    <div className="paid text-center">
      <p className="bg-success text-white rounded  fs-3">Paid</p>
    </div>
  )
}

<button type="submit" className="btn btn-primary" disabled={!Paid}>
  Submit Request
</button>
    </form>
        </div>
      </div>
    </>
  );
}

export default AppointmentRequest;
