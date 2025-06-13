import React, { useState, useEffect } from 'react';

export default function User_Details({ user, isEdit, setRowUpdate }) {
    const [userDetail, setuserDetails] = useState({ ...user });
    const [editedUser, setEditedUser] = useState({ ...user });
    const [isEditing, setIsEditing] = useState(isEdit);

    // Initial Render
    useEffect(() => {
        (async () => {
            const response = await fetch(
                `/api/accounts/getAccount?id=${userDetail.id}`
            );
            const data = await response.json();

            if (!response.ok) {
                console.log(data.payload.error);
                alert('Something went wrong');
                return;
            }

            setuserDetails(data.payload.details);
        })();
    }, []);

    useEffect(() => {
        setEditedUser({ ...userDetail });
    }, [userDetail]);

    const handleChange = (key, value) => {
        setEditedUser({ ...editedUser, [key]: value });
    };

    const handleSave = async () => {
        if (!confirm('Are you sure?')) return;

        try {
            const response = await fetch(`/api/Accounts/updateAccount`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedUser),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    const data = await response.json();
                    alert(data.payload.error);
                    return;
                }

                console.log(await response.text());
                throw new Error('Something Went Wrong');
            }

            const data = await response.json();

            console.log(data.payload.updated);

            setEditedUser({ ...editedUser, ...data.payload.updated });
            setuserDetails({ ...editedUser });

            // Rerender user Row
            setRowUpdate({
                access: editedUser.access,
                email_address: editedUser.email_address,
                username: editedUser.username,
            });
        } 
        catch (e) {
            alert(e);
            console.log(e);
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditedUser({ ...user });
        setIsEditing(false);
    };

    // DETAILS MODE
    const renderDisplayMode = () => (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <strong>ID:</strong> {userDetail.id}
            </div>
            <div>
                <strong>Username:</strong> {userDetail.username}
            </div>
            <div>
                <strong>Access:</strong> {userDetail.access}
            </div>
            <div>
                <strong>Full Name:</strong>{' '}
                {`${userDetail.firstname || ''} ${userDetail.lastname || ''}`}
            </div>
            <div>
                <strong>Gender:</strong> {userDetail.gender}
            </div>
            <div>
                <strong>Client Profile:</strong> {userDetail.client_profile}
            </div>
            <div>
                <strong>Address:</strong> {userDetail.address}
            </div>
            <div>
                <strong>Telephone No:</strong> {userDetail.telephone_no}
            </div>
            <div>
                <strong>Cellphone No:</strong> {userDetail.cellphone_no}
            </div>
            <div>
                <strong>Occupation:</strong> {userDetail.occupation}
            </div>
            <div>
                <strong>Position:</strong> {userDetail.position}
            </div>
            <div>
                <strong>Institution:</strong> {userDetail.institution}
            </div>
            <div>
                <strong>Email Address:</strong> {userDetail.email_address}
            </div>
            <div>
                <strong>Created At:</strong>{' '}
                {new Date(userDetail.created_at).toLocaleDateString('en-US')}
            </div>
            <div>
                <strong>Updated At:</strong>{' '}
                {new Date(userDetail.updated_at).toLocaleDateString('en-US')}
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

                {/* FIRSTNAME */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        First Name:
                    </label>
                    <input
                        type="text"
                        value={editedUser.firstname || ''}
                        onChange={(e) =>
                            handleChange('firstname', e.target.value)
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* LASTNAME */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Last Name:
                    </label>
                    <input
                        type="text"
                        value={editedUser.lastname || ''}
                        onChange={(e) =>
                            handleChange('lastname', e.target.value)
                        }
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
