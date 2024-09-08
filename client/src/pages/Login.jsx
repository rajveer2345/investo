import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, NavLink } from 'react-router-dom'
import { login } from '../api/user';

function Login({ props }) {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',

    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',

    });

    const validate = () => {
        const newErrors = {};
        if (!loginData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!loginData.password) {
            newErrors.password = 'Password is required';
        } else if (loginData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {

        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });

    };

    const handleSubmit = async (e) => {
        props.setLoading(true);
        e.preventDefault();
        if (!validate()) {
            props.setLoading(false)
            return
        }
        try {
            let data = await login(loginData);
            if (data.message === 'success') {
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            } else {
                console.log(data.message)
                toast.error(data.message)
            }

        } catch (err) {
            toast.error('Something went wrong. Please try again later.')
            console.error('Error:', err);

        }

        props.setLoading(false);
    }



    return (

        <form onSubmit={handleSubmit} className='py-10'>

            <div className='mb-3'>
                <input onChange={handleChange} value={loginData.email} className=' w-full h-7 text-xs font-medium p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black' type="email" placeholder='E-mail' name='email' />
                {errors.email && <p className="text-red-500 text-[10px] font-normal">{errors.email}</p>}
            </div>

            <div className='mb-3'>
                <input onChange={handleChange} value={loginData.password} className=' w-full h-7 text-xs font-medium p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black' type="password" placeholder='Password' name='password' />
                {errors.password && <p className="text-red-500 text-[10px] font-normal">{errors.password}</p>}
            </div>


            
            <button className='mt-4 h-8 font-semibold w-full bg-secondary text-xs text-white rounded-full hover:bg-primary hover:text-black' type='submit'>Login</button>
        </form>





        //</div>
    )
}

export default Login