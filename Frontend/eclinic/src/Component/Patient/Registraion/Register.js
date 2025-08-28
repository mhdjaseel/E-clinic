import React, { useState } from "react";
import InsuranceForm from "./InsuranceForm";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
function Register() {
  const [Form, setForm] = useState({ gender: "Male" });
  const [Errors, setErrors] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();

  const HandleInput = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      if (value.length < 4) {
        setErrors({
          ...Errors,
          [name]: "Username must be at least 4 characters",
        });
      } else {
        setErrors({ ...Errors, [name]: "" });
      }
    }

    if (name === "password") {
      if (value.length < 8 || !/[A-Z]/.test(value) || !/[a-z]/.test(value)) {
        setErrors({
          ...Errors,
          [name]:
            "Password must be at least 8 characters and contain uppercase and lowercase letters",
        });
      } else {
        setErrors({ ...Errors, [name]: "" });
      }
    }

    if (name === "email") {
      if (!emailRegex.test(value)) {
        setErrors({ ...Errors, [name]: "Invalid email address" });
      } else {
        setErrors({ ...Errors, [name]: "" });
      }
    }
    setForm({
      ...Form,
      [name]: value,
    });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/patientRegister/", Form, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("sucessfully registered");
      navigate("/Patientlogin");
    } catch (error) {
      toast.error(error.response.data.email);
      console.log(error.response.data); // optional: show errors in UI)
    }
  };
  return (
    <div className="register pt-5">
      <h2
        className="text-center mt-3 mb-4"
        style={{ fontFamily: "monospace", fontWeight: "bolder" }}
      >
        Welcome To E-Clinic
      </h2>
      <div className="container w-75  d-flex justify-content-center shadow ">
        <div className="col-md-4 p-4">
          <h3 className="mt-2 mb-2 text-center">Patient Registraion</h3>
          <form
            action="#"
            style={{ fontFamily: "serif", fontWeight: "bold" }}
            onSubmit={HandleSubmit}
          >
            <div className="mt-2">
              <label htmlFor="fullname" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                onChange={HandleInput}
                name="username"
                required
              />
              {Errors.username && (
                <small className="text-danger">{Errors.username}</small>
              )}
            </div>

            <div className="mt-2">
              <label htmlFor="fullname" className="form-label">
                Phone Number
              </label>
              <input
                type="number"
                className="form-control"
                onChange={HandleInput}
                name="phone_number"
                required
              />
            </div>

            <div className="mt-2">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                onChange={HandleInput}
                name="email"
                required
              />
              {Errors.email && (
                <small className="text-danger">{Errors.email}</small>
              )}
            </div>

            <div className="mt-2">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                onChange={HandleInput}
                name="password"
                required
              />
              {Errors.password && (
                <small className="text-danger">{Errors.password}</small>
              )}
            </div>

            <div className="mt-2">
              <select
                class="form-select"
                required
                name="gender"
                onChange={HandleInput}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="mt-2">
              <label htmlFor="dob" className="form-label">
                Date Of Birth
              </label>
              <input
                type="date"
                className="form-control"
                name="date_of_birth"
                onChange={HandleInput}
                value={Form.date_of_birth}
                required
              />
            </div>

            <div class="mt-2">
              <label for="address" class="form-label">
                Address
              </label>
              <textarea
                class="form-control"
                name="address"
                onChange={HandleInput}
                rows="3"
                required
              ></textarea>
            </div>

            <p>
              Do you Have a Insurance ?{" "}
              <Link to="/InsuranceDetails">Add Details</Link>
            </p>
            <p>
              Already Had a Account ? <Link to="/PatientLogin">Login</Link>
            </p>

            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} theme="light" />
    </div>
  );
}

export default Register;
