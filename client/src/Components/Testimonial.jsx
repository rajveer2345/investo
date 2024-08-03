import React from 'react'
import user1 from '../assets/images/user1.png'
import user2 from '../assets/images/user2.jpg'
import user3 from '../assets/images/user3.jpg'
import user4 from '../assets/images/user4.png'
function Testimonial() {
    return (

        <div className='mt-20 mb-12'>
            <h1 className='text-3xl text-center font-normal'>Testimonials</h1>
            <div className='w-full flex justify-center items-end gap-5 font-poppins flex-wrap pt-16'>

                <div className='relative bg-white flex flex-col justify-center items-center gap-3 px-3 max-w-[180px] shadow-md h-[200px] rounded-xl'>
                    <div className='bg-primary h-7 w-7 absolute top-[-10px] left-4 rounded-md flex justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24">
                            <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" fill="#63AE9E" />
                        </svg>

                    </div>
                    <img className='h-8 rounded-full ' src={user1} alt="" />
                    <p className=' text-gray-400 font-medium text-[10px] text-center'>The investment platform is straightforward and secure. My portfolio has grown steadily, and the support team is always responsive. Highly recommend!
                    </p>
                    <p className='text-[10px] text-center font-semibold text-black'>Michael Brown</p>

                </div>
                <div className='relative bg-white flex flex-col justify-center items-center gap-3 px-3 max-w-[180px] shadow-md h-[200px] rounded-xl'>
                    <div className='bg-primary h-7 w-7 absolute top-[-10px] left-4 rounded-md flex justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24">
                            <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" fill="#63AE9E" />
                        </svg>

                    </div>
                    <img className='h-8 rounded-full ' src={user2} alt="" />
                    <p className=' text-gray-400 font-medium text-[10px] text-center'>Great experience with this investment service! User-friendly interface and excellent returns. It's made managing my investments hassle-free
                    </p>
                    <p className='text-[10px] text-center font-semibold text-black'>Rajat Singhal</p>

                </div>
                <div className='relative bg-white flex flex-col justify-center items-center gap-3 px-3 max-w-[180px] shadow-md h-[200px] rounded-xl'>
                    <div className='bg-primary h-7 w-7 absolute top-[-10px] left-4 rounded-md flex justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24">
                            <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" fill="#63AE9E" />
                        </svg>

                    </div>
                    <img className='h-8 rounded-full ' src={user3} alt="" />
                    <p className=' text-gray-400 font-medium text-[10px] text-center'>Fantastic investment experience! The tools and features provided are incredibly useful, and the performance of my investments has been outstanding.
                    </p>
                    <p className='text-[10px] text-center font-semibold text-black'>David Lee</p>

                </div>
                <div className='relative bg-white flex flex-col justify-center items-center gap-3 px-3 max-w-[180px] shadow-md h-[200px] rounded-xl'>
                    <div className='bg-primary h-7 w-7 absolute top-[-10px] left-4 rounded-md flex justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24">
                            <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" fill="#63AE9E" />
                        </svg>

                    </div>
                    <img className='h-8 rounded-full ' src={user4} alt="" />
                    <p className=' text-gray-400 font-medium text-[10px] text-center'>A reliable platform with impressive results. The referral program is fantastic, and the customer service is top-notch. I’m very satisfied.
                    </p>
                    <p className='text-[10px] text-center font-semibold text-black'>Emily Johnson</p>

                </div>





            </div>
        </div>


    )
}

export default Testimonial