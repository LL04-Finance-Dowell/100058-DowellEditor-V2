import React, { useEffect, useState } from "react";
import { Row, Button, Form } from "react-bootstrap";
import { useStateContext } from "../../contexts/contextProvider";
import { useSearchParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios, * as others from 'axios';
import { ToastContainer, toast } from "react-toastify";


const PaymentRightSide = () => {
    const { buttonLink, setButtonLink, buttonPurpose, setButtonPurpose, buttonBorderSize, setButtonBorderSize, buttonBorderColor, setButtonBorderColor, setConfirmRemove, confirmRemove, setIsLoading, isLoading, paymentKey, setPaymentKey, data, pageNum } =
        useStateContext();
    const [selectedType, setSelectedType] = useState('')
    const [addedAns, setAddedAns] = useState([])
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [selectPayment, setSelectPayment] = useState();
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState();
    const [currencyCode, setCurrencyCode] = useState("");
    const [callbackUrl, setCallbackUrl] = useState("");
    const [stripePaymentData, setStripePaymentData] = useState({});
    const [paypalPaymentData, setPaypalPaymentData] = useState({});
    
    // const [stripeKey, setStripeKey] = useState("");
    const [paypalClientId, setPaypalClientId] = useState("");
    const [loader, setLoader] = useState(false);
    var decoded = jwt_decode(token);


    const button = document.querySelector(".focussed");
    const holderDIV = document.querySelector(".focussedd");

    const finalizeButton = document.getElementById("finalize-button");
    const select = document.getElementById("selectt");
    const rejectButton = document.getElementById("reject-button");

    const purpose = holderDIV?.children[2]?.innerHTML;
    const link = holderDIV?.children[1]?.innerHTML;

 
    const [showSlider, setShowSlider] = useState(false);

    const handleUpdate = () => {

        // if (btnName.value != "") {
        //     button.textContent = btnName?.value;
        // }

        const link = document.getElementById("link").value;
        if (link.value != "") {
            setPaymentKey(link);
            holderDIV.children[1].innerHTML = link;
        }
        // console.log("Master link", holderDIV);

    };
    // console.log("Master link", link);
    // console.log("Master link", holderDIV.children[1].innerHTML);

    const [passData, setPassData] = useState("");

    const dataFind = data[1].map(data => data.type);
    console.log("midsection data", dataFind)

  


    if(data[1].find(data => data.type === "PAYMENT_INPUT")) {
        // console.log("This is payment input data")
        useEffect(() => {
            setPassData(data[1].map(data => data.raw_data));
        }, [])
        console.log("This is payment input data", passData)
    }
    


    const handleSelect = (event) => {
        let selectField = document.getElementById("selectt");
        const linkDiv = document.getElementById("website_link");
        const holderDIV = document.querySelector(".focussedd");

        let selectedOption = selectField.options[selectField.selectedIndex];

        setButtonPurpose(selectedOption.value);
        holderDIV.children[2].innerHTML = selectedOption.value;

        if (selectedOption.value == "custom") {
            linkDiv.style.display = "block";
        } else if (selectedOption.value !== "custom") {
            setButtonLink("");
        } else {
            console.log("No option selected");
        }
    };

    const removeButton = () => {
        document.querySelector(".focussedd").remove();
    };

    const handleBorderSizeChange = (e) => {
        setButtonBorderSize(e.target.value);

        const box = document.getElementsByClassName("focussedd")[0];
        box.style.borderWidth = `${e.target.value}px`;

    };

    const handleBorderColorChange = (e) => {
        setButtonBorderColor(e.target.value);
        const box = document.getElementsByClassName("focussedd")[0];
        box.style.borderColor = `${e.target.value}`;
    };
    const handleRangeBlur = (e) => {
        e.target.focus();
    };

    const handleSelectPayment = (e) => {
        setSelectPayment(e.target.value);
    }
    const [validated, setValidated] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [popupUrl, setPopupUrl] = useState(null);

    const openPopup = (url) => {
        setPopupUrl(url);
    };

    const closePopup = () => {
        setPopupUrl(null);
    };


    const handleStripePayment = async (e) => {
        e.preventDefault();
        const stripeData = {
            // stripe_key: "sk_test_51LiKUnEJkGNthfbzNbTn7Up7EnVwyeqRWLcRX1UWyq7ABL7wn1VMmHsS4Aox3U9b2nh3HkHd32vsQRR7nItC8ybv00WChhFen4",
            stripe_key: link,
            template_id: decoded.details._id,
            price: +price,
            product: productName,
            currency_code: currencyCode,
            callback_url: callbackUrl,
            // template_id: decoded.details._id,
            // price: +price,
            // product: productName,
            // currency_code: currencyCode,
            // callback_url: callbackUrl
        }
        console.log("stripe data", stripeData);
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setLoader(false)

        }
        setValidated(true);
        // setLoader(true)
        if (form.checkValidity() === true) {
            e.preventDefault();
            setLoader(true)
            try {
                const res = await axios.post("https://100088.pythonanywhere.com/api/workflow/stripe/initialize", stripeData)
                setStripePaymentData(res.data);
                console.log("payment response", res.data);
                setLoader(false)
                toast.success("Successfully Submitted!")
                const timeout = setTimeout(() => {
                    window.open(res.data.approval_url, '_blank');
                }, 2000); // Wait for 2 seconds
                return () => clearTimeout(timeout);
            } catch (error) {
                console.log(error)
                setLoader(false)
                toast.error(error.response.data.message);
            }
        }
    }

    //paypal payment

    const handlePaypalPayment = async (e) => {
        e.preventDefault();
        const paypalData = {
            // paypal_client_id: "AVJXJddOEG7WGrLkTzg4_9ODsDNhIHrqT4ZL6gwXRz1ftQELliYtticZH-kLjoYaTZfNn_8y5onH_YP3",
            paypal_client_id: link,
            paypal_secret_key: "ELsNyOGLDJVZCsfuuu5AhsFRmQbgBwxEVZteB-2XLZm8RLa8cPeS_cfNi35w7bJwkOKDHOnNxyHsJKu6",
            template_id: decoded.details._id,
            price: +price,
            product: productName,
            currency_code: currencyCode,
            callback_url: callbackUrl
        }
        console.log("paypal data", paypalData);
        setLoader(true)

        try {
            const res = await axios.post("https://100088.pythonanywhere.com/api/workflow/paypal/initialize", paypalData)
            setLoader(true)
            setPaypalPaymentData(res.data);
            setLoader(false)
            console.log("paypal data", res.data)
            const timeout = setTimeout(() => {
                window.open(res.data.approval_url, '_blank');
                // openPopup(res.data.approval_url);
            }, 2000); // Wait for 2 seconds
            toast.success("Successfully Submitted!");
            return () => clearTimeout(timeout);
        } catch (error) {
            console.log(error)
            setLoader(false)
            toast.error(error.data.error);
        }
    }



    return (
        <>
            <div className="mt-2 mb-3 w-100">
                <h3>Payment Settings</h3>
                <select
                    onChange={handleSelectPayment}
                    id="selectt"
                    // onChange={handleDateMethod}

                    className="select border-0 bg-white rounded w-100 h-75 p-2"
                >
                    <option value="stripe">Stripe</option>
                    <option value="paypal">Paypal</option>
                </select>
                <br />

                {
                    selectPayment == "paypal" ?
                        <Form noValidate validated={validated} onSubmit={handlePaypalPayment}>
                            {
                                decoded.details.action === "template" ? <div>
                                    <Form.Label>Paypal Client Id</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Paypal Client Id"
                                        // id="button_name"
                                        id="link"
                                        // value={stripeKey}
                                        onChange={() => {}}


                                    />
                                    {/* <br /> */}
                                    {/* <Form.Label>Product Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Product name"
                                        id="button_name"
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                    />

                                    <br />

                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        placeholder="Product Price"
                                        // id="button_name"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                    <br />
                                    <select
                                        required
                                        onChange={(e) => setCurrencyCode(e.target.value)}
                                        id="selectt"
                                        // onChange={handleDateMethod}
                                        className="select border-0 bg-white rounded w-100 h-75 p-2"
                                    >
                                        <option value="">Select Currency</option>
                                        <option value="usd">USD</option>
                                        <option value="aed">AED</option>
                                        <option value="afn">AFN</option>
                                        <option value="amd">AMD</option>
                                        <option value="ang">ANG</option>
                                        <option value="aoa">AOA</option>
                                    </select>
                                    <br />
                                    <Form.Label>Callback URL</Form.Label>
                                    <Form.Control
                                        required
                                        type="url"
                                        placeholder="Callback URL"
                                        // id="button_name"
                                        value={callbackUrl}
                                        onChange={(e) => setCallbackUrl(e.target.value)}
                                    /> */}
                                    <br />
                                    <button type="submit" className="btn btn-primary">
                                        {
                                            loader ? "Wait...." : "Submit Info"
                                        }
                                    </button>
                                </div> : <div>
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control
                                       required
                                        type="text"
                                        placeholder="Product name"
                                        id="button_name"
                                        value={productName}
                                      onChange={(e) => setProductName(e.target.value)}
                                     />

                                     <br />

                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        placeholder="Product Price"
                                        // id="button_name"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                     <br />
                                     <select
                                        required
                                        onChange={(e) => setCurrencyCode(e.target.value)}
                                        id="selectt"
                                        // onChange={handleDateMethod}
                                        className="select border-0 bg-white rounded w-100 h-75 p-2"
                                    >
                                        <option value="">Select Currency</option>
                                        <option value="usd">USD</option>
                                        <option value="aed">AED</option>
                                        <option value="afn">AFN</option>
                                        <option value="amd">AMD</option>
                                        <option value="ang">ANG</option>
                                        <option value="aoa">AOA</option>
                                    </select>
                                    <br />
                                    <Form.Label>Callback URL</Form.Label>
                                    <Form.Control
                                        required
                                        type="url"
                                        placeholder="Callback URL"
                                        // id="button_name"
                                        value={callbackUrl}
                                        onChange={(e) => setCallbackUrl(e.target.value)}
                                    />
                                    <br />
                                    <button type="submit" className="btn btn-primary">
                                        {
                                            loader ? "Wait...." : "Submit Info"
                                        }
                                    </button> 
                                </div>
                            }
                        </Form> : <Form noValidate validated={validated} onSubmit={handleStripePayment}>
                            {
                                decoded.details.action == "template" ? <div>
                                    <Form.Label>Stripe Key</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Stripe Key"
                                        id="link"
                                        // value={stripeKey}
                                        onChange={() => {}}
                                        // onChange={(e) => setStripeKey(e.target.value)}

                                    />
                                    <br />
                                    {/* <Form.Label>Product Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Product name"
                                        id="button_name"
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}

                                    />
                                    <br />

                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        placeholder="Product Price"
                                        // id="button_name"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                    <br />
                                    <select
                                        required
                                        onChange={(e) => setCurrencyCode(e.target.value)}
                                        id="selectt"
                                        // onChange={handleDateMethod}
                                        className="select border-0 bg-white rounded w-100 h-75 p-2"
                                    >
                                        <option value="">Select Currency</option>
                                        <option value="usd">USD</option>
                                        <option value="aed">AED</option>
                                        <option value="afn">AFN</option>
                                        <option value="amd">AMD</option>
                                        <option value="ang">ANG</option>
                                        <option value="aoa">AOA</option>
                                    </select>
                                    <br />
                                    <Form.Label>Callback URL</Form.Label>
                                    <Form.Control
                                        required
                                        type="url"
                                        placeholder="Callback URL"
                                        // id="button_name"
                                        value={callbackUrl}
                                        onChange={(e) => setCallbackUrl(e.target.value)}
                                    />
                                    <br /> */}

                                    <button type="submit" className="btn btn-primary">
                                        {
                                            loader ? "Wait...." : "Submit Info"
                                        }
                                    </button>
                                </div> : <div>
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Product name"
                                        id="button_name"
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}

                                    />
                                    <br />

                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        placeholder="Product Price"
                                        // id="button_name"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                    <br />
                                    <select
                                        required
                                        onChange={(e) => setCurrencyCode(e.target.value)}
                                        id="selectt"
                                        // onChange={handleDateMethod}
                                        className="select border-0 bg-white rounded w-100 h-75 p-2"
                                    >
                                        <option value="">Select Currency</option>
                                        <option value="usd">USD</option>
                                        <option value="aed">AED</option>
                                        <option value="afn">AFN</option>
                                        <option value="amd">AMD</option>
                                        <option value="ang">ANG</option>
                                        <option value="aoa">AOA</option>
                                    </select>
                                    <br />
                                    <Form.Label>Callback URL</Form.Label>
                                    <Form.Control
                                        required
                                        type="url"
                                        placeholder="Callback URL"
                                        // id="button_name"
                                        value={callbackUrl}
                                        onChange={(e) => setCallbackUrl(e.target.value)}
                                    />
                                    <br />

                                    <button type="submit" className="btn btn-primary">
                                        {
                                            loader ? "Wait...." : "Submit Info"
                                        }
                                    </button>
                                </div>
                            }
                        </Form>

                }
            </div>

            <hr />
            <Row className="pt-4">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h6 style={{ marginRight: "10rem" }}>Border</h6>
                    <label className="switch">
                        <input type="checkbox" onClick={() => setShowSlider(!showSlider)} />
                        <span className="slider round"></span>
                    </label>
                </div>
                {showSlider && (
                    <div style={{ display: "flex", alignItems: "center", backgroundColor: "#abab", gap: "10px", height: "40px", width: "90%" }}>
                        <input
                            type="color"
                            value={buttonBorderColor}
                            onChange={handleBorderColorChange}
                            id="color"
                            style={{ border: "none", width: "10%", height: "15px" }}
                        />
                        <input
                            type="range"
                            min="0"
                            max="20"
                            value={buttonBorderSize}
                            onChange={handleBorderSizeChange}
                            onBlur={handleRangeBlur}
                            id="range"
                            className="range-color"

                        />

                    </div>
                )}
            </Row>
            <hr />

            <hr />
            <div className="mt-2 text-center pt-5">
                <Button variant="secondary" className="px-5" onClick={handleUpdate}>
                    Update Changes
                </Button>
            </div>

            <div className="mt-2 text-center pt-5">
                <Button
                    variant="primary"
                    className={decoded.details.action === "template" ? "px-5 remove_button" : "px-5 remove_button disable_button"}
                    // onClick={removeButton}
                    onClick={() => setConfirmRemove(!confirmRemove)}
                >
                    Remove Payment Button
                </Button>
            </div>
            <ToastContainer size={5} />
        </>
    );
};

export default PaymentRightSide;
