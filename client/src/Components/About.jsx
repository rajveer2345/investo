import React from 'react'
import about from '../assets/images/about.jpg'

function About() {
  return (

    <div className='w-full h-full flex flex-col justify-end items-center pb-20 font-poppins'>
         <h1 className="text-3xl font-normal mb-6">About</h1>

          <div className='w-full h-[350px] overflow-hidden flex flex-col sm:flex-row'> 
            <div className='w-full h-full flex justify-center items-center'>
               <div className='flex flex-col  justify-center items-center p-10'>
                <p className='sm:text-sm md:text-base font-normal text-center'>
                At <span className=''>A GOLD ALLIANCE</span>, we are dedicated to revolutionizing the investment landscape through our innovative multi-level network approach. Our mission is to empower investors with unparalleled security and transparency, leveraging a robust system designed to maximize growth while minimizing risk. By seamlessly integrating advanced technology with our extensive industry expertise, we ensure that every investment is meticulously managed and monitored.

                </p>
               </div>

            </div>
            <div  className='w-full h-full  sm:flex hidden justify-center items-center'>

                <div className='rounded-3xl overflow-hidden w-[300px] h-full'> <img className='w-[300px]' src={about} alt="" /></div>

               


            </div>
          </div>

    </div>

  )
}

export default About