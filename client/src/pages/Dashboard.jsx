import React, { useEffect, useState } from 'react'
import Loader from '../Components/Loader';
import { useNavigate } from 'react-router-dom';
import Main from '../Components/Main';
import MainAdmin from '../Components/MainAdmin';
import { IoPower } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { IoPersonAdd } from "react-icons/io5";
import { MdWorkHistory } from "react-icons/md";
import logo from '../assets/images/logo.svg';
import Logout from '../Components/Logout';
import UserEdit from '../Components/UserEdit';
import TransactionHistory from '../Components/TransactionHistory';
import { getUserData, getReferralData } from '../api/user';
import { getAllNews } from '../api/news';
import { FaHistory } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import News from '../Components/News';
import toast from "react-hot-toast";


function Dashboard() {

    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({})
    const navigate = useNavigate();
    const [selected, setSelected] = useState(0);
    const changeSelected=(id)=>{
        setSelected(id);
    }


    
    const icons = [
        { id: 0, icon: <IoHome size={20} />, component: <Main userData={userData} /> },
        //{ id: 1, icon: <IoNotifications size={20} />, component: '<div>zero</div>' },
        //{ id: 2, icon: <IoPersonAdd size={20} />, component: <UserEdit/> },
        { id: 1, icon: <MdWorkHistory size={20} />, component: <TransactionHistory role={userData.role}/> },
        //{ id: 2, icon: <IoSettings size={20} />, component: '<div>zero</div>' },
        { id: 2, icon: <IoPower size={20} />, component: <Logout props={{changeSelected, loading, setLoading}}/> },
    ];
    
    
    
    const iconsAdmin = [
        { id: 0, icon: <IoHome size={20} />, component: <MainAdmin userData={userData} /> },

        { id: 1, icon: <FaMoneyBillTransfer size={20} />, component: <UserEdit adminId={userData._id}/> },
        { id: 2, icon: <MdWorkHistory size={20} />, component: <TransactionHistory role={userData.role}/> },
        { id: 3, icon: <IoNotifications size={20} />, component: <News role={userData.role}/> },
        { id: 4, icon: <IoPower size={20} />, component: <Logout props={{changeSelected, loading, setLoading}}/> },
    ];

    useEffect(()=>{

        const getUserDetails = async ()=>{

            const data = await getUserData();
            
            if(data.message === 'success'){
                setUserData(data.data)
                console.log(userData, "fghjk")                
            } else {
                localStorage.clear();
                navigate('/');
            }

        }



        getUserDetails();
   

    },[])

  
    return (
        <div className='w-full flex relative'>
            {loading && <Loader/>}
            <div id="sidebar" className='sm:w-20 w-16 sm:min-w-20 min-w-16 h-screen bg-tertiary fixed flex justify-center py-4 '>

                <ul className='space-y-3'>
                    <li className='w-8 mb-10'><img src={logo} alt="" /></li>
                       
                    {(userData?.role === "admin"? (iconsAdmin) : (icons)).map((item) => (
                        <li key={item.id} onClick={()=>setSelected(item.id)} className={`text-black h-10 w-10 rounded-full flex justify-center items-center ${selected===item.id ? 'bg-primary' : 'bg-none'}`}>{item.icon}</li>
                    ))}

                </ul>

            </div>
            <div id='margin sidebar' className='sm:w-20 w-16 sm:min-w-20 min-w-16 h-screen bg-tertiary'>

            </div>
            {(userData?.role === "admin"? (iconsAdmin) : (icons))[selected].component}
       
        </div>
    )
}

export default Dashboard