import React from 'react'
import logo from '../assets/images/Mediaicon.ico'
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

function Footer() {
    return (
        <div className='flex flex-col w-full items-center py-12'>
            <div className='flex sm:flex-row justify-between items-center flex-col w-[80%]'>
                <div className='w-full justify-start'>
                    <img className='h-14 rounded-lg' src={logo} alt="logo" />
                </div>


                <div className='flex gap-4 text-sm font-semibold text-black w-full justify-center'>
                    <a href="#section1">Home</a>
                    <a href="#section2">About</a>
                    <a href="#section3">Services</a>
                    <a href="#section4">Contact</a>
                </div>

                <div className='flex gap-2 w-full justify-end'>
                    <FaSquareInstagram size={25} />
                    <FaFacebook size={25} />
                    <FaTwitterSquare size={25} />
                    <FaLinkedin size={25} />
                    <FaYoutube size={25} />


                </div>


            </div>
            <div className=' border-gray-400 border-t-2 w-[80%] mt-8'>

            </div>
            <div className='mt-5 text-sm font-normal'>
                <p>&copy; 2024 agoldallince. All rights reserved.</p>


            </div>

        </div>
    )
}

export default Footer