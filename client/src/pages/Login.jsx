import React, {useState} from 'react'
import back from '../assets/images/back.jpg'
import { useNavigate, NavLink } from 'react-router-dom'
import { login } from '../api/user';
import Loader from '../Components/Loader';

function Login() {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
     
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            let data = await login(loginData);
            if(data.message === 'success'){
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            }else{
                console.log(data.message)
                alert(data.message)
            }
            
        } catch (err) {
            console.error('Error:', err);

        }

        setLoading(false);
    }



    return (
        <div className='relative w-full h-screen bg-tertiary flex justify-center items-center gap-3 font-poppins'>

            {loading && <Loader/>}

            <div className='relative bg-white h-3/4 w-1/2 max-w-[350px] min-w-[300px] hidden rounded-3xl drop-shadow-xl md:flex md:justify-center md:items-center'>
                <img className='w-64' src={back} alt="" />
                <div className='bg-white bg-opacity-30 w-full h-full absolute rounded-3xl'></div>
            </div>
            <div className='bg-white h-3/4 w-1/2 max-w-[350px] min-w-[300px] drop-shadow-xl rounded-3xl flex justify-center'>
                <div id='formbox' className='flex justify-center flex-col items-center'>
                    <h1 className='mb-6 text-lg font-medium'>Login</h1>



                    <form onSubmit={handleSubmit} className='md:px-12 px-4 mb-10'>

                        <input onChange={handleChange} value={loginData.email} className='mb-3 w-full h-7 text-xs font-medium p-2 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black' type="email" placeholder='E-mail' name='email' />
                        <input onChange={handleChange} value={loginData.password} className='mb-3 w-full h-7 text-xs font-medium p-2 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black' type="text" placeholder='Password' name='password' />

                        <div className='flex items-center mt-4 mb-5'>
                            <input className='w-3 h-3' type="checkbox" />
                            <span className='text-xs ml-2 text-gray-400'>Accept <a className='text-secondary font-medium' href="#">Legal Agreement</a> </span>
                        </div>
                        <button className='h-7 font-semibold w-full bg-primary text-xs rounded-full' type='submit'>Sign Up</button>
                    </form>

                    <div className='text-gray-400 text-xs'>Don't Have an Account? <NavLink className='text-xs font-medium text-secondary' to='/signup'>Signup</NavLink></div>

                </div>



            </div>




        </div>
    )
}

export default Login