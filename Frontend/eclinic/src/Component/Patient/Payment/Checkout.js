import React from 'react'
import {loadStripe} from '@stripe/stripe-js'
import axios from 'axios';
import { toast } from 'react-toastify';
function Checkout(props) {
const stripePromise = loadStripe('pk_test_51Rl3tSRx7GcNSWezOxePs4wynGRSXnmKuhdIQGNA6bJmENhrSAMq6YfInLs649kp0jQfsMYUgu0VTPKsqcrlwzCu00VhcK4fpx');

    const HandleClick = async ()=>{
        const data = {
            'amount':props.amount,
            'currency':'inr'
            
        }
        try{
              const token = localStorage.getItem('access');

    if (!token) {
      toast.error('No token found');
      return;
    }
            const response = await axios.post('http://127.0.0.1:8000/PaymentCheckout/',data,{
                headers:{
                    "Content-Type":'application/json',
                    Authorization:`Bearer ${token}`
                }
            })
        const { sessionId } = response.data;
            console.log(response.data)

      if (sessionId) {
        const stripe = await stripePromise;

        await stripe.redirectToCheckout({ sessionId });
      } else {
        alert('Stripe session not created.');
      }
        }
    catch(error){
    console.error(error);  
    toast.error(error.response?.data || 'An error occurred');

        
    }
    }
  return (
    <div>
        <button type='button' className='btn btn-success' onClick={HandleClick}>Pay {props.amount}</button>
    </div>
  )
}

export default Checkout