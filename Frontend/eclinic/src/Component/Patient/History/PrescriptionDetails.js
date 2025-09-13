import axios from 'axios';
import React, { useEffect,useState ,useRef} from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import Navbar from "../Appoinment/Navbar";
import {useReactToPrint} from 'react-to-print'
import './Prescription.css'
function PrescriptionDetails() {
    const location= useLocation()
    const {Prescription} = location.state || {}
    const [Data, setData] = useState([]);


    useEffect(() => {
        console.log(Prescription)
    const fetchData = async () => {
      const token = localStorage.getItem("access");

      if (!token) {
        console.log("No token found");
        return;
      }
      try {

        const response = await axios.get(
          `http://127.0.0.1:8000/PrescriptionDetailsView/${Prescription.id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response.data);
        console.log(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };
    fetchData();
    }, []);



    // Handle Print
    const componentPrint = useRef(null)
    const HandlePrint = useReactToPrint({
      contentRef: componentPrint,
      documentTitle: 'Prescription',
      onAfterPrint:()=> toast.success('Download complete')
    })

  return (
    <div>
      <div className="d-print-none">
      <Navbar/>
      </div>
  <div className="d-print-none d-flex justify-content-end me-5 mt-4">
  <button 
    className="btn btn-success d-flex align-items-center gap-2 shadow-sm px-4 py-2" 
    onClick={HandlePrint}
    style={{ fontSize: '1rem', borderRadius: '6px' }}
  >
    <i className="fas fa-download"></i>
    Download Prescription
  </button>
</div>

      <div ref={componentPrint}>
       <div className="container my-4">
  <div className="col-md-10 mx-auto ">
    <div className="card shadow">
      {/* Hospital Header */}
      <div className="card-header  text-center">
        <h2 className="mb-0">{Prescription?.doctor?.Hospital_name}</h2>
      </div>

      {/* Doctor and Patient Info Row */}
      <div className="card-body">
        <div className="row mb-4">
          {/* Doctor Info */}
          <div className="col-md-6">
            <h5 className="fw-bold">Doctor Details</h5>
            <p className="mb-1"><strong>Name:</strong> Dr. {Prescription?.doctor?.user?.username}</p>
            <p className="mb-1"><strong>Specialization:</strong> {Prescription?.doctor?.specialization}</p>
            <p className="mb-1"><strong>Phone:</strong> {Prescription?.doctor?.phone_number}</p>
          </div>

          {/* Patient Info */}
          <div className="col-md-6">
            <h5 className="fw-bold">Patient Details</h5>
            <p className="mb-1"><strong>Name:</strong> {Prescription?.patient?.user?.username}</p>
            <p className="mb-1"><strong>Gender:</strong> {Prescription?.patient?.gender}</p>
            <p className="mb-1"><strong>Phone:</strong> {Prescription?.patient?.phone_number}</p>
          </div>
        </div>
<hr />
        {/* Medicine Table */}
        <div className="mb-3">
          <div className="details">
            <p><span className="fw-bold">Summary: </span> {Prescription.summary}</p>
            <p><span className="fw-bold">Allergy: </span> {Prescription.allergy}</p>
          </div>
          <h5 className="fw-bold">Prescription</h5>

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>Medicine</th>
                  <th>Dosage</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(Data) && Data.length > 0 ? (
                  Data.map((med, index) => (
                    <tr key={index}>
                      <td>{med.name}</td>
                      <td>{med.dosage}</td>
                      <td>{med.quantity}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center text-muted">
                      No medicines prescribed.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Optional: Date Footer */}
        <div className="text-end text-muted small d-print-none">
          <p>Generated on: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  </div>
</div>
</div>



    </div>
  )
}

export default PrescriptionDetails