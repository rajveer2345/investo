import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom'
import { checkReferralId, signup } from '../api/user';



function Signup({ props }) {
    const [cPassword, setCPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        password: '',
        referredBy: '',

    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        cPassword: '',
        referredBy: '',
        acceptTerms: '',
    });

    const validate = () => {
        const newErrors = {};
        if (!signupData.name) {
            newErrors.name = 'Name is required';
        }
        if (!signupData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!signupData.password) {
            newErrors.password = 'Password is required';
        } else if (signupData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (cPassword !== signupData.password) {
            newErrors.cPassword = 'Passwords do not match';
        }
        if (signupData.referredBy < 24 && signupData.referredBy !== '') {
            newErrors.referredBy = 'Invalid referal Id';
        }
        if (!acceptTerms) {
            newErrors.acceptTerms = 'Please accept legal agrement';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value,
        });
        console.log(signupData.name);
    };

    const handleSubmit = async (e) => {
        props.setLoading(true)
        e.preventDefault();
        if (!validate()) {
            props.setLoading(false)
            return
        }
        try {
            if (signupData.referredBy) {
                let data = await checkReferralId(signupData.referredBy);
                console.log('response: ', data);
                if (!data.mesaage) {
                    toast.error('Referral ID does not exist.')
                    props.setLoading(false)
                    return;
                }
            }
            let data = await signup(signupData);
            if (data.message === 'exist'){
               
                props.setLoading(false)
                toast.error('User already exists. Please login.')
                
            }else if(data.message === 'success'){
                toast.success('Account created successfully. Please verify your email before logging in.')
                props.setIsLogin(true); 
            }
                
        } catch (err) {
            toast.error('Something went wrong. Please try again later.')
            console.error('Error:', err);
        }
        props.setLoading(false)

    }

    return (

        <form onSubmit={handleSubmit} className='py-8'>
            <div className='mb-3'>
                <input value={signupData.name} onChange={handleChange} className=' w-full h-7 text-xs font-medium p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black' type="text" placeholder='Name' name='name' />
                {errors.name && <p className="text-red-500 text-[10px] font-normal">{errors.name}</p>}
            </div>

            <div className='mb-3'>
                <input value={signupData.email} onChange={handleChange} className=' w-full h-7 text-xs font-medium p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black' type="email" placeholder='E-mail' name='email' />
                {errors.email && <p className="text-red-500 text-[10px] font-normal">{errors.email}</p>}
            </div>

            <div className='mb-3'>
                <input value={signupData.password} onChange={handleChange} className=' w-full h-7 text-xs font-medium p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black' type="text" placeholder='Password' name='password' />
                {errors.password && <p className="text-red-500 text-[10px] font-normal">{errors.password}</p>}
            </div>
            <div className='mb-3'>
                <input value={cPassword} onChange={(e) => setCPassword(e.target.value)} className='w-full h-7 text-xs font-medium p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black' type="text" placeholder='Confirm password' name='cPassword' />
                {errors.cPassword && <p className="text-red-500 text-[10px] font-normal">{errors.cPassword}</p>}

            </div>
            <div className='mb-3'>
                <input value={signupData.referredBy} onChange={handleChange} className=' w-full h-7 text-xs font-medium p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black' type="text" placeholder='Referral Id' name='referredBy' />
                {errors.referredBy && <p className="text-red-500 text-[10px] font-normal">{errors.referredBy}</p>}
            </div>
            <div className='mt-4 mb-5'>
                <div className='flex items-center'>
                    <input onChange={(e) => setAcceptTerms(e.target.value)} className='w-3 h-3' type="checkbox" name='acceptTerms' />
                    <span className='text-xs ml-2 text-gray-400'>Accept <a className='text-secondary font-medium' href="#">Legal Agreement</a> </span>
                </div>
                {errors.acceptTerms && <p className="text-red-500 text-[10px] font-normal">{errors.acceptTerms}</p>}
            </div>


            <button className='h-8 font-semibold w-full bg-secondary text-xs rounded-full text-white' type='submit'>Sign Up</button>
        </form>


    )
}

export default Signup