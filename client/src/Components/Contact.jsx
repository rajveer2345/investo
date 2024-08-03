import React, { useState } from 'react';
import contact from '../assets/images/contact.jpg'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.subject) newErrors.subject = 'Subject is required';
        if (!formData.message) newErrors.message = 'Message is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form Data:', formData);
            // Add form submission logic here (e.g., API call)
        }
    };

    return (

        <div className='w-full h-full flex flex-col pt-20'>
           
            <h1 className='text-3xl mb-8 text-center mt-3 font-normal'>Contact</h1>
           

            

            <div className='flex sm:flex-row flex-col sm:px-10 px-2 h-[350px] overflow-hidden w-full'>

                <div className='w-full h-full flex justify-center'>

                    <form onSubmit={handleSubmit} className="space-y-5 bg-quarter py-8 px-5 rounded-3xl font-poppins w-[300px] flex flex-col justify-center">
                        <input onChange={handleChange} value={formData.name} className=' w-full h-7 text-xs font-medium p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black' type="email" placeholder='Name' name='name' />
                        <input onChange={handleChange} value={formData.email} className=' w-full h-7 text-xs font-medium p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black' type="text" placeholder='E-mail' name='email' />
                        <input onChange={handleChange} value={formData.subject} className=' w-full h-7 text-xs font-medium p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black' type="text" placeholder='Subject' name='subject' />
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            className="w-full  text-xs font-normal p-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-black h-14 max-h-14 min-h-14"
                        />
                        <button className='h-8 font-semibold w-full bg-secondary text-xs text-white rounded-full hover:bg-primary hover:text-black' type='submit'>Submit</button>
                    </form>

                </div>

                <div className='w-full h-full justify-center items-center sm:flex hidden'>
                    <div className='w-[300px] h-[350px] rounded-3xl overflow-hidden'>
                        <img className='w-[300px]' src={contact} alt="" />
                    </div>


                </div>
            </div>

        </div>






    );
};

export default Contact;
