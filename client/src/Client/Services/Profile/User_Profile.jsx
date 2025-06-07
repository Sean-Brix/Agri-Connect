import React, { useState } from 'react'
import Navbar from '../../Components/Navbar'
import { Link } from 'react-router-dom'
import me from './Assets/me.png'

export default function User_Profile() {
    // State for profile fields
    const [profile, setProfile] = useState({
        occupation: "Agricultural Engineer",
        address: "Amaia Scapes Gentri Cavite",
        cellphone: "09050540801",
        institution: "Fasasxzc",
        commodities: "Farmer",
        email: "rhenzy.cruzat@email.com",
        altPhone: "09171234567",
        facebook: "fb.com/rhenzy.cruzat",
    });

    // State for edit mode
    const [editMode, setEditMode] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submit (simulate save)
    const handleSubmit = (e) => {
        e.preventDefault();
        setEditMode(false);
        // Here you can add API call to save profile
    };

    return (
        <>
            <Navbar />
            <div className="bg-gradient-to-br from-blue-100 via-white to-blue-50 min-h-screen py-10 px-2 sm:px-0 pt-40">
                <div className="max-w-5xl mx-auto">
                    {/* Account Settings Header */}
                    <div className="relative flex items-center mb-24">
                        <hr className="flex-1 border-gray-300" />
                        <span className="absolute left-1/2 -translate-x-1/2 -top-8  bg-white shadow-xl px-10 py-4 rounded-3xl text-3xl font-extrabold text-blue-900 tracking-wide border border-blue-100 flex items-center gap-3">
                            <i className="fa-solid fa-gear text-blue-700"></i>
                            Profile Settings
                        </span>
                    </div>

                    {/* Profile Information Card */}
                    <div className="bg-white border border-blue-200 rounded-3xl shadow-2xl mb-14 flex flex-col lg:flex-row overflow-hidden transition-all duration-300">
                        {/* Profile Sidebar */}
                        <div className="bg-gradient-to-b from-blue-900 to-blue-700 flex flex-col items-center justify-center p-12 lg:w-1/3 gap-5">
                            <div className="rounded-full border-4 border-white shadow-2xl p-1 mb-2 bg-gradient-to-tr from-blue-400 to-blue-900">
                                <img
                                    src={me}
                                    alt="Profile"
                                    className="w-32 h-32 md:w-44 md:h-44 object-cover rounded-full border-4 border-blue-200"
                                />
                            </div>
                            <span className="bg-white border-2 border-blue-900 rounded-2xl px-8 py-2 text-2xl font-bold text-blue-900 mb-1 shadow-lg tracking-wide">
                                Rhenzy Cruzat
                            </span>
                            {/* Editable Gender */}
                            {editMode ? (
                                <select
                                    name="gender"
                                    value={profile.gender || "Male"}
                                    onChange={handleChange}
                                    className="text-blue-900 font-semibold rounded-xl px-4 py-2 bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            ) : (
                                <span className="text-white text-base flex items-center gap-2">
                                    <i className="fa-solid fa-mars"></i> {profile.gender || "Male"}
                                </span>
                            )}
                            {/* Editable Supervisor/Role */}
                            {editMode ? (
                                <input
                                    type="text"
                                    name="role"
                                    value={profile.role || "Field Supervisor"}
                                    onChange={handleChange}
                                    className="text-blue-900 font-semibold rounded-xl px-4 py-2 bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                />
                            ) : (
                                <span className="text-white text-base flex items-center gap-2">
                                    <i className="fa-solid fa-user-tie"></i> {profile.role || "Field Supervisor"}
                                </span>
                            )}
                            {!editMode ? (
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-100 to-blue-300 text-blue-900 font-semibold rounded-xl hover:bg-blue-200 transition border-2 border-blue-900 shadow-lg"
                                >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                    Edit Profile
                                </button>
                            ) : (
                                <button
                                    onClick={() => setEditMode(false)}
                                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-100 to-blue-300 text-blue-900 font-semibold rounded-xl hover:bg-blue-200 transition border-2 border-blue-900 shadow-lg"
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                    Cancel
                                </button>
                            )}
                        </div>
                        {/* Profile Form */}
                        <form className="flex-1 p-10 grid grid-cols-1 gap-8 md:grid-cols-2 bg-white" onSubmit={handleSubmit}>
                            <div>
                                <label className="block mb-2 text-blue-900 font-semibold tracking-wide">💼 Occupation</label>
                                <input
                                    type="text"
                                    name="occupation"
                                    className="block w-full border border-blue-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 transition"
                                    value={profile.occupation}
                                    onChange={handleChange}
                                    disabled={!editMode}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-blue-900 font-semibold tracking-wide">📍 Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    className="block w-full border border-blue-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 transition"
                                    value={profile.address}
                                    onChange={handleChange}
                                    disabled={!editMode}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-blue-900 font-semibold tracking-wide">📞 Cellphone</label>
                                <input
                                    type="text"
                                    name="cellphone"
                                    className="block w-full border border-blue-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 transition"
                                    value={profile.cellphone}
                                    onChange={handleChange}
                                    disabled={!editMode}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-blue-900 font-semibold tracking-wide">🏢 Institution</label>
                                <input
                                    type="text"
                                    name="institution"
                                    className="block w-full border border-blue-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 transition"
                                    value={profile.institution}
                                    onChange={handleChange}
                                    disabled={!editMode}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block mb-2 text-blue-900 font-semibold tracking-wide">🌾 Commodities</label>
                                <input
                                    type="text"
                                    name="commodities"
                                    className="block w-full border border-blue-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 transition"
                                    value={profile.commodities}
                                    onChange={handleChange}
                                    disabled={!editMode}
                                />
                            </div>
                            {editMode && (
                                <div className="md:col-span-2 flex justify-end">
                                    <button
                                        type="submit"
                                        className="px-8 py-3 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition shadow-lg"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Contacts Information Card */}
                    <div className="bg-white border border-blue-200 rounded-3xl shadow-2xl p-10">
                        <div className="flex flex-col sm:flex-row items-center mb-8 gap-4">
                            <span className="bg-white px-8 py-3 rounded-2xl text-2xl font-bold text-blue-900 border border-blue-100 shadow-lg flex items-center gap-2">
                                <i className="fa-solid fa-address-book text-blue-700"></i>
                                Contacts Information
                            </span>
                            <hr className="flex-1 border-gray-300 w-full sm:w-auto" />
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-5 gap-2">
                                <span className="font-semibold text-blue-900 flex items-center gap-2">
                                    <i className="fa-solid fa-envelope text-blue-700"></i> Email
                                </span>
                                {editMode ? (
                                    <input
                                        type="email"
                                        name="email"
                                        className="text-gray-700 break-all border border-blue-200 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 transition"
                                        value={profile.email}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <span className="text-gray-700 break-all">{profile.email}</span>
                                )}
                            </div>
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-5 gap-2">
                                <span className="font-semibold text-blue-900 flex items-center gap-2">
                                    <i className="fa-solid fa-phone text-blue-700"></i> Alternate Phone
                                </span>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="altPhone"
                                        className="text-gray-700 border border-blue-200 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 transition"
                                        value={profile.altPhone}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <span className="text-gray-700">{profile.altPhone}</span>
                                )}
                            </div>
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-5 gap-2">
                                <span className="font-semibold text-blue-900 flex items-center gap-2">
                                    <i className="fa-brands fa-facebook text-blue-700"></i> Facebook
                                </span>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="facebook"
                                        className="text-gray-700 break-all border border-blue-200 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 transition"
                                        value={profile.facebook}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <span className="text-gray-700 break-all">{profile.facebook}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
