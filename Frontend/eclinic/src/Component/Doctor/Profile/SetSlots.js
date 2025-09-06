import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SetSlots() {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("doctor_access");

    if (!token) {
      console.log("not token found.........");
    }
    axios
      .get("http://127.0.0.1:8000/doctor/TimeSlotsView/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSlots(response.data);
        console.log(response.data);
      });
  }, []);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [Slots, setSlots] = useState([{}]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
      const Data ={
    'date':selectedDate,
    'slots':selectedSlots
    }
    console.log(selectedDate);
    console.log(selectedSlots);
    const token = localStorage.getItem("doctor_access");

    if (!token) {
      console.log("not token found.........");
    }
    try{
      const response =await axios.post('http://127.0.0.1:8000/doctor/SetSlots/',Data,{
        headers:{
          "Content-Type":'application/json',
          Authorization:`Bearer ${token}`
        }
      })
      navigate('/DoctorProfilePage')
    console.log(response.data.message);

    }
    catch(error){
      console.log(error.response?.data)
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Set Doctor Availability</h2>
      <form onSubmit={HandleSubmit}>
        <div className="mb-3">
          <label className="form-label">Select Date</label>
          <input
            type="date"
            className="form-control"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Choose Time Slots</label>
          {Slots.map((item, index) => (
            <div key={index}>
              <input
                type="checkbox"
                value={item.label}
                onChange={(e) => {
                  const value = e.target.value;
                  if (e.target.checked) {
                    setSelectedSlots([...selectedSlots, value]);
                  } else {
                    setSelectedSlots(
                      selectedSlots.filter((slot) => slot !== value)
                    );
                  }
                }}
              />
              {item.start_time} - {item.end_time} 
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary">
          Save Slots
        </button>
      </form>
    </div>
  );
}

export default SetSlots;
