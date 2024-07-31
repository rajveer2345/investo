import React from 'react'

function Loader() {
    return (
        <div className='h-full w-full flex justify-center items-center bg-black bg-opacity-50 absolute z-50'>
            <div className="my-4 mx-auto border-t-4 border-primary border-solid w-12 h-12 border-r-transparent border-4 rounded-full animate-spin">

            </div>
        </div>
    )
}

export default Loader