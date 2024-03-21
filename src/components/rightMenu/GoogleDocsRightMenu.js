import Axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { FiCameraOff } from "react-icons/fi";
import jwt_decode from "jwt-decode";
import { useStateContext } from "../../contexts/contextProvider";
import { color } from "framer-motion";

function GoogleDocsRightSide() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    var decoded = jwt_decode(token);

    return (
        <div>
            <div className='flex flex-col'>
                Click to create a Google Docs
                <Button
                    id='createBtn'
                    variant='primary'
                    className='px-5'
                    style={{ marginBottom: '30px' }}
                />
            </div>
            <div>
                Click to add an existing Docs
                <Button
                    id='addBtn'
                    variant='primary'
                    className='px-5'
                    style={{ marginBottom: '30px' }}
                />
            </div>

            <Button
                variant="secondary"
                // className="remove_button"
                className="remove_button"
                // onClick={() => {
                //   setConfirmRemove(true)
                // }
                // }
                disabled={decoded.details.action === "document" ? true : false}
            >
                Delete google docs
            </Button>

        </div>
    )

}

export default GoogleDocsRightSide