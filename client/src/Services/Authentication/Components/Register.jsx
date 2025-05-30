import React, { Component } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import cover from '../../../Services/Authentication/Assets/Cover.jpg'
import logo from '../../../Services/Authentication/Assets/Logo.png'

// Wrapper for passing in Navigate Hooks
export default function register_wrapper(){
    const navigate = useNavigate();
    return <Register navigate={navigate}/>
}

class Register extends Component {

    // Fields
    inputs = {
        firstName: "",
        lastName: "",
        gender: "",
        clientProfile: "",
        address: "",
        telephoneNumber: "",
        cellphoneNumber: "",
        occupation: "",
        position: "",
        institution: "",
        email: "",
        username: "",
        password: "",
        confirmPass: "",
    }

    // State
    state = {
        register: "first"
    }

    // State Helper (Next)
    next_form = (key)=>{

        switch(key){

            case "second":
                if(!this.inputs.firstName || !this.inputs.lastName || !["Male", "Female", "Other"].includes(this.inputs.gender)){
                    alert("Please fill in all required fields correctly");
                    return;
                }
                
                this.setState({register:"second"});
                break;

            case "third":
                const validProfiles = [
                    'Fishfolk', 'Rural Based Org', 'Student',
                    'Agricultural/Fisheries Technician', 'Youth', 'Women', 
                    "Gov't Employee", 'PWD', 'Indigenous People'
                ];

                if (!validProfiles.includes(this.inputs.clientProfile) || !this.inputs.address || !this.inputs.cellphoneNumber || !this.inputs.email) {
                    alert("Please fill in all required fields correctly. Client Profile, Address, Cellphone No, and Email are required.");
                    return;
                }

                this.setState({register:"third"});
                break;

            default:
                return console.log("ERROR: Invalid Key");
                
        }

    }

    // Input Reference
    onChange_input = (event)=>{
        this.inputs[event.target.name] = event.target.value;
    }

    // Register account
    post_account = async ()=>{
        this.props.navigate("/login");
    } 
    
    // Main Component
    render(){
        switch(this.state.register){
            case "first": return this.render_first();
            case "second": return this.render_second();
            case "third": return this.render_third();
        }
    }

