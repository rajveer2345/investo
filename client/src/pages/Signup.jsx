import React from 'react'
import back from '../assets/images/back.jpg'
import { NavLink } from 'react-router-dom'

function signup() {
    return (
        <div className='w-full h-screen bg-tertiary flex justify-center items-center gap-3 font-poppins'>

            <div className='relative bg-white h-3/4 w-1/2 max-w-[350px] min-w-[300px] hidden rounded-3xl drop-shadow-xl md:flex md:justify-center md:items-center'>
                <img className='w-64' src={back} alt="" />
                <div className='bg-white bg-opacity-30 w-full h-full absolute'></div>
            </div>
            <div className='bg-white h-3/4 w-1/2 max-w-[350px] min-w-[300px] drop-shadow-xl rounded-3xl flex justify-center'>
                <div id='formbox' className='flex justify-center flex-col items-center'>
                    <h1 className='mb-6 text-lg font-medium'>Create Account</h1>



                    <form className='md:px-12 px-4 mb-10'>
                        <input className='mb-3 w-full h-7 text-xs font-medium p-2 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black' type="text" placeholder='Name' name='name' />
                        <input className='mb-3 w-full h-7 text-xs font-medium p-2 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black' type="email" placeholder='E-mail' name='email' />
                        <input className='mb-3 w-full h-7 text-xs font-medium p-2 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black' type="text" placeholder='Password' name='password' />
                        <input className='mb-3 w-full h-7 text-xs font-medium p-2 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black' type="text" placeholder='Confirm password' name='cpassword' />
                        <div className='flex items-center mt-4 mb-5'>
                            <input className='w-3 h-3' type="checkbox" />
                            <span className='text-xs ml-2 text-gray-400'>Accept <a className='text-secondary font-medium' href="#">Legal Agreement</a> </span>
                        </div>
                        <button className='h-7 font-semibold w-full bg-primary text-xs rounded-full' type='submit'>Sign Up</button>
                    </form>

                    <div className='text-gray-400 text-xs'>Already Have an Account? <NavLink className='text-xs font-medium text-secondary' to='/'>Signup</NavLink></div>

                </div>



            </div>



        </div>
    )
}

export default signup