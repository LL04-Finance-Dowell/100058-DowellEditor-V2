import Axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { FiCameraOff } from "react-icons/fi";
import jwt_decode from "jwt-decode";
import { useStateContext } from "../../contexts/contextProvider";
import { color } from "framer-motion";
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from "@react-oauth/google"
import GoogleLogin, { GoogleLogout } from 'react-google-login';

function GoogleDocsRightSide() {
    const clientID = `992050792547-478p8j2ot7n7vc10n2sn2113iggl00fj.apps.googleusercontent.com`
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [login, setLogin] = useState(false)
    const [logout, setLogout] = useState(false)
    var decoded = jwt_decode(token);
    var {
        setConfirmRemove, confirmRemove
    } = useStateContext();

    const onSuccess = (res) => {
        console.log('Login Success', res.profileObj)

    }

    const onFailure = () => {
        console.log('login failed')
    }

    const onLogoutSuccess = () => {
        console.log('Lpgout successful')
    }

    const createDocs = () => {
        setLogin(true)

    }

    return (
        <div className='d-flex flex-column justify-content-center'>
            <div className='d-flex flex-column justify-content-center' style={{ marginTop: '20px' }}>
                <h1 className='fs-5'>Click to create a Google Docs</h1>
                <Button
                    id='createBtn'
                    variant='primary'
                    className='px-5 fs-5'
                    style={{ marginBottom: '30px' }}
                    onClick={createDocs}
                >Create </Button>
            </div>
            <div className='d-flex flex-column justify-content-center' style={{ marginTop: '20px' }}>
                <h1 className='fs-5'>Click to add a Google Docs</h1>
                <Button
                    id='addBtn'
                    variant='primary'
                    className='px-5 '
                    style={{ marginBottom: '30px' }}
                >Add </Button>
            </div>

            {login &&
                <div className='d-flex flex-column justify-content-center align-items-center '>
                    <div id='signInButton ' className='d-flex flex-column justify-content-center mb-6 align-items-center'>
                        <GoogleLogin
                            clientId={clientID}
                            buttonText={'Login'}
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                        />
                    </div>
                    <div id='signInButton' className='d-flex flex-column justify-content-center align-items-center'>
                        <GoogleLogout
                            clientId={clientID}
                            buttonText={'Logout'}
                            onLogoutSuccess={onLogoutSuccess}

                        />
                    </div>
                </div>
            }

            <Button
                variant="secondary"
                // className="remove_button"
                className="remove_button"
                // onClick={() => {
                //   setConfirmRemove(true)
                // }
                // }
                style={{ marginTop: '20px' }}
                onClick={() => setConfirmRemove(!confirmRemove)}
                disabled={decoded.details.action === "document" ? true : false}
            >
                Delete google docs
            </Button>

        </div>
    )

}

export default GoogleDocsRightSide