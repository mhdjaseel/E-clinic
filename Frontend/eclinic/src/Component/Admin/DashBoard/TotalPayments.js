
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function TotalPayments() {
  const navigate = useNavigate();
  const [Data,setData] = useState([]);
    const FetchData = async () => {
      const token = localStorage.getItem('admin_access');
      try {
        const response = await axios.get('http://127.0.0.1:8000/adminapp/TotalPayments', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        if (error?.response && error.response.status === 401) {
          toast.error('Token Expired. Please Login');
          navigate('/AdminLogin');
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
                <th scope="col">Paid By</th>
                <th scope="col">Amount</th>
                <th>Currency</th>
                <th scope="col">Date</th>
                <th scope="col">Stripe id</th>
              </tr>
            </thead>
            <tbody>
              {
                Data.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.paid_by.user?.username}</td>
                    <td>{item.amount}</td>
                    <td>{item.currency}</td>
                    <td>{item.created_at}</td>
                    <td>{item.stripe_payment_id}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  )
}

export default TotalPayments