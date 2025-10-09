import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function InsuranceVerify() {
  const navigate = useNavigate();
  const [Data, setData] = useState([]);
  const FetchData = async () => {
    const token = localStorage.getItem("admin_access");
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/adminapp/InsuranceVerify",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      if (error?.response && error.response.status === 401) {
        toast.error("Token Expired. Please Login");
        navigate("/AdminLogin");
      }
    }
  };
  useEffect(() => {
    FetchData();
  }, []);
  return (
    <div>
      <div className="container my-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">owner</th>
                  <th scope="col">policy number</th>
                  <th>Plan Type</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {Data.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.owner.user?.username}</td>
                    <td>{item.Policy_number}</td>
                    <td>{item.Plan_type}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-info"
                        onClick={() => {
                          navigate("/AdminLayout/InsuranceData", {
                            state: item,
                          });
                        }}
                      >
                        👁 View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsuranceVerify;
