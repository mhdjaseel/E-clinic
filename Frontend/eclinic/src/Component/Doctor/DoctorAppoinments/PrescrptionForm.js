import React, { useState } from "react";
import DoctorNavbar from "../Profile/DoctorNavbar";

function PrescrptionForm() {
  const [Data, setData] = useState({ summary: "", allergy: "" });
  const [Medicine, setMedicine] = useState([]);
  const [med, setmed] = useState("");
  const [dosage, setdosage] = useState("");
  const [qty, setqty] = useState("");

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...Data,
      [name]: value,
    });
    // console.log(Data.summary)
    // console.log(Data.allergy)
  };

  const HandleMed = (e) => {
    setmed(e.target.value);
  };

  const HandleDosage = (e) => {
    setdosage(e.target.value);
  };

  const HandleQty = (e) => {
    setqty(e.target.value);
  };

  const HandleClick = (e) => {
    e.preventDefault();
    if (med !== "" && dosage !== "" && qty !== "") {
      const newMed = {
        medicine: med,
        Dosage: dosage,
        quantity: qty,
      };

      setMedicine([...Medicine, newMed]);
      console.log(Medicine);

      setmed("");
      setdosage("");
      setqty("");
    } else {
      return;
    }
  };
  return (
    <div>
      <DoctorNavbar />
      <div className="container">
        <div className="row">
          <div className="col-md-6 ">
            <h2 className="text-center mt-3">Add Prescription</h2>
            <div className="container  mt-5">
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <textarea
                      className="form-control"
                      rows={4}
                      cols={5}
                      name="summary"
                      placeholder="summary"
                      onChange={HandleChange}
                      value={Data.summary}
                    ></textarea>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mt-2">
                    <input
                      type="text"
                      placeholder="Allergies (if any )"
                      onChange={HandleChange}
                      className="form-control"
                      name="allergy"
                    />
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-4 mt-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="medicine"
                      name="medicine"
                      onChange={(e) => {
                        HandleMed(e);
                      }}
                      value={med}
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <input
                      type="text"
                      className="form-control"
                      name="dosage"
                      placeholder="dosage"
                      value={dosage}
                      onChange={(e) => {
                        HandleDosage(e);
                      }}
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <input
                      type="number"
                      className="form-control"
                      name="quantity"
                      placeholder="quantity"
                      value={qty}
                      onChange={(e) => {
                        HandleQty(e);
                      }}
                    />
                  </div>
                  <div className="add_btn">
                    <button
                      className="btn btn-primary mt-3"
                      onClick={HandleClick}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            <h2 className="text-center mt-3">Prescription</h2>
            <div className="container d-flex justify-content-center mt-4">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h2 className="text-center mt-3">Hospital Name</h2>
                    <div className="row">
                      <div className="col-md-6">
                        <h5>Patient : Name</h5>
                        <h6>gender</h6>
                        <h6>phone</h6>
                      </div>
                      <div className="col-md-6 d-flex justify-content-end ">
                        <div className="doctor_info">
                          <h5>Doctor : Name</h5>
                          <h6>Speciality</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <h6 className="fw-bold">summary:</h6>
                    <p>{Data.summary}</p>
                    <h6 className="fw-bold">Allergy(if Any):</h6>

                    <p>{Data.allergy}</p>
                    <h6 className="fw-bold">Medicines</h6>

                    {Medicine.map((item, index) => (
                      <div key={index}>
                        <p>
                          <strong>Medicine:</strong> {item.medicine} |
                          <strong> Dosage:</strong> {item.Dosage} |
                          <strong> Quantity:</strong> {item.quantity}
                        </p>
                        <hr />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="btn">
            <button className="btn btn-primary mt-3 ms-4">submit</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrescrptionForm;
