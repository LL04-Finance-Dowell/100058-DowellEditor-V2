import styles from "./Footer.module.css";
import { useState, useEffect } from "react";
import React from "react";
import { useSearchParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Footer = () => {

    const [userDetails, setUserDetails] = useState({
        authorized: '',
        nextUser: '',
        prevUser: '',
    });


    const [searchParams] = useSearchParams();
    useEffect(() => {
        const token = searchParams.get('token');
        var decoded = jwt_decode(token);
        console.log(decoded);
        setUserDetails({
            authorized: decoded?.details?.authorized,
            nextUser: decoded?.details?.next_viewers[0],
            prevUser: decoded?.details?.previous_viewers[0],
        });
    }, []);
    return (
        <div className={styles.footer_container}>
            <div>
                <h1>Previous User:</h1>
                <h2 className='details'>{userDetails.prevUser}</h2>
            </div>
            <div>
                <h1>Current User:</h1>
                <h2 className='details'>{userDetails.authorized}</h2>
            </div>
            <div>
                <h1>Next User:</h1>
                <h2 className='details'>{userDetails.nextUser}</h2>
            </div>
        </div>
    );
};

export default Footer;