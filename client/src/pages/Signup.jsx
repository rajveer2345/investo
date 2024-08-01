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
      



                    <form onSubmit={handleSubmit} className='py-8'>
                        <input value={signupData.name} onChange={handleChange} className='mb-3 w-full h-7 text-xs font-medium p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black' type="text" placeholder='Name' name='name' />
                        <input value={signupData.email} onChange={handleChange} className='mb-3 w-full h-7 text-xs font-medium p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black' type="email" placeholder='E-mail' name='email' />
                        <input value={signupData.password} onChange={handleChange} className='mb-3 w-full h-7 text-xs font-medium p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black' type="text" placeholder='Password' name='password' />
                        <input value={cPassword} onChange={(e) => setCPassword(e.target.value)} className='mb-3 w-full h-7 text-xs font-medium p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black' type="text" placeholder='Confirm password' name='cPassword' />
                        <input value={signupData.referredBy} onChange={handleChange} className='mb-3 w-full h-7 text-xs font-medium p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black' type="text" placeholder='Referral Id' name='referredBy' />
                        <div className='flex items-center mt-4 mb-5'>
                            <input className='w-3 h-3' type="checkbox" />
                            <span className='text-xs ml-2 text-gray-400'>Accept <a className='text-secondary font-medium' href="#">Legal Agreement</a> </span>
                        </div>
                        <button className='h-8 font-semibold w-full bg-secondary text-xs rounded-full text-white' type='submit'>Sign Up</button>
                    </form>

                  
    )
}

export default Signup