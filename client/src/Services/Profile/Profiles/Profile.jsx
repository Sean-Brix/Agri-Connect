import React from 'react'
import Navbar from '../../../Components/Navigation/Navbar'

export default function Profile() {
    return (
        <>
        <Navbar/>
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
                <div className="flex items-center space-x-4">
                    {/* Profile Image */}
                    <img
                        src="https://via.placeholder.com/100"
                        alt="Profile"
                        className="w-24 h-24 rounded-full border"
                    />
                    <div>
                        <h2 className="text-xl font-semibold">Rhenzy H. Cruzat</h2>
                        <p className="text-sm text-gray-500">Front-End Developer</p>
                        <p className="text-sm text-gray-500">Position: Captain</p>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="mt-4 space-y-2 text-gray-700">
                    <p>📍 Address: Amaia Scapes Gentri Cavite</p>
                    <p>📞 Cellphone: 09050540801</p>
                    <p>🏢 Institution: Fasasxzc</p>
                    <p>🌾 Commodities: Farmer</p>
                    <p>⚡ Sex: Male</p>
                </div>

                {/* Edit Profile Button */}
                <div className="mt-4 text-center">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                        Edit Profile
                    </button>
                </div>
            </div>
       </>
    );
}

  
