import React from 'react'

function PatientHistory() {
  return (
    <div> 
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <h2 className='text-center'>Medical History</h2>
                        <div className="card">
                            <div className="card-header">
                                Date
                            </div>
                            <div className="card-body">
                                <h4>Disease</h4>
                                <p>consulted By :</p>
                            </div>
                        </div>
                    
                </div>
                <div className="col-md-6">
                     <h2 className='text-center'>Payment History</h2>
                        <div className="card">
                            <div className="card-header">
                                Date
                            </div>
                            <div className="card-body">
                                <h4>Amount</h4>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PatientHistory