import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import successFulPayment from "./../../assets/paymentSuccessful.svg";
import { useStateContext } from '../../contexts/contextProvider';
import axios from 'axios';


const ThankYouPage = () => {
    const { savedSripeKey, savedPaypalKey } = useStateContext()
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // This will navigate back to the previous route
    };
    useEffect(() => {
        if (savedSripeKey == null && savedPaypalKey != null) {
            const resVerify = axios.post("https://100088.pythonanywhere.com/api/workflow/verify/payment/paypal", {
                stripe_key: savedPaypalKey,
                id: res.data.payment_id
            });

            if (resVerify.data.status == "succeeded") {
                setTimeout(function () {
                    window.location.href = res.callbackUrl;
                }, 2000);
            } else {
                console.log("Your Stripe Payment Not verified");
            }
        }

    }, [])
    return (
        <div className='shadow-lg p-3'>
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <div>
                    <div className="mb-4 text-center">
                        <img src={successFulPayment} alt='payment successful' />
                    </div>
                    <div className="text-center">
                        <h1>Thank You!</h1>
                        <p>your payment was successfull</p>
                        <button className="btn btn-primary" onClick={handleGoBack}>Back Home</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThankYouPage;