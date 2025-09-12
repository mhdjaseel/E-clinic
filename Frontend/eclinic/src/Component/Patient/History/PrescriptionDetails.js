import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
function PrescriptionDetails() {
    const location= useLocation()
    const {PrescriptionId} = location.state || {}
    const [Data, setData] = useState();
    useEffect(() => {
        console.log(PrescriptionId)
    const fetchData = async () => {
      const token = localStorage.getItem("access");

      if (!token) {
        console.log("No token found");
        return;
      }
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/PrescriptionDetailsView/${PrescriptionId}/`,
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
    }, [PrescriptionId]);

  return (
    <div>

    </div>
  )
}

export default PrescriptionDetails