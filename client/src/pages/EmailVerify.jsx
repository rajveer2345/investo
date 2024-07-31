import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../api/user';




function EmailVerify() {
    const navigate = useNavigate();
    const { token } = useParams();

    useEffect(() => {
        console.log("running")
        const verify = async () => {
            const data = await verifyEmail(token);
            if (data.message) {
                alert('Email successfully verified. Redirect to login page.')
                navigate('/');
            } else {
                alert("Email verification failed.")
                navigate('/');
            }
        }
        verify();
    },[])

    return (
        <div className='w-full h-screen flex justify-center items-center font-poppins bg-tertiary'>
            <div className=' bg-white  shadow-lg rounded-3xl px-8 py-5'>

                <h4 className='text-sm text-gray-400  text-balance font-medium'>Email verification under process</h4>
                <div className="my-4 mx-auto border-t-4 border-primary border-solid w-12 h-12 border-r-transparent border-4 rounded-full animate-spin">

                </div>
                <h1 className='text-secondary text-xl text-center'>Please Wait</h1>


            </div>
        </div>
    )
}

export default EmailVerify