import React from 'react'
import { FaStar } from "react-icons/fa";

function NewsBlock() {
  return (
    <div className='flex bg-quarter rounded-lg p-2'>
        <div className='flex items-start p-2'>
            <div className='text-white bg-secondary p-2 rounded-full'> <FaStar size={30}/></div>
        </div>
        <div className='flex flex-col gap-2'>
            <input type="text" name=""  value={"dfghj uigi  g ig ui iug i gui giugu i"} />
            <textarea className='w-full' name="" id="">
                bkbjkbjbjbkjbkj
            </textarea>

        </div>
    </div>
  )
}

export default NewsBlock