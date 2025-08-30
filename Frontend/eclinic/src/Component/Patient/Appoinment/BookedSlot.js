import React from "react";

function BookedSlot() {
  return (
    <div>
      <div className="col-md-10 text-center">
        <h2 className="">Booked Appoinments</h2>
      </div>
      <div class="card ">
        <div class="card-header">Date</div>
        <div class="card-body">
          <h5 class="card-title">Doctor name </h5>
          <span>specialist , Hospital name</span>
          <button className="btn btn-primary mt-3 d-flex">View Details</button>
        </div>
      </div>
    </div>
  );
}

export default BookedSlot;
