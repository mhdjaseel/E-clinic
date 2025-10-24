import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DoctorNavbar from '../Profile/DoctorNavbar';

function PatientsHistory() {
    const navigate = useNavigate();
    const [Data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('doctor_access');

            if (!token) {
                navigate('/DoctorLogin');
                return;
            }

            try {
                const response = await axios.get('http://127.0.0.1:8000/doctor/DoctorsMedicalHistory', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data);
                console.log('data...', response.data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div style={{ minHeight: '100vh' }}>
            <DoctorNavbar />
            <div className="container mt-4">
                <h2 className="text-center mb-4 "> Previous Appointments</h2>

                {Data.length === 0 ? (
                    <div className="text-center text-muted mt-5">
                        <h5>No previous appointments found.</h5>
                    </div>
                ) : (
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        {Data.map((item, index) => (
                            <div className="col" key={index}>
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="card-header bg-primary text-white">
                                        <strong>Date:</strong> {item.appointment?.slot?.date || 'N/A'}
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">
                                             <strong>Patient</strong>: {item.patient?.user?.username || 'Unknown'} ({item.patient?.gender || 'N/A'})
                                        </h5>
                                        <p className="card-text"><strong> Summary:</strong> {item.summary || 'N/A'}</p>
                                        {item.allergy && (
                                            <p className="card-text ">
                                                 <strong>Allergy:</strong> {item.allergy}
                                            </p>
                                        )}
                             
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PatientsHistory;
