import React, { useState } from 'react'
import back from '../assets/images/back.jpg'
import { NavLink } from 'react-router-dom'
import { checkReferralId, signup } from '../api/user';


function Signup() {
    const [cPassword, setCPassword] = useState('');
    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        password: '',
        referredBy: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value,
        });
        console.log(signupData.name);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (signupData.referredBy) {
                let data = await checkReferralId(signupData.referredBy);
                console.log('response: ', data);
                if (!data.mesaage) {
                    alert('Referral ID does not exist.');
                    return;
                }
            }


            let data = await signup(signupData);
            console.log('response: ', data);

        } catch (err) {
            console.error('Error:', err);

        }

    }

    return (
        <div className='w-full h-screen bg-tertiary flex justify-center items-center gap-3 font-poppins'>

            <div className='relative bg-white h-3/4 w-1/2 max-w-[350px] min-w-[300px] hidden rounded-3xl drop-shadow-xl md:flex md:justify-center md:items-center'>
                <img className='w-64' src={back} alt="" />
                <div className='bg-white bg-opacity-30 w-full h-full absolute rounded-3xl'></div>
            </div>
            <div className='bg-white h-3/4 w-1/2 max-w-[350px] min-w-[300px] drop-shadow-xl rounded-3xl flex justify-center'>
                <div id='formbox' className='flex justify-center flex-col items-center'>
                    <h1 className='mb-6 text-lg font-medium'>Create Account</h1>



                    <form onSubmit={handleSubmit} className='md:px-12 px-4 mb-5'>
                        <input value={signupData.name} onChange={handleChange} className='mb-3 w-full h-7 text-xs font-medium p-2 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black' type="text" placeholder='Name' name='name' />
                        <input value={signupData.email} onChange={handleChange} className='mb-3 w-full h-7 text-xs font-medium p-2 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black' type="email" placeholder='E-mail' name='email' />
                        <input value={signupData.password} onChange={handleChange} className='mb-3 w-full h-7 text-xs font-medium p-2 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black' type="text" placeholder='Password' name='password' />
                        <input value={cPassword} onChange={(e) => setCPassword(e.target.value)} className='mb-3 w-full h-7 text-xs font-medium p-2 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black' type="text" placeholder='Confirm password' name='cPassword' />
                        <input value={signupData.referredBy} onChange={handleChange} className='mb-3 w-full h-7 text-xs font-medium p-2 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black' type="text" placeholder='Referral Id' name='referredBy' />
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

export default Signup