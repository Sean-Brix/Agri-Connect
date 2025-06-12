import React, { useState, useEffect } from 'react';

export default function User_Details({ user, isEdit }) {
    const [editedUser, setEditedUser] = useState({ ...user });
    const [isEditing, setIsEditing] = useState(isEdit);

    useEffect(() => {
        setEditedUser({ ...user });
        setIsEditing(isEdit);
    }, [user, isEdit]);

    const handleChange = (key, value) => {
        setEditedUser({ ...editedUser, [key]: value });
    };

    // TODO: Save the edited profile to the database
    const handleSave = () => {
        if (!confirm('Are you sure?')) return;
        setIsEditing(false);
        console.log(editedUser);
    };

    const handleCancel = () => {
        setEditedUser({ ...user });
        setIsEditing(false);
    };

    // DETAILS MODE
    const renderDisplayMode = () => (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <strong>ID:</strong> {user.id}
            </div>
            <div>
                <strong>Username:</strong> {user.username}
            </div>
            <div>
                <strong>Access:</strong> {user.access}
            </div>
            <div>
                <strong>Full Name:</strong>{' '}
                {`${user.firstname || ''} ${user.lastname || ''}`}
            </div>
            <div>
                <strong>Gender:</strong> {user.gender}
            </div>
            <div>
                <strong>Client Profile:</strong> {user.client_profile}
            </div>
            <div>
                <strong>Address:</strong> {user.address}
            </div>
            <div>
                <strong>Telephone No:</strong> {user.telephone_no}
            </div>
            <div>
                <strong>Cellphone No:</strong> {user.cellphone_no}
            </div>
            <div>
                <strong>Occupation:</strong> {user.occupation}
            </div>
            <div>
                <strong>Position:</strong> {user.position}
            </div>
            <div>
                <strong>Institution:</strong> {user.institution}
            </div>
            <div>
                <strong>Email Address:</strong> {user.email_address}
            </div>
            <div>
                <strong>Created At:</strong>{' '}
                {new Date(user.created_at).toLocaleDateString('en-US')}
            </div>
            <div>
                <strong>Updated At:</strong>{' '}
                {new Date(user.updated_at).toLocaleDateString('en-US')}
            </div>
        </div>
    );

    // EDIT MODE
    const renderEditMode = () => (
        <div className="bg-gray-100 p-4 rounded shadow-md">
            <div className="grid grid-cols-2 gap-4">

                {/* ID */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        ID:
                    </label>
                    <input
                        type="text"
                        value={editedUser.id}
                        onChange={(e) => handleChange('id', e.target.value)}
                        readOnly
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* USERNAME */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Username:
                    </label>
                    <input
                        type="text"
                        value={editedUser.username}
                        onChange={(e) =>
                            handleChange('username', e.target.value)
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* ACCESS */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Access:
                    </label>

                    <select
                        value={editedUser.access}
                        onChange={(e) => handleChange('access', e.target.value)}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                        <option value="Super Admin">Super Admin</option>
                    </select>
                </div>

                {/* FULLNAME */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Full Name:
                    </label>
                    <input
                        type="text"
                        value={`${editedUser.firstname || ''} ${
                            editedUser.lastname || ''
                        }`}
                        onChange={(e) => {
                            const fullName = e.target.value;
                            const names = fullName.split(' ');
                            const newFirstName = names[0] || '';
                            const newLastName = names.slice(1).join(' ') || '';
                            handleChange('firstname', newFirstName);
                            handleChange('lastname', newLastName);
                        }}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* GENDER */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Gender:
                    </label>
                    <select
                        value={editedUser.gender}
                        onChange={(e) => handleChange('gender', e.target.value)}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* CLIENT PROFILE */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Client Profile:
                    </label>

                    <select
                        value={editedUser.client_profile}
                        onChange={(e) =>
                            handleChange('client_profile', e.target.value)
                        }
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="Fishfolk">Fishfolk</option>
                        <option value="Rural Based Org">Rural Based Org</option>
                        <option value="Student">Student</option>
                        <option value="Agricultural/Fisheries Technician">
                            Agricultural/Fisheries Technician
                        </option>
                        <option value="Youth">Youth</option>
                        <option value="Women">Women</option>
                        <option value="Gov't Employee">Gov't Employee</option>
                        <option value="PWD">PWD</option>
                        <option value="Indigenous People">
                            Indigenous People
                        </option>
                    </select>
                </div>

                {/* ADDRESS */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Address:
                    </label>
                    <input
                        type="text"
                        value={editedUser.address}
                        onChange={(e) =>
                            handleChange('address', e.target.value)
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* TELEPHONE NUMBER */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Telephone No:
                    </label>
                    <input
                        type="text"
                        value={editedUser.telephone_no}
                        onChange={(e) =>
                            handleChange('telephone_no', e.target.value)
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* CELLPHONE NUMBER */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Cellphone No:
                    </label>
                    <input
                        type="text"
                        value={editedUser.cellphone_no}
                        onChange={(e) =>
                            handleChange('cellphone_no', e.target.value)
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* OCCUPATION */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Occupation:
                    </label>
                    <input
                        type="text"
                        value={editedUser.occupation}
                        onChange={(e) =>
                            handleChange('occupation', e.target.value)
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* POSITION */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Position:
                    </label>
                    <input
                        type="text"
                        value={editedUser.position}
                        onChange={(e) =>
                            handleChange('position', e.target.value)
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* INSTITUTION */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Institution:
                    </label>
                    <input
                        type="text"
                        value={editedUser.institution}
                        onChange={(e) =>
                            handleChange('institution', e.target.value)
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* EMAIL ADDRESS */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email Address:
                    </label>
                    <input
                        type="text"
                        value={editedUser.email_address}
                        onChange={(e) =>
                            handleChange('email_address', e.target.value)
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* CREATED AT */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Created At:
                    </label>
                    <input
                        type="text"
                        value={new Date(
                            editedUser.created_at
                        ).toLocaleDateString('en-US')}
                        readOnly
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* UPDATED AT */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Updated At:
                    </label>
                    <input
                        type="text"
                        value={new Date(
                            editedUser.updated_at
                        ).toLocaleDateString('en-US')}
                        readOnly
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
            </div>

            {/* CONTROLS */}
            <div className="flex justify-end gap-2 mt-4">
                <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-700"
                >
                    Save
                </button>
                <button
                    onClick={handleCancel}
                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-700"
                >
                    Cancel
                </button>
            </div>
        </div>
    );

    return <div>{isEditing ? renderEditMode() : renderDisplayMode()}</div>;
}
