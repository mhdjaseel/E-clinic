import React from "react";

function HealthTip() {
  return (
    <div className="container py-4" style={{fontFamily:'serif'}}>
      <div className="row">
        {/* Healthy Habits Section */}
        <div className="col-12 col-md-12 mb-4">
          <h2 className="text-center">
            Healthy Habits <i className="fa-solid fa-check text-success"></i>
          </h2>
          <ul className="list-unstyled">
            <li className="mb-3">
              <div className="card">
                <div className="card-body">Eat more fruits and vegetables</div>
              </div>
            </li>
            <li className="mb-3">
              <div className="card">
                <div className="card-body">Stay hydrated throughout the day</div>
              </div>
            </li>
          </ul>
        </div>

        {/* Avoid These Section */}
        <div className="col-12 col-md-12 mb-4">
          <h2 className="text-center">
            Avoid These <i className="fa-solid fa-xmark text-danger"></i>
          </h2>
          <ul className="list-unstyled">
            <li className="mb-3">
              <div className="card">
                <div className="card-body">Skipping meals regularly</div>
              </div>
            </li>
            <li className="mb-3">
              <div className="card">
                <div className="card-body">Excessive sugar intake</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HealthTip;