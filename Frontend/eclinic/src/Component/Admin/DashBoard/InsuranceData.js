import axios from "axios";
import { useLocation ,useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

function InsuranceData() {
const navigate = useNavigate()
  const location = useLocation();
  const data = location.state || {};
  const insuranceImage = `http://127.0.0.1:8000${data.Insurance_img}`;

  const HandleVerified =  async (id)=>{
    const token = localStorage.getItem('admin_access')
    try {
        await axios.post('http://127.0.0.1:8000/adminapp/InsuranceVerified/',{id:id},{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    toast.success('Verified Insurance')
    navigate('/AdminLayout/AdminDashboard')

    } catch (error) {
        console.log(error)
        if (error.response && error.response.status === 401) {
            toast.error('Tpken Expired please login')
            navigate('/AdminLogin')
        }
    }
  }
  return (
    <div className="container">
      <div className="card mx-auto mt-5 shadow" style={{ maxWidth: "800px" }}>
        <div className="bg-primary rounded text-white fs-3 text-center p-3">
          Insurance Details
        </div>
        <div className="card-body">
          <div className="row mt-3">
            <div className="col-sm-12 col-md-6 mb-3">
              <p><strong>Policy Holder:</strong> {data.Policy_holder}</p>
              <p><strong>Company Name:</strong> {data.Company_name}</p>
              <p><strong>Policy Number:</strong> {data.Policy_number}</p>
            </div>
            <div className="col-sm-12 col-md-6 mb-3">
              <p><strong>Expiry Date:</strong> {data.Policy_date}</p>
              <p><strong>Plan Type:</strong> {data.Plan_type}</p>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12 text-center">
              <p><strong>Insurance Book:</strong></p>
              <img
                src={insuranceImage}
                alt="Insurance"
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="btn">
            <button type="submit" className="btn btn-primary btn-sm" onClick={()=>{HandleVerified(data.id)}}>Verified</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsuranceData;
