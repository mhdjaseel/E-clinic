import { useState } from "react";

function NoInsurance() {
  const [Visisble, setVisisble] = useState(true);


 const handleLater = () => {
    setVisisble(false)
  };


  return Visisble && (
    <div
      className="modal fade show"
      tabIndex="-1"
      role="dialog"
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.5)",
        overflowY: "auto",
      }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content p-4">
          

          {/* Modal Body */}
          <div className="text-center">
            <h2 className="mb-3">Add Insurance Details</h2>
            <p style={{ maxWidth: 400, margin: "0 auto" }}>
              Got health insurance? Share your details to make your clinic
              visits smoother, faster, and more affordable. It's one step closer
              to stress-free care.( You can Add in Profile Later )
            </p>
            
            <button
              className="btn btn-primary mt-4 me-3"
              onClick={handleLater}
            >
              Add Later
            </button>



          </div>
        </div>
      </div>
    </div>
  );
}

export default NoInsurance;
