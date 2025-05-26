import React from 'react'
import Navbar from '../../../Components/Navigation/Navbar'

export default function Profile() {
    return (
        <>
            <Navbar>
                <div className="relative mt-30">
                    <hr className="border-black-300" />
                    <span className="absolute left-1/8 -translate-x-1/4 -top-5 bg-white  rounded-lg px-4 text-2xl font-semibold text-black-700">
                        Account Settings
                    </span>
                </div>
                <div className="flex justify-center items-start min-h-screen bg-white px-2 sm:px-0 mt-20">
                    <div className="border-2 border-blue-900 rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-3xl bg-white">

                        <div className="relative flex items-center mb-10 mt-10">
                            <span className="bg-white rounded-lg px-4 text-2xl sm:text-2xl font-semibold text-black-700 whitespace-nowrap z-10">
                                Profile Information
                            </span>
                            <hr className="flex-1 border-black-300 ml-4" />
                        </div>

                        <div className="bg-white flex flex-col-reverse border-b-none justify-center md:flex-row shadow-lg rounded-lg overflow-hidden p-4 sm:p-8 md:p-12 min-w-full md:min-w-[700px] max-w-3xl min-h-[400px] md:min-h-[600px] w-full">
                            <form className="mt-4 md:mt-0 space-y-8 text-black-700 p-4 sm:p-4 flex-1">
                                
                                <label className="block">
                                    <span className="text-black-700 font-bold">💼 Occupation</span>
                                    <input type="text" className="mt-1 block w-full border rounded-lg p-2" defaultValue="Agricultural Engineer" />
                                </label>
                                
                                <label className="block">
                                    <span className="text-black-700 font-bold">📍 Address</span>
                                    <input type="text" className="mt-1 block w-full border rounded-lg p-2" defaultValue="Amaia Scapes Gentri Cavite" />
                                </label>
                                <label className="block">
                                    <span className="text-black-700 font-bold">📞 Cellphone</span>
                                    <input type="text" className="mt-1 block w-full border rounded-lg p-2" defaultValue="09050540801" />
                                </label>
                                <label className="block">
                                    <span className="text-black-700 font-bold">🏢 Institution</span>
                                    <input type="text" className="mt-1 block w-full border rounded-lg p-2" defaultValue="Fasasxzc" />
                                </label>
                                <label className="block">
                                    <span className="text-black-700 font-bold">🌾 Commodities</span>
                                    <input type="text" className="mt-1 block w-full border rounded-lg p-2" defaultValue="Farmer" />
                                </label>
                                
                            </form>

                            <div className="flex flex-col items-center space-y-4 mb-6 md:mb-0 p-2 sm:p-4 flex-1 ">
                                {/* Profile Image */}
                                <img
                                    src="https://via.placeholder.com/100"
                                    alt="Profile"
                                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-blue-800  mb-4 shadow-md "
                                />
                                {/* Full Name, Sex, Position under profile icon */}
                                <div className="flex flex-col items-center space-y-2 w-full">
                                    <span className="border-2 border-blue-800 rounded-lg px-4 py-1 text-lg font-semibold text-black-700 w-fit">
                                        Rhenzy Cruzat
                                    </span>
                                    <span className="text-black-600 text-base">Male</span>
                                    <span className="text-black-600 text-base">Field Supervisor</span>
                                </div>
                                <div className="text-center">
                                    <div className="">
                                        <button className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-500 transition text-sm sm:text-base border-2 border-blue-800">
                                            Edit Profile
                                            {/* Pencil Icon (SVG) */}
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H7v-3a2 2 0 01.586-1.414z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative flex items-center mb-10 mt-10">
                            <span className="bg-white rounded-lg px-4 text-2xl sm:text-2xl font-semibold text-black-700 whitespace-nowrap z-10">
                                Contacts Information
                            </span>
                            <hr className="flex-1 border-black-300 ml-4" />
                        </div>

                        <form className="bg-white flex border-b-none justify-center items-center md:flex-row shadow-lg rounded-lg overflow-hidden p-4 sm:p-8 md:p-12 min-w-full md:min-w-[700px] max-w-3xl min-h-[400px] md:min-h-[600px] w-full">
                            <div className="mt-4 md:mt-0 space-y-8 text-black-700 p-4 sm:p-4 flex-1 ">
                                <label className="block">
                                    <span className="text-black-700">👤 Full Name</span>
                                    <input type="text" className="mt-1 block w-full border rounded-lg p-2" defaultValue="John Doe" />
                                </label>
                                <label className="block">
                                    <span className="text-black-700">💼 Occupation</span>
                                    <input type="text" className="mt-1 block w-full border rounded-lg p-2" defaultValue="Agricultural Engineer" />
                                </label>
                                <label className="block">
                                    <span className="text-black-700">🏅 Position</span>
                                    <input type="text" className="mt-1 block w-full border rounded-lg p-2" defaultValue="Field Supervisor" />
                                </label>
                                <label className="block">
                                    <span className="text-black-700">📍 Address</span>
                                    <input type="text" className="mt-1 block w-full border rounded-lg p-2" defaultValue="Amaia Scapes Gentri Cavite" />
                                </label>
                                <label className="block">
                                    <span className="text-black-700">📞 Cellphone</span>
                                    <input type="text" className="mt-1 block w-full border rounded-lg p-2" defaultValue="09050540801" />
                                </label>
                                <label className="block">
                                    <span className="text-black-700">🏢 Institution</span>
                                    <input type="text" className="mt-1 block w-full border rounded-lg p-2" defaultValue="Fasasxzc" />
                                </label>
                                <label className="block">
                                    <span className="text-black-700">🌾 Commodities</span>
                                    <input type="text" className="mt-1 block w-full border rounded-lg p-2" defaultValue="Farmer" />
                                </label>
                                <label className="block">
                                    <span className="text-black-700">⚡ Sex</span>
                                    <input type="text" className="mt-1 block w-full border rounded-lg p-2" defaultValue="Male" />
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </Navbar>
        </>
    );
}
