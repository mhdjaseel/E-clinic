import React, { useEffect, useState } from "react";
import Navbar from "../Appoinment/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function PatientHistory() {
  const [Data, setData] = useState([]);
  const [Payment, setPayment] = useState([]);
  const navigate = useNavigate ()
      const token = localStorage.getItem("access");

    const fetchPaymentData = async () => {


      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/PaymentHistoryView",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPayment(response.data);
        console.log(response.data);
      } catch (error) {
        if (error.response && error?.response.status === 401) {
          
        toast.error('Token Expired');
        }
      }
    };

    const fetchData = async () => {

      if (!token) {
        console.log("No token found");
        return;
      }
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/MedicalHistoryView",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response.data);
        console.log(response.data);
      } catch (error) {
        if (error.response && error?.response.status === 401) {
          
        toast.error('Token Expired');
      }
    };
  }
  useEffect(() => {
    
    fetchData();
fetchPaymentData()
  }, []);

  const HandlePrescription = (Prescription)=>{
    navigate('/PrescriptionDetails' ,{state:{Prescription}})
  }
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h2 className="text-center">Medical History</h2>
            {Data &&
              Data.map((item, index) => (
                <>
                  <div className="card mt-3">
                    <div className="card-header">
                      {item.appointment.slot.date}
                    </div>
                    <div className="card-body">
                      <h4>Disease: {item.summary}</h4>
                      <p>
                        consulted By :{item.doctor?.user?.username}
                      </p>
                    </div>
                    <div className="div">
                    <button className="btn btn-primary mt-2 mb-2 ms-2" onClick={()=>{HandlePrescription(item)}}>View Prescription</button>

                    </div>
                  </div>
                </>
              ))}
          </div>
          <div className="col-md-6">
            <h2 className="text-center">Payment History</h2>
            {Payment &&
              Payment.map((item, index) => (
                <>
                  <div className="card mt-3">
                    <div className="card-header">
                      {item.created_at}
                    </div>
                    <div className="card-body">
                      <h4>Amount: {item.amount} {item.currency}</h4>
            
                    </div>
                    
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientHistory;
