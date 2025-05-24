import React from 'react'
import { Link } from 'react-router-dom'

// COMPONENT
import cover from '../../../Services/Authentication/Assets/Cover.jpg'
import logo from '../../../Services/Authentication/Assets/Logo.png'

export default function Reg_2() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 py-8 overflow-y-auto">
             <img src={cover} alt="Background" className="absolute inset-0 object-fit w-full h-full opacity-60 blur-sm  " />
            <div className="w-full flex flex-col items-center justify-center mt-180 lg:mt-130 md:mt-130 mb-20">
                <div className="flex items-center justify-center mb-10 text-center flex-col z-index-999 relative">
                    <img src={logo} alt="" className="rounded-full mb-6 h-20 w-20" />
                    <h1 className="px-6 items-center justify-center font-bold text-2xl text-center">
                        FITS Tanza - Municipal Agriculture Office
                    </h1>
                </div>
                <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-lg transform hover:-translate-y-2 transition duration-300 ease-in-out border border-gray-300 backdrop-blur-sm backdrop-brightness-95 shadow-black bg-gray-500 bg-opacity-70 backdrop-blur-md ">
                    <h2 className="text-2xl font-bold text-center text-gray-800">Register Now</h2>
                    <form className="space-y-4">
                        <div>
                            <hr className="my-4 border-black-300" />
                            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
                                <label htmlFor="clientProfile" className="block text-sm font-medium text-black-700 ml-0 sm:ml-10 w-full sm:w-40 mb-2 sm:mb-0">
                                    Client Profile
                                </label>
                                <select
                                    id="clientProfile"
                                    name="clientProfile"
                                    required
                                    className="flex-1 px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-black-300 mr-0 sm:mr-5 min-w-0 w-full sm:w-auto"
                                >
                                    <option value="">Select profile</option>
                                    <option value="fishfolk">Fishfolk</option>
                                    <option value="rural-based-org">Rural Based Org</option>
                                    <option value="student">Student</option>
                                    <option value="agri-fisheries-tech">Agricultural/Fisheries Technician</option>
                                    <option value="youth">Youth</option>
                                    <option value="women">Women</option>
                                    <option value="govt-employee">Gov't Employee</option>
                                    <option value="pwd">PWD</option>
                                    <option value="indigenous-people">Indigenous People</option>
                                </select>
                            </div>
                        </div>
                        <div className="relative my-10">
                            <hr className="border-black-300" />
                            <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white  rounded-lg px-4 text-lg font-semibold text-gray-700">
                                Contact information
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center mb-4 ml-0 sm:ml-10">
                            <label htmlFor="address" className="block text-sm font-medium text-black-700 w-full sm:w-40 mb-2 sm:mb-0">
                                Address :
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                required
                                className="flex-1 px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-black-300 mr-0 sm:mr-5 min-w-0 w-full sm:w-auto"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
                            <label htmlFor="telephone" className="block text-sm font-medium text-black-700 ml-0 sm:ml-10 w-full sm:w-40 mb-2 sm:mb-0">
                                Telephone No :
                            </label>
                            <input
                                type="tel"
                                id="telephone"
                                name="telephone"
                                className="flex-1 px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 mr-0 sm:mr-5 border-black-300 min-w-0 w-full sm:w-auto"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
                            <label htmlFor="cellphone" className="block text-sm font-medium text-black-700 ml-0 sm:ml-10 w-full sm:w-40 mb-2 sm:mb-0">
                                Cellphone No :
                            </label>
                            <input
                                type="tel"
                                id="cellphone"
                                name="cellphone"
                                required
                                className="flex-1 px-4 py-2 border rounded-md focus:ring-blue-500 mr-0 sm:mr-5 focus:border-blue-500 border-black-300 min-w-0 w-full sm:w-auto"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
                            <label htmlFor="occupation" className="block text-sm font-medium text-black-700 ml-0 sm:ml-10 w-full sm:w-40 mb-2 sm:mb-0">
                                Occupation :
                            </label>
                            <input
                                type="text"
                                id="occupation"
                                name="occupation"
                                className="flex-1 px-4 py-2 border rounded-md focus:ring-blue-500 mr-0 sm:mr-5 focus:border-blue-500 border-black-300 min-w-0 w-full sm:w-auto"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
                            <label htmlFor="position" className="block text-sm font-medium text-black-700 ml-0 sm:ml-10 w-full sm:w-40 mb-2 sm:mb-0">
                                Position :
                            </label>
                            <input
                                type="text"
                                id="position"
                                name="position"
                                className="flex-1 px-4 py-2 border rounded-md focus:ring-blue-500 mr-0 sm:mr-5 focus:border-blue-500 border-black-300 min-w-0 w-full sm:w-auto"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
                            <label htmlFor="institution" className="block text-sm font-medium text-black-700 ml-0 sm:ml-10 w-full sm:w-40 mb-2 sm:mb-0">
                                Institution :
                            </label>
                            <input
                                type="text"
                                id="institution"
                                name="institution"
                                className="flex-1 px-4 py-2 border rounded-md focus:ring-blue-500 mr-0 sm:mr-5 focus:border-blue-500 border-black-300 min-w-0 w-full sm:w-auto"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
                            <label htmlFor="email" className="block text-sm font-medium ml-0 sm:ml-10 text-black-700 w-full sm:w-40 mb-2 sm:mb-0">
                                Email Address :
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="flex-1 px-4 py-2 border rounded-md focus:ring-blue-500 mr-0 sm:mr-5 focus:border-blue-500 border-black-300 min-w-0 w-full sm:w-auto"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 mt-5 focus:ring-4 focus:ring-blue-500"
                        >
                            <Link to="/register/3">
                                Next
                            </Link>
                        </button>
                    </form>
                    <p className="text-sm text-center text-gray-600"></p>
                </div>
            </div>
        </div>
    )
}
