import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import { Link } from 'react-router-dom';

import default_picture from '../../../Assets/default_picture.png'

export default function User_Profile() {
    const [profile, setProfile] = useState({
        occupation: '',
        address: '',
        cellphone_no: '',
        institution: '',
        email_address: '',
        telephone_no: '',
        gender: 'Male',
        position: '',
        firstname: '',
        lastname: '',
    });

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`/api/accounts/myAccount`);

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setProfile(data.payload.details);

                    const getImage = await fetch(
                        `/api/accounts/getProfile?user_id=${data.payload.details.id}`
                    );
                    if (getImage.status != 204) {
                        const imageBlob = await getImage.blob();
                        const imageObjectURL = URL.createObjectURL(imageBlob);
                        setProfile((prev) => ({
                            ...prev,
                            profile_pic: imageObjectURL,
                        }));
                    }
                } else {
                    console.error('Failed to fetch profile');
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEditMode(false);

        try {
            const response = await fetch('/api/accounts/updateUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    occupation: profile.occupation,
                    address: profile.address,
                    cellphone_no: profile.cellphone_no,
                    institution: profile.institution,
                    email_address: profile.email_address,
                    gender: profile.gender,
                    position: profile.position,
                    telephone_no: profile.telephone_no,
                }),
            });

            if (response.ok) {
                console.log('Profile updated successfully');
            } else {
                console.error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="bg-gradient-to-br from-blue-100 via-white to-blue-200 min-h-screen py-10 px-2 sm:px-0 pt-40">
                <div className="max-w-5xl mx-auto">
                    <div className="relative flex items-center mb-22">
                        <hr className="flex-1 border-blue-200" />
                        <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-white shadow-xl px-10 py-4 rounded-3xl text-2xl font-extrabold text-blue-900 tracking-wide border border-blue-300 flex items-center gap-4 whitespace-nowrap">
                            <i className="fa-solid fa-gear text-blue-700"></i>
                            Profile Settings
                        </span>
                    </div>

                    <div className="bg-white border border-blue-200 rounded-3xl shadow-2xl mb-14 flex flex-col lg:flex-row overflow-hidden transition-all duration-300">
                        <div className="bg-gradient-to-b from-blue-300 via-blue-200 to-blue-900 flex flex-col items-center justify-center p-12 lg:w-1/3 gap-5">
                            <div className="rounded-full border-4 border-blue-700 shadow-2xl p-1 mb-2 bg-gradient-to-tr from-blue-700 to-blue-900">
                                <img
                                    src={profile.profile_pic || default_picture}
                                    alt="Profile"
                                    className="w-32 h-32 md:w-44 md:h-44 object-cover rounded-full border-4 border-blue-800"
                                />
                            </div>
                            <span className="bg-blue-800 border-2 border-blue-700 rounded-2xl px-8 py-2 text-2xl font-bold text-white mb-1 shadow-lg tracking-wide">
                                {profile.firstname} {profile.lastname}
                            </span>
                            {editMode ? (
                                <select
                                    name="gender"
                                    value={profile.gender || 'Male'}
                                    onChange={handleChange}
                                    className="text-white font-semibold rounded-xl px-4 py-2 bg-blue-800 border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            ) : (
                                <span className="text-blue-100 text-base flex items-center gap-2">
                                    <i className="fa-solid fa-mars "></i>{' '}
                                    {profile.gender || 'Male'}
                                </span>
                            )}
                            {editMode ? (
                                <input
                                    type="text"
                                    name="position"
                                    value={profile.position || ''}
                                    onChange={handleChange}
                                    className="text-white font-semibold rounded-xl px-4 py-2 bg-blue-800 text-center border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                />
                            ) : (
                                <span className="text-blue-100 text-base flex items-center gap-2">
                                    <i className="fa-solid fa-user-tie"></i>{' '}
                                    {profile.position || 'Field Supervisor'}
                                </span>
                            )}
                            {!editMode ? (
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-semibold rounded-xl hover:bg-blue-800 transition border-2 border-blue-700 shadow-lg"
                                >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                    Edit Profile
                                </button>
                            ) : (
                                <button
                                    onClick={() => setEditMode(false)}
                                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-semibold rounded-xl hover:bg-blue-800 transition border-2 border-blue-700 shadow-lg"
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                    Cancel
                                </button>
                            )}
                        </div>
                        <form
                            className="flex-1 p-10 grid grid-cols-1 gap-8 md:grid-cols-2 bg-white"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label className="block mb-2 text-blue-900 font-semibold tracking-wide">
                                    💼 Occupation
                                </label>
                                <input
                                    type="text"
                                    name="occupation"
                                    className="block w-full border border-blue-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 text-blue-900 transition"
                                    value={profile.occupation || ''}
                                    onChange={handleChange}
                                    disabled={!editMode}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-blue-900 font-semibold tracking-wide">
                                    📍 Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    className="block w-full border border-blue-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 text-blue-900 transition"
                                    value={profile.address || ''}
                                    onChange={handleChange}
                                    disabled={!editMode}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-blue-900 font-semibold tracking-wide">
                                    📞 Cellphone
                                </label>
                                <input
                                    type="text"
                                    name="cellphone_no"
                                    className="block w-full border border-blue-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 text-blue-900 transition"
                                    value={profile.cellphone_no || ''}
                                    onChange={handleChange}
                                    disabled={!editMode}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-blue-900 font-semibold tracking-wide">
                                    🏢 Institution
                                </label>
                                <input
                                    type="text"
                                    name="institution"
                                    className="block w-full border border-blue-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 text-blue-900 transition"
                                    value={profile.institution || ''}
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

                    <div className="bg-white border border-blue-200 rounded-3xl shadow-2xl p-10">
                        <div className="flex flex-col sm:flex-row items-center mb-8 gap-4">
                            <span className="bg-blue-800 px-8 py-3 rounded-2xl text-2xl font-bold text-white border border-blue-700 shadow-lg flex items-center gap-2">
                                <i className="fa-solid fa-address-book text-blue-300"></i>
                                Contacts Information
                            </span>
                            <hr className="flex-1 border-blue-700 w-full sm:w-auto" />
                        </div>
                        <div className="divide-y divide-blue-100">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-5 gap-2">
                                <span className="font-semibold text-blue-900 flex items-center gap-2">
                                    <i className="fa-solid fa-envelope text-blue-300"></i>{' '}
                                    Email
                                </span>
                                {editMode ? (
                                    <input
                                        type="email"
                                        name="email_address"
                                        className="text-blue-900 break-all border border-blue-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 transition"
                                        value={profile.email_address || ''}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <span className="text-blue-900 break-all">
                                        {profile.email_address}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-5 gap-2">
                                <span className="font-semibold text-blue-900 flex items-center gap-2">
                                    <i className="fa-solid fa-phone text-blue-300"></i>{' '}
                                    Alternate Phone
                                </span>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="telephone_no"
                                        className="text-blue-900 border border-blue-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 transition"
                                        value={profile.telephone_no || ''}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <span className="text-blue-900">
                                        {profile.telephone_no}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
        html, body, #root {
          scrollbar-width: none;
          -ms-overflow-style: none;
          background: #f1f5f9;
        }
        html::-webkit-scrollbar, body::-webkit-scrollbar, #root::-webkit-scrollbar {
          display: none;
        }
        .letter-spacing-wide {
          letter-spacing: 0.15em;
        }
      `}</style>
        </>
    );
}
