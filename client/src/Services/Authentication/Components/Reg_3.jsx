import React from 'react'

export default function Reg_1() {
return (
    <div className="fixed inset-0 flex items-center justify-center min-h-screen bg-gray-100 overflow-y-auto">
        <div className="w-full flex flex-col items-center justify-center mt-60 mb-20">
            <div className="flex items-center justify-center mb-10 text-center flex-col">
                <img src="SRC/logo.png" alt="" className="rounded-full mb-6 h-20 w-20" />
                <h1 className="px-6 items-center justify-center font-bold text-2xl text-center">
                    FITS Tanza - Municipal Agriculture Office
                </h1>
            </div>
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg transform hover:-translate-y-2 transition duration-300 ease-in-out border border-gray-300 backdrop-blur-sm backdrop-brightness-95 shadow-black bg-gray-500 bg-opacity-70 backdrop-blur-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Register Now</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300 "
                        />
                    </div>
                    <div>
                       
                    </div>
                    {/* Remember Me checkbox */}
                    <div className="flex items-center my-5">
                        <input
                            id="remember"
                            name="remember"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-500"
                    >
                        Register
                    </button>
                    <div className="flex items-center my-4">
                        <span className="flex-grow border-t border-gray-300"></span>
                        <span className="mx-2 text-gray-500 text-sm ">or</span>
                        <span className="flex-grow border-t border-gray-300"></span>
                    </div>
                    <button
                        type="button"
                        className="w-full flex items-center justify-center px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="h-5 w-5 mr-2"
                        />
                        Connect with Google
                    </button>
                    <p className="mt-6 text-center text-sm text-gray-700">
                        Already have an account?{' '}
                        <a href="login.html" className="text-blue-600 hover:underline">
                            Sign in
                        </a>
                    </p>
                </form>
                <p className="text-sm text-center text-gray-600"></p>
            </div>
        </div>
    </div>
)
}
