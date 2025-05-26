import Navbar from '../../../Components/Navigation/Navbar'
import { Link } from 'react-router-dom';

export default function Edit_prof() {
    return (
        <Navbar>
            <div className="relative mt-30">
                <hr className="border-black-300" />
                <span className="absolute left-1/8 -translate-x-1/4 -top-5 bg-white rounded-lg px-4 text-2xl font-semibold text-black-700">
                    Account Settings
                </span>
            </div>
            <div className="flex flex-col items-center min-h-screen bg-white px-2 sm:px-0 mt-20 gap-10">
                {/* Profile Card */}
                <div className="border-2 border-blue-900 rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-5xl bg-white">
                    <div className="flex items-center mb-10 mt-10">
                        <span className="bg-white rounded-lg px-4 text-2xl sm:text-2xl font-semibold text-black-700 whitespace-nowrap z-10">
                            Profile Information
                        </span>
                        <hr className="flex-1 border-black-300 ml-4" />
                    </div>
                    <div className="bg-white flex flex-col-reverse md:flex-row border-b-none justify-center shadow-lg rounded-lg overflow-hidden p-4 sm:p-8 md:p-12 w-full max-w-5xl min-h-[400px] md:min-h-[600px]">
                        <form className="mt-4 md:mt-0 space-y-8 text-black-700 p-4 sm:p-4 w-full md:w-1/2">
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
                        <div className="flex flex-col items-center space-y-4 mb-6 md:mb-0 p-2 sm:p-4 w-full md:w-1/2">
                            <img
                                src="https://via.placeholder.com/100"
                                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-blue-800  mb-4 shadow-md "
                            />
                            <div className="flex flex-col items-center space-y-2 w-full">
                                <span className="border-2 border-blue-800 rounded-lg px-4 py-1 text-lg font-semibold text-black-700 w-fit">
                                    Rhenzy Cruzat
                                </span>
                                <span className="text-black-600 text-base">Male</span>
                                <span className="text-black-600 text-base">Field Supervisor</span>
                            </div>
                            <div className="text-center">
                                <div className="">
                                    <Link
                                        to="/profiles"
                                        className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-green-800 text-white rounded-lg hover:bg-green-500 transition text-sm sm:text-base border-2 border-blue-800"
                                    >
                                        Save Profile
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Contacts Information Card */}
                <div className="border-2 border-blue-900 rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-5xl bg-white">
                    <div className="flex items-center mb-4">
                        <span className="bg-white rounded-lg px-4 text-2xl sm:text-2xl font-semibold text-black-700 whitespace-nowrap z-10">
                            Contacts Information
                        </span>
                        <hr className="flex-1 border-black-300 ml-4" />
                    </div>
                    <div className="flex flex-col w-full mt-4">
                        <div className="flex flex-row justify-between items-center py-2 border-b border-gray-200">
                            <span className="font-semibold text-black-700">Email</span>
                            <span className="text-black-600">rhenzy.cruzat@email.com</span>
                        </div>
                        <div className="flex flex-row justify-between items-center py-2 border-b border-gray-200">
                            <span className="font-semibold text-black-700">Alternate Phone</span>
                            <span className="text-black-600">09171234567</span>
                        </div>
                        <div className="flex flex-row justify-between items-center py-2">
                            <span className="font-semibold text-black-700">Facebook</span>
                            <span className="text-black-600">fb.com/rhenzy.cruzat</span>
                        </div>
                    </div>
                </div>
            </div>
        </Navbar>
    );
}
