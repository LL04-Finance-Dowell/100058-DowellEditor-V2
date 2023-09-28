import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import successFulPayment from "./../../assets/paymentSuccessful.svg";
import { useStateContext } from '../../contexts/contextProvider';
import axios from 'axios';


const ThankYouPage = () => {
    const { savedSripeKey, savedPaypalKey } = useStateContext()
    const [successful, setSuccessful] = useState(null)
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // This will navigate back to the previous route
    };
    useEffect(() => {
        console.log("saved stripe", savedSripeKey);
        console.log("saved paypal", savedPaypalKey);
        if (savedSripeKey.payment_id !== null && savedPaypalKey.payment_id === null) {
            const resVerify = axios.post("https://100088.pythonanywhere.com/api/workflow/verify/payment/stripe", {
                stripe_key: savedSripeKey.key,
                id: savedSripeKey.payment_id
            });
            console.log(resVerify);

            if (resVerify.data.status == "succeeded") {
                setSuccessful(true);
            } else {
                setSuccessful(false);
                console.log("Your Stripe Payment Not verified");
            }
        }

    }, [])
    return (
        <div className='shadow-lg p-3'>
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <h1>HELLO</h1>
                <div>
                    {
                        (successful != null) && (successful ? (<>
                            <div className="mb-4 text-center">
                                <img src={successFulPayment} alt='payment successful' />
                            </div>
                            <div className="text-center">
                                <h1>Thank You!</h1>
                                <p>your payment was successfull</p>
                                <button className="btn btn-primary" onClick={handleGoBack}>Back Home</button>
                            </div>
                        </>) : 
                        (<>
                            <div className="mb-4 text-center">
                                <img src={successFulPayment} alt='payment successful' />
                            </div>
                            <div className="text-center">
                                <h1>Sorry</h1>
                                <p>your payment was not successful</p>
                                <button className="btn btn-primary" onClick={handleGoBack}>Back Home</button>
                            </div>
                        </>)
                        
                        
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default ThankYouPage;