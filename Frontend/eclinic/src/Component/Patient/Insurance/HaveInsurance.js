import React from "react";
import { useNavigate } from "react-router-dom";
function HaveInsurance({insured,data}) {
 
  return (
    <div>
      <div className="card text-center">
        <div className="card-header display-6">Insurance Details</div>
        <div className="card-body">
          <h5 className="card-title"></h5>
          <p className="card-text " style={{ maxWidth: 500 }}>
        
            Your insurance details are currently under verification. Please wait
            while we confirm the authenticity of your submitted information.
            This process ensures secure access to your policy benefits and
            hospital services. .
          </p>
          <button
            className="btn btn-warning mt-3 d-flex disabled justify-content-end"
          >
            Pending Verification
          </button>
        </div>
        {

        }
      </div>
    </div>
  );
}

export default HaveInsurance;
