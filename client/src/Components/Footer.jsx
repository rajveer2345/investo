import React from 'react'
import logo from '../assets/images/Mediaicon.ico'
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

function Footer() {
    return (
        <div className='flex flex-col w-full items-center py-8'>
            <div className='flex sm:flex-row justify-between items-center flex-col w-[80%] sm:gap-0 gap-4'>
                <div className='w-full flex justify-center sm:justify-start'>
                    <img className='h-10 rounded-lg' src={logo} alt="logo" />
                </div>


                <div className='flex gap-4 text-xs font-medium text-black w-full justify-center'>
                    <a href="#section1">Home</a>
                    <a href="#section2">About</a>
                    <a href="#section3">Services</a>
                    <a href="#section4">Contact</a>
                </div>

                <div className='flex gap-2 w-full sm:justify-end justify-center'>
                    <FaSquareInstagram size={20} />
                    <FaFacebook size={20} />
                    <FaTwitterSquare size={20} />
                    <FaLinkedin size={20} />
                    <FaYoutube size={20} />
                </div>


            </div>
            <div className=' border-gray-400 border-t-2 w-[80%] mt-4'>

            </div>
            <div className='mt-5 text-xs font-normal'>
                <p>&copy; 2024 agoldallince. All rights reserved.</p>


            </div>

        </div>
    )
}

export default Footer