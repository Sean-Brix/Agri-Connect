import React from 'react'
import Navbar from '../../../Components/Navigation/Navbar'
import cover from '../../../Services/Authentication/Assets/Cover.jpg'


export default function Landing() {
return (
    <Navbar>
        <main className='mt-15'>
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white mt-10">
               <div className='flex flex-col items-center justify-center mb-10 text-center z-10 relative'>
                    <img src={cover} alt=''/>
               </div>
                
            </div>
        </main>
    </Navbar>
)
}
