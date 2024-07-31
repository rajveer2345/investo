import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Main from '../Components/Main';
import { IoPower } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { IoPersonAdd } from "react-icons/io5";
import { MdWorkHistory } from "react-icons/md";
import logo from '../assets/images/logo.svg';
import Logout from '../Components/Logout';
import { getUserData } from '../api/user';



function Dashboard() {
    const navigate = useNavigate();


    const [selected, setSelected] = useState(0);

    useEffect(()=>{

        const getUserDetails = async ()=>{

            const data = await getUserData();
            
            if(data.message === 'success'){
                console.log(data)
            } else {
                localStorage.clear();
                navigate('/');
            }

        }
        getUserDetails();

    },[])

    const changeSelected=(id)=>{
        setSelected(id);
    }



    const icons = [
        { id: 0, icon: <IoHome size={20} />, component: <Main/> },
        { id: 1, icon: <IoNotifications size={20} />, component: '<div>zero</div>' },
        { id: 2, icon: <IoPersonAdd size={20} />, component: '<div>zero</div>' },
        { id: 3, icon: <MdWorkHistory size={20} />, component: '<div>zero</div>' },
        { id: 4, icon: <IoSettings size={20} />, component: '<div>zero</div>' },
        { id: 5, icon: <IoPower size={20} />, component: <Logout setSelected={changeSelected}/> },
    ];

    return (
        <div className='w-full flex relative'>
            <div id="sidebar" className='sm:w-20 w-16 sm:min-w-20 min-w-16 h-screen bg-tertiary fixed flex justify-center py-4 '>

                <ul className='space-y-3'>
                    <li className='w-8 mb-10'><img src={logo} alt="" /></li>
                    {/* <li className=' text-black hover:bg-primary h-12 w-12 rounded-full flex justify-center items-center'><IoHome size={20}/></li> */}
                    {/* <li className=' text-white hover:bg-primary bg-black h-10 w-10 rounded-full flex justify-center items-center'><IoHome size={20} /></li>
                    <li className=' text-black hover:bg-primary h-10 w-10 rounded-full flex justify-center items-center'><IoNotifications size={20} /></li>
                    <li className=' text-black hover:bg-primary h-10 w-10 rounded-full flex justify-center items-center'><IoPersonAdd size={20} /></li>
                    <li className=' text-black hover:bg-primary h-10 w-10 rounded-full flex justify-center items-center'><MdWorkHistory size={20} /></li>
                    <li className=' text-black hover:bg-primary h-10 w-10 rounded-full flex justify-center items-center'><IoSettings size={20} /></li>
                    <li className=' text-black hover:bg-primary h-10 w-10 rounded-full flex justify-center items-center'><IoPower size={20} /></li> */}
                    {icons.map((item) => (
                        <li key={item.id} onClick={()=>setSelected(item.id)} className={`text-black h-10 w-10 rounded-full flex justify-center items-center ${selected===item.id ? 'bg-primary' : 'bg-none'}`}>{item.icon}</li>
                    ))}

                </ul>


            </div>
            <div id='margin sidebar' className='sm:w-20 w-16 sm:min-w-20 min-w-16 h-screen bg-tertiary'>


            </div>
            {icons[selected].component}
       

        </div>
    )
}

export default Dashboard