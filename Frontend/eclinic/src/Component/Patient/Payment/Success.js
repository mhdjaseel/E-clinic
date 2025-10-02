import './Success.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect ,useRef} from 'react';
import axios from 'axios'

const Success = () => {
     const [params] = useSearchParams();
     const hasCalled = useRef(false);
const navigate = useNavigate()
  useEffect(() => {
    const sessionId = params.get('session_id');

    if (sessionId && !hasCalled.current) {
        hasCalled.current = true;
      axios.post(
        'http://localhost:8000/PaymentCreation/',
        { session_id: sessionId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        }
      )
      .then(res => {
        localStorage.setItem('appoinmentFee','true')

        console.log('Payment verified:', res.data);
      })
      .catch(err => {
        console.error('Verification failed:', err.response.data);
      });
    }
  }, []);

  const HandleClick = () => {
navigate('/appoinmentRequest')
  }
  return (
    <div className="success-container bg-success">
      <div className="success-card">
        <i className="fas fa-check-circle success-icon"></i>
        <h2 className="success-title">Payment Successful!</h2>
        <p className="success-message">
          Your appointment fee has been paid successfully. A confirmation has been sent to your email.
        </p>
        <button className='btn btn-success' onClick={HandleClick} >
            Back To Appoinment
        </button>
      </div>
    </div>
  );
};

export default Success;
