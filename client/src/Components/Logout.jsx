import React from 'react'
import { useNavigate } from 'react-router-dom';

function Logout({ props }) {
    const navigate = useNavigate();

    const handleLogout = (action) => {
        props.setLoading(true);

        if (action === 'logout') {
            localStorage.clear();
            navigate('/');
        } else {
            props.changeSelected(0);
        }
        props.setLoading(false);

    }

    return (
        <div className='h-screen w-full flex justify-center items-center  font-poppins'>

            <div className='bg-tertiary flex justify-center items-center gap-4 px-6 py-5 rounded-3xl min-h-28 shadow-lg'>


                <button onClick={() => handleLogout('logout')} className='bg-secondary text-xs font-medium h-10 w-28 rounded-full hover:bg-primary'>
                    Logout
                </button>
                <button onClick={() => handleLogout('cancel')} className='bg-secondary text-xs font-medium h-10 w-28 rounded-full hover:bg-primary'>
                    Cancel
                </button>

            </div>
        </div>
    )
}

export default Logout