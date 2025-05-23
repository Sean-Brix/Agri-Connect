import React from 'react'
import Navbar from '../../../Components/Navigation/Navbar'



export default function Landing() {
return (
    <Navbar>
        <main className='mt-15'>
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white mt-10">
                <h1>Welcome to the Landing Page</h1>
                <p>This is the landing page of our application.</p>
                <p>Here you can find information about our services and features.</p>
                <p>Feel free to explore and learn more about what we offer.</p>
                <p>If you have any questions, don't hesitate to reach out!</p>
                <p>Thank you for visiting our landing page.</p>
                <p>We hope you enjoy your experience!</p>
                <p>Have a great day!</p>
            </div>
        </main>
    </Navbar>
)
}
