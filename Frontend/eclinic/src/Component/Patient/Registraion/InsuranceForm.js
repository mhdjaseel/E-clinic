import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function InsuranceForm() {
  const [Form, setForm] = useState({});
  const [File, setFile] = useState(null);
  const [Preview, setPreview] = useState(null);
  const navigate =useNavigate()
  const HandleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...Form,
      [name]: value,
    });
  };

  const HandleImage = (e) => {
    const files = e.target.files[0];
    setFile(files);
    if (files) {
      const ImagePreview = URL.createObjectURL(files);
      setPreview(ImagePreview);
    } else {
      setPreview("");
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("Company_name", Form.Company_name);
    formdata.append("Policy_number", Form.Policy_number);
    formdata.append("Policy_holder", Form.Policy_holder);
    formdata.append("Plan_type", Form.Plan_type);
    formdata.append("Policy_date", Form.Policy_date);
    formdata.append("Insurance_img", File);

    const token = localStorage.getItem("access");

    if (!token) {
      alert("Token expired");
      return;
    }
    try {
      await axios.post("http://127.0.0.1:8000/PatientInsurance/", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Insurance Details sent To verification");
      navigate('/PatientDashboard')
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Failed to add");
    }
  };

  return (
    <div>
      <div className="container w-75 mt-5  d-flex justify-content-center shadow">
        <div className="col-md-4" p-4>
          <h3 className=" text-center mt-4 mb-4">Insurance Details</h3>

          <form
            action="#"
            style={{ fontFamily: "serif", fontWeight: "bold" }}
            onSubmit={HandleSubmit}
          >
            <div className="mt-2">
              <label htmlFor="cname" className="form-label">
                Insurance Company name
              </label>
              <input
                type="text"
                className="form-control"
                name="Company_name"
                onChange={HandleChange}
                required
              />
            </div>

            <div className="mt-2">
              <label htmlFor="pId" className="form-label">
                Policy/Member ID Number
              </label>
              <input
                type="number"
                className="form-control"
                onChange={HandleChange}
                name="Policy_number"
                required
              />
            </div>

            <div className="mt-2">
              <label htmlFor="pholder" className="form-label">
                Full Name of Policyholder
              </label>
              <input
                type="text"
                className="form-control "
                onChange={HandleChange}
                name="Policy_holder"
                required
              />
            </div>

            <div className="mt-2">
              <label htmlFor="password" className="form-label">
                Insurance Plan Type
              </label>
              <select
                class="form-select"
                onChange={HandleChange}
                name="Plan_type"
                required
              >
                <option>Select Type</option>
                <option value="PPO">PPO</option>
                <option value="MMO">MMO</option>
                <option value="Medicare">Medicare</option>
              </select>
            </div>

            <div className="mt-2">
              <label htmlFor="pdate" className="form-label">
                Policy Effective Date
              </label>
              <input
                type="date"
                className="form-control"
                name="Policy_date"
                onChange={HandleChange}
                required
              />
            </div>

            <div class="mt-2 mb-4">
              <label for="insuranceImg" class="form-label">
                Upload Insurance Card
              </label>
              <input
                type="file"
                className="form-control"
                name="Insurance_img"
                accept="image/*"
                onChange={HandleImage}
                required
              />

              {Preview && (
                <div className="mt-3">
                  <p>Image Preview:</p>
                  <img
                    src={Preview}
                    alt="Preview"
                    style={{
                      width: "200px",
                      height: "auto",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              )}
            </div>
            <div className="d-flex justify-content-end mb-3">
              <p>
                <Link to="/PatientDashboard">Back</Link>
                <button className="btn btn-primary ms-3 btn-sm" type="submit">
                  Add details
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} theme="light" />
    </div>
  );
}

export default InsuranceForm;
