import React, { useState } from 'react';

export default function User_Details({ user }) {
    const [editedUser, setEditedUser] = useState({ ...user });

    const handleChange = (key, value) => {
        setEditedUser({ ...editedUser, [key]: value });
    };

    return (
        <>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto auto',
                    gap: '10px',
                }}
            >
                {/* ID */}
                <div>
                    <strong style={{ color: '#555' }}>id:</strong>
                    <input
                        type="text"
                        value={editedUser.id}
                        onChange={(e) => handleChange('id', e.target.value)}
                    />
                </div>

                {/* ACCESS */}
                <div>
                    <strong style={{ color: '#555' }}>access:</strong>
                    <input
                        type="text"
                        value={editedUser.access}
                        onChange={(e) => handleChange('access', e.target.value)}
                    />
                </div>

                {/* FULLNAME */}
                <div>
                    <strong style={{ color: '#555' }}>Full Name:</strong>
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
                    />
                </div>

                {/* GENDER */}
                <div>
                    <strong style={{ color: '#555' }}>gender:</strong>
                    <input
                        type="text"
                        value={editedUser.gender}
                        onChange={(e) => handleChange('gender', e.target.value)}
                    />
                </div>

                {/* CLIENT PROFILE */}
                <div>
                    <strong style={{ color: '#555' }}>client_profile:</strong>
                    <input
                        type="text"
                        value={editedUser.client_profile}
                        onChange={(e) =>
                            handleChange('client_profile', e.target.value)
                        }
                    />
                </div>

                {/* ADDRESS */}
                <div>
                    <strong style={{ color: '#555' }}>address:</strong>
                    <input
                        type="text"
                        value={editedUser.address}
                        onChange={(e) =>
                            handleChange('address', e.target.value)
                        }
                    />
                </div>

                {/* TELEPHONE NUMBER */}
                <div>
                    <strong style={{ color: '#555' }}>telephone_no:</strong>
                    <input
                        type="text"
                        value={editedUser.telephone_no}
                        onChange={(e) =>
                            handleChange('telephone_no', e.target.value)
                        }
                    />
                </div>

                {/* CELLPHONE NUMBER */}
                <div>
                    <strong style={{ color: '#555' }}>cellphone_no:</strong>
                    <input
                        type="text"
                        value={editedUser.cellphone_no}
                        onChange={(e) =>
                            handleChange('cellphone_no', e.target.value)
                        }
                    />
                </div>

                {/* OCCUPATION */}
                <div>
                    <strong style={{ color: '#555' }}>occupation:</strong>
                    <input
                        type="text"
                        value={editedUser.occupation}
                        onChange={(e) =>
                            handleChange('occupation', e.target.value)
                        }
                    />
                </div>

                {/* POSITION */}
                <div>
                    <strong style={{ color: '#555' }}>position:</strong>
                    <input
                        type="text"
                        value={editedUser.position}
                        onChange={(e) =>
                            handleChange('position', e.target.value)
                        }
                    />
                </div>

                {/* INSTITUTION */}
                <div>
                    <strong style={{ color: '#555' }}>institution:</strong>
                    <input
                        type="text"
                        value={editedUser.institution}
                        onChange={(e) =>
                            handleChange('institution', e.target.value)
                        }
                    />
                </div>

                {/* EMAIL ADDRESS */}
                <div>
                    <strong style={{ color: '#555' }}>email_address:</strong>
                    <input
                        type="text"
                        value={editedUser.email_address}
                        onChange={(e) =>
                            handleChange('email_address', e.target.value)
                        }
                    />
                </div>

                {/* USERNAME */}
                <div>
                    <strong style={{ color: '#555' }}>username:</strong>
                    <input
                        type="text"
                        value={editedUser.username}
                        onChange={(e) =>
                            handleChange('username', e.target.value)
                        }
                    />
                </div>

                {/* CREATED AT */}
                <div>
                    <strong style={{ color: '#555' }}>created at:</strong>
                    <input
                        type="text"
                        value={new Date(
                            editedUser.created_at
                        ).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                        readOnly
                    />
                </div>
                
                {/* UPDATED AT */}
                <div>
                    <strong style={{ color: '#555' }}>updated at:</strong>
                    <input
                        type="text"
                        value={new Date(
                            editedUser.updated_at
                        ).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                        readOnly
                    />
                </div>

            </div>
        </>
    );
}
