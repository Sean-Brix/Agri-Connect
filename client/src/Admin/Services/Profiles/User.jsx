import React from 'react';
import { useState } from 'react';

// ASSETS
import default_picture from '../../../Assets/default_picture.png';

export default function User({ user, onDelete, onEdit }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="border rounded shadow-md p-4 flex justify-between">

                <div className='flex'>
                    <img
                        src={user.picture || default_picture}
                        alt={`${user.name}'s profile`}
                        className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                        <h3 className="text-lg font-semibold">{user.name}</h3>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                </div>

                <div className="space-x-2">
                    <button
                        onClick={() => onEdit(user.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(user.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Delete
                    </button>
                    <button
                        onClick={handleExpand}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        {isExpanded ? 'Hide Details' : 'Show Details'}
                    </button>
            </div>

            {isExpanded && (
                <div className="mt-4 border-t pt-4 ">
                    <p>
                        <strong>ID:</strong> {user.id}
                    </p>
                    <p>
                        <strong>Role:</strong> {user.role || 'N/A'}
                    </p>
                    <p>
                        <strong>Created At:</strong> {user.createdAt || 'N/A'}
                    </p>
                    {/* Add more user details here */}
                </div>
            )}
        </div>
    );
}