    // First Register State
    render_first(){
        return (
            <div className="relative min-h-screen h-screen w-screen flex items-center justify-center bg-gray-100 overflow-hidden">
                <img
                    src={cover}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 blur-sm"
                    style={{ zIndex: 0 }}
                />
                <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                    <div className="flex flex-col items-center justify-center mb-4 text-center px-2">
                        <img src={logo} alt="" className="rounded-full mb-3 h-14 w-14 md:h-20 md:w-20" />
                        <h1 className="font-bold text-lg md:text-2xl text-center px-2">
                            FITS Tanza - Municipal Agriculture Office
                        </h1>
                    </div>
                    <div className="w-[95%] max-w-xs sm:max-w-sm md:max-w-md px-4 sm:px-6 md:px-10 py-6 space-y-6 rounded-lg shadow-lg border border-white/20 backdrop-blur-lg backdrop-brightness-95 bg-white shadow-black">
                        <h2 className="text-lg md:text-2xl font-bold text-center text-gray-800">Register Now</h2>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="fname" className="block text-sm font-medium text-gray-700">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="fname"
                                    name="firstName"
                                    onChange={this.onChange_input}
                                    required
                                    className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-black-300"
                                />
                            </div>
                            <div>
                                <label htmlFor="lname" className="block text-sm font-medium text-gray-700">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lname"
                                    name="lastName"
                                    onChange={this.onChange_input}
                                    required
                                    className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-black-300"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Gender
                                </label>
                                <div className="flex items-center space-x-4 mb-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="gender"
                                            onChange={this.onChange_input}
                                            value="male"
                                            required
                                            className="form-radio text-blue-600"
                                        />
                                        <span className="ml-2 text-gray-700">Male</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            required
                                            className="form-radio text-blue-600"
                                        />
                                        <span className="ml-2 text-gray-700">Female</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="other"
                                            required
                                            className="form-radio text-blue-600"
                                        />
                                        <span className="ml-2 text-gray-700">Other</span>
                                    </label>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-500"
                                onClick={()=>this.next_form("second")}
                            >
                                Next
                            </button>
                            <div className="flex items-center my-4">
                                <span className="flex-grow border-t border-black-300"></span>
                                <span className="mx-2 text-black-500 text-sm">or</span>
                                <span className="flex-grow border-t border-black-300"></span>
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
                            <p className="mt-4 text-center text-sm text-gray-700">
                                Already have an account?{' '}
                                <a href="register.html" className="text-blue-600 hover:underline">
                                    Sign in
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

    // Second Register State
    render_second(){
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
                <img
                    src={cover}
                    alt="Background"
                    className="fixed inset-0 w-full h-full object-cover opacity-60 blur-sm pointer-events-none"
                />
                <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl px-2 sm:px-8 py-8">
                    <div className="flex flex-col items-center justify-center mb-8 text-center">
                        <img src={logo} alt="" className="rounded-full mb-6 h-20 w-20" />
                        <h1 className="font-bold text-2xl px-2">
                            FITS Tanza - Municipal Agriculture Office
                        </h1>
                    </div>
                    <div className="w-full p-4 sm:p-8 space-y-6 bg-white rounded-lg shadow-lg border border-gray-300 bg-opacity-80 backdrop-blur-md max-w-md sm:max-w-full">
                        <h2 className="text-2xl font-bold text-center text-gray-800">Register Now</h2>
                        <div className="space-y-4">
                            <div>
                                <hr className="my-4 border-black-300" />
                                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
                                    <label htmlFor="clientProfile" className="block text-sm font-medium text-black-700 w-full sm:w-40 mb-2 sm:mb-0">
                                        Client Profile
                                    </label>
                                    <select
                                        id="clientProfile"
                                        name="clientProfile"
                                        required
                                        className="flex-1 px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-black-300 min-w-0 w-full sm:w-auto"
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
                            <div className="relative my-8">
                                <hr className="border-black-300" />
                                <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white rounded-lg px-4 text-lg font-semibold text-gray-700">
                                    Contact Information
                                </span>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
                                <label htmlFor="address" className="block text-sm font-medium text-black-700 w-full sm:w-40 mb-2 sm:mb-0">
                                    Address :
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    required
                                    className="flex-1 px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-black-300 min-w-0 w-full sm:w-auto"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
                                <label htmlFor="telephone" className="block text-sm font-medium text-black-700 w-full sm:w-40 mb-2 sm:mb-0">
                                    Telephone No :
                                </label>
                                <input
                                    type="tel"
                                    id="telephone"
                                    name="telephone"
                                    className="flex-1 px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-black-300 min-w-0 w-full sm:w-auto"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
                                <label htmlFor="cellphone" className="block text-sm font-medium text-black-700 w-full sm:w-40 mb-2 sm:mb-0">
                                    Cellphone No :
                                </label>
                                <input
                                    type="tel"
                                    id="cellphone"
                                    name="cellphone"
                                    required
                                    className="flex-1 px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-black-300 min-w-0 w-full sm:w-auto"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
                                <label htmlFor="occupation" className="block text-sm font-medium text-black-700 w-full sm:w-40 mb-2 sm:mb-0">
                                    Occupation :
                                </label>
                                <input
                                    type="text"
                                    id="occupation"
                                    name="occupation"
                                    className="flex-1 px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-black-300 min-w-0 w-full sm:w-auto"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
                                <label htmlFor="position" className="block text-sm font-medium text-black-700 w-full sm:w-40 mb-2 sm:mb-0">
                                    Position :
                                </label>
                                <input
                                    type="text"
                                    id="position"
                                    name="position"
                                    className="flex-1 px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-black-300 min-w-0 w-full sm:w-auto"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
                                <label htmlFor="institution" className="block text-sm font-medium text-black-700 w-full sm:w-40 mb-2 sm:mb-0">
                                    Institution :
                                </label>
                                <input
                                    type="text"
                                    id="institution"
                                    name="institution"
                                    className="flex-1 px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-black-300 min-w-0 w-full sm:w-auto"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-black-700 w-full sm:w-40 mb-2 sm:mb-0">
                                    Email Address :
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="flex-1 px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-black-300 min-w-0 w-full sm:w-auto"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 mt-5 focus:ring-4 focus:ring-blue-500"
                                onClick={()=>this.next_form("third")}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Third Register State
    render_third(){

        return (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-100 overflow-hidden min-h-screen">
                <img
                    src={cover}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 blur-sm"
                />

                <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                    
                    <div className="flex flex-col items-center justify-center mb-6 text-center">
                        <img src={logo} alt="" className="rounded-full mb-4 h-16 w-16 sm:h-20 sm:w-20" />
                        <h1 className="px-4 font-bold text-lg sm:text-2xl text-center">
                            FITS Tanza - Municipal Agriculture Office
                        </h1>
                    </div>

                    <div className="w-full max-w-xs sm:max-w-md p-6 sm:p-8 space-y-6 bg-white rounded-lg shadow-lg border border-gray-300 backdrop-blur-md bg-gray-500 bg-opacity-70">
                        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800">Register Now</h2>
                        <div className="space-y-4">
                            
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
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
                                    className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                                />
                            </div>

                            <div className="flex items-center my-3">
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
                                    className="w-full px-4 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-500"
                                    onClick={this.post_account}
                                >
                                    Register
                                </button>

                            <div className="flex items-center my-2">
                                <span className="flex-grow border-t border-gray-300"></span>
                                <span className="mx-2 text-gray-500 text-sm">or</span>
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

                            <p className="mt-4 text-center text-sm text-gray-700">
                                Already have an account?{' '}
                                <Link to="/login" className="text-blue-600 hover:underline">
                                    Sign in
                                </Link>
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
