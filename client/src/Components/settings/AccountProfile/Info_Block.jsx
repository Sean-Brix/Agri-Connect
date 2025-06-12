import React, { useEffect, useState } from 'react';

export default function Info_Block({ user }) {
    const [edit, setEdit] = useState(false);
    const [editedUser, setEditedUser] = useState({ ...user });
    const [newPicture, setNewPicture] = useState(null);

    useEffect(() => {
        setEditedUser({ ...user });
        setNewPicture(null);
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewPicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveClick = () => {
        // Here you would typically make an API call to save the updated user data
        // For now, we'll just update the user state in the parent component (if needed)

        if (newPicture) {
            // Update the picture in the editedUser state if a new picture was selected
            setEditedUser((prevUser) => ({
                ...prevUser,
                picture: newPicture,
            }));
        }

        setEdit(false);
    };

    const handleCancelClick = () => {
        setEditedUser({ ...user }); // Revert to original user data
        setNewPicture(null);
        setEdit(false);
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-white px-2 sm:px-0 mt-20 gap-10">

            {/* HEADER */}
            <div className="border-2 border-blue-900 rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-5xl bg-white">
                <div className="flex items-center mb-2 mt-10">
                    <span className="bg-white rounded-lg px-4 text-2xl sm:text-2xl font-semibold text-black-700 whitespace-nowrap z-10">
                        Profile Information
                    </span>
                    <hr className="flex-1 border-black-300 ml-4" />
                </div>

                {/* USER DETAILS */}
                <div className="bg-white flex flex-col-reverse md:flex-row border-b-none justify-center shadow-lg rounded-lg overflow-hidden p-4 sm:p-8 md:p-12 w-full max-w-5xl min-h-[400px] md:min-h-[600px]">
                    <form className="mt-4 md:mt-0 space-y-8 text-black-700 p-4 sm:p-4 w-full md:w-1/2">
                        <div className="block">
                            <span className="text-black-700 font-bold">
                                🔑 User Access
                            </span>
                            {edit ? (
                                <input
                                    type="text"
                                    name="access"
                                    value={editedUser.access}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border rounded-lg p-2 pl-5 bg-white"
                                />
                            ) : (
                                <div className="mt-1 block w-full border rounded-lg p-2 pl-5 bg-white">
                                    {editedUser.access}
                                </div>
                            )}
                        </div>
                        <div className="block">
                            <span className="text-black-700 font-bold">
                                💼 Occupation
                            </span>
                            {edit ? (
                                <input
                                    type="text"
                                    name="occupation"
                                    value={editedUser.occupation}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border rounded-lg p-2 pl-5 bg-white"
                                />
                            ) : (
                                <div className="mt-1 block w-full border rounded-lg p-2 pl-5 bg-white">
                                    {editedUser.occupation}
                                </div>
                            )}
                        </div>

                        <div className="block">
                            <span className="text-black-700 font-bold">
                                📍 Address
                            </span>
                            {edit ? (
                                <input
                                    type="text"
                                    name="address"
                                    value={editedUser.address}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border rounded-lg p-2 pl-5 bg-white"
                                />
                            ) : (
                                <div className="mt-1 block w-full border rounded-lg p-2 pl-5 bg-white">
                                    {editedUser.address}
                                </div>
                            )}
                        </div>
                        <div className="block">
                            <span className="text-black-700 font-bold">
                                📞 Cellphone
                            </span>
                            {edit ? (
                                <input
                                    type="text"
                                    name="cellphone_no"
                                    value={editedUser.cellphone_no}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border rounded-lg p-2 pl-5 bg-white"
                                />
                            ) : (
                                <div className="mt-1 block w-full border rounded-lg p-2 pl-5 bg-white">
                                    {editedUser.cellphone_no}
                                </div>
                            )}
                        </div>
                        <div className="block">
                            <span className="text-black-700 font-bold">
                                🏢 Institution
                            </span>
                            {edit ? (
                                <input
                                    type="text"
                                    name="institution"
                                    value={editedUser.institution}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border rounded-lg p-2 pl-5 bg-white"
                                />
                            ) : (
                                <div className="mt-1 block w-full border rounded-lg p-2 pl-5 bg-white">
                                    {editedUser.institution}
                                </div>
                            )}
                        </div>

                        <div className="block">
                            <span className="text-black-700 font-bold">
                                🌾 Commodities
                            </span>
                            <div className="mt-1 block w-full border rounded-lg p-2 pl-5 bg-white">
                                None
                            </div>
                        </div>

                        <div className="block">
                            <span className="text-black-700 font-bold">
                                👥 Client Profile
                            </span>
                            {edit ? (
                                <input
                                    type="text"
                                    name="client_profile"
                                    value={editedUser.client_profile}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border rounded-lg p-2 pl-5 bg-white"
                                />
                            ) : (
                                <div className="mt-1 block w-full border rounded-lg p-2 pl-5 bg-white">
                                    {editedUser.client_profile}
                                </div>
                            )}
                        </div>
                    </form>

                    {/* IMAGE */}
                    <div className="flex flex-col items-center space-y-4 mb-6 md:mb-0 p-2 sm:p-4 w-full md:w-1/2 ">
                        {/* Extra border wrapper */}
                        <div className="flex items-center justify-center mb-4">
                            <div className="rounded-full border-4 border-blue-800 p-1 flex items-center justify-center">
                                {edit ? (
                                    <>
                                        <img
                                            src={
                                                newPicture || editedUser.picture
                                            }
                                            alt="Profile"
                                            className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full shadow-lg"
                                        />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePictureChange}
                                            className="mt-2"
                                        />
                                    </>
                                ) : (
                                    <img
                                        src={editedUser.picture}
                                        alt="Profile"
                                        className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full shadow-lg"
                                    />
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col items-center space-y-2 w-full">
                            <span className="border-2 border-blue-800 rounded-lg px-4 py-1 text-lg font-semibold text-black-700 w-fit">
                                {editedUser.firstname +
                                    ' ' +
                                    editedUser.lastname}
                            </span>
                            <span className="text-black-600 text-base">
                                <i className="fa-solid fa-mars mr-2"></i>
                                {editedUser.gender}
                            </span>
                            <span className="text-black-600 text-base">
                                <i className="fa-solid fa-user-tie mr-2"></i>
                                {editedUser.position}
                            </span>
                        </div>

                        <div className="text-center">
                            {edit ? (
                                <div className="flex gap-2">
                                    <div
                                        className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 cursor-pointer bg-green-800 text-white rounded-lg hover:bg-green-500 transition text-sm sm:text-base border-2 border-green-800"
                                        onClick={handleSaveClick}
                                    >
                                        <i className="fa-solid fa-check"></i>
                                        Save
                                    </div>
                                    <div
                                        className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 cursor-pointer bg-red-800 text-white rounded-lg hover:bg-red-500 transition text-sm sm:text-base border-2 border-red-800"
                                        onClick={handleCancelClick}
                                    >
                                        <i className="fa-solid fa-times"></i>
                                        Cancel
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 cursor-pointer bg-blue-800 text-white rounded-lg hover:bg-blue-500 transition text-sm sm:text-base border-2 border-blue-800"
                                    onClick={() => setEdit(true)}
                                >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                    Edit Profile
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="border-2 border-blue-900 rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-5xl bg-white">

                <div className="flex items-center mb-4">
                    <span className="bg-white rounded-lg px-4 text-2xl sm:text-2xl font-semibold text-black-700 whitespace-nowrap z-10">
                        Contacts Information
                    </span>
                    <hr className="flex-1 border-black-300 ml-4" />
                </div>

                <div className="flex flex-col w-full mt-4">
                    <div className="flex flex-row justify-between items-center py-2 border-b border-gray-200">
                        <span className="font-semibold text-black-700">
                            Email
                        </span>
                        <span className="text-black-600">
                            {editedUser.email_address}
                        </span>
                    </div>
                    <div className="flex flex-row justify-between items-center py-2 border-b border-gray-200">
                        <span className="font-semibold text-black-700">
                            Telephone Number
                        </span>
                        <span className="text-black-600">
                            {editedUser.telephone_no}
                        </span>
                    </div>
                    <div className="flex flex-row justify-between items-center py-2">
                        <span className="font-semibold text-black-700">
                            Facebook
                        </span>
                        <span className="text-black-600">None</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
