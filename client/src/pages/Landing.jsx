import React, { useState } from 'react'
import Loader from '../Components/Loader'


import landing from '../assets/images/124650.jpg'
import Navbar from '../Components/Navbar'
import Login from './Login'
import Signup from './Signup'
import Footer from '../Components/Footer'
import Contact from '../Components/Contact'
import Testimonial from '../Components/Testimonial'
import About from '../Components/About'


function Landing() {
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    return (
        <div className='relative font-poppins'>
            {loading && <Loader />}
            <Navbar />
            <main className="">
                <section id="section1" style={{ backgroundImage: `url(${landing})` }} className='w-full sm:h-screen bg-center bg-cover relative z-0'>
                    <div className='w-full h-full bg-black opacity-60 absolute'>
                    </div>

                    <div className='w-full h-full flex sm:flex-row flex-col px-2 pt-20 pb-10'>
                        <div className='h-full w-full flex justify-center flex-col items-center  z-10 sm:px-6 px-2 font-poppins max-w-[500px]'>
                            <h1 className='text-white text-5xl text-center font-semibold'>Invest<br />  with  Confidence <br /><span className='text-primary'>&</span> grow with us</h1>

                            <p className='text-gray-300 text-lg mt-5 text-center'>Revolutionarizing the investment landscape & Empowering inverstors with unparallel security and transparency </p>

                            <div className='mt-4 bg-secondary rounded-full px-5 flex justify-center items-center py-2'>
                                <a className='text-white text-xs font-medium flex items-center' href="#section2"><span className='me-3'>Know more</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right">
                                        <path d="M5 12h14m-7-7l7 7-7 7" stroke="#ffffff" />
                                    </svg>
                                </a>

                            </div>


                        </div>
                        <div className=' h-full w-full flex justify-center items-center'>

                            <div id='loginSignupBox' className='flex flex-col z-10 max-w-[350px] bg-quarter rounded-3xl mt-10 w-full'>
                                <div className='w-[80%] mt-8 mx-auto border border-gray-200 rounded-3xl bg-white p-1'>
                                    <button onClick={() => setIsLogin(true)} className={`w-1/2 h-8 text-black text-sm font-semibold rounded-3xl ${isLogin ? 'bg-primary' : 'bg-white'}`}>Login</button>
                                    <button onClick={() => setIsLogin(false)} className={`w-1/2 h-8 text-black text-sm font-semibold rounded-3xl ${isLogin ? 'bg-white' : 'bg-primary'}`}>Signup</button>
                                </div>
                                <div className='sm:px-10 px-6'>

                                    {isLogin ? <Login props={{ setLoading }} /> : <Signup props={{ setLoading, setIsLogin }}/>}



                                </div>



                            </div>

                        </div>

                    </div>
                </section>
                <section id="section2" className="h-screen bg-quarter">

                    <About />


                </section>
                <section id="section3" className="h-screen bg-quarter">

                    <About />


                </section>
                <section id="section4" className="h-screen bg-tertiary flex items-center justify-center">

                    <Contact />
                </section>
                <section id="section5" className=" bg-quarter w-full flex flex-col justify-end">


                    <Testimonial />

                    <Footer />
                </section>
            </main>


        </div>


        // <div style={{ backgroundImage: `url(${landing})` }} className='w-full h-screen bg-center bg-cover relative'>

        //     <div className='w-full h-full bg-black opacity-50 absolute'>
        //     </div>
        //     <Navbar />

        // </div>
    )
}

export default Landing