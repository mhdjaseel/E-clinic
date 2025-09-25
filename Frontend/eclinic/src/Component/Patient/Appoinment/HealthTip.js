import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function HealthTip() {
  const navigate = useNavigate();
  const [Data, setData] = useState([]);

  useEffect(() => {
  

    const FetchData = async () => {
      const token = localStorage.getItem("access");

      if (!token) {
        toast.error("Token Not Found");
        navigate("/patientLogin");
        return;
      }
      try {

        const response = await axios.get(
          "http://127.0.0.1:8000/adminapp/HealthTipsDetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
        console.log(response.data)
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    FetchData();
  }, []);

  return (
    <div className="container py-5" style={{ fontFamily: "serif" }}>
      <h2 className="text-center mb-4">Everyday Health Hacks</h2>

      {Data.length > 0 ? (
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          {/* Carousel Indicators */}
          <div className="carousel-indicators">
            {Data.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : undefined}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>

       <div className="carousel-inner">
  {Data.map((item, index) => (
    <div
      key={item.id || index}
      className={`carousel-item ${index === 0 ? "active" : ""}`}
    >
      <img
        src={`http://127.0.0.1:8000${item.image}`} // fix image URL if needed
        className="d-block w-100 img-fluid"
        alt={item.title}
        style={{ height: 500,objectfit: 'cover'}}
      />
      <div className="carousel-caption d-block">
        <div
          className="bg-white bg-opacity-75 p-3 rounded shadow text-dark"
          style={{ maxWidth: "90%", margin: "0 auto",opacity:.8}}
        >
          <h5 className="text-dark">{item.title}</h5>
          <p>{item.description}</p>
        </div>
      </div>
    </div>
  ))}
</div>


          {/* Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      ) : (
        <h4 className="text-center">No Tips Found</h4>
      )}
    </div>
  );
}

export default HealthTip;
