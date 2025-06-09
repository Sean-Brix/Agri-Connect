import React from 'react';
import { useState } from 'react';

// ASSETS
import default_picture from '../../../Assets/default_picture.png';

export default function User({ user, onEdit }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        // Main Container
        <div className="flex-col">
            {/* Row Container */}
            <div className="border rounded shadow-md py-4 px-6 flex justify-between items-center">

                <div className="flex w-[70%]">
                    <img
                        src={user.picture || default_picture}
                        alt={`${user.username}'s profile`}
                        className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                        <h3 className="text-lg font-semibold">
                            {user.username}
                        </h3>
                        <p className="text-gray-600">{user.email_address}</p>
                    </div>
                </div>

                <div className="space-x-2 flex w-[30%] justify-end">
                    <button
                        onClick={() => onEdit(user.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white w-[100px] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Edit
                    </button>

                    <button
                        onClick={handleExpand}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-[130px] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        {isExpanded ? 'Hide Details' : 'Show Details'}
                    </button>
                </div>
            </div>

            {/* Pop-up Details */}
            <div
                className={`overflow-hidden transition-height duration-500 ease ${
                    isExpanded
                        ? 'max-h-96 p-4 border-t border shadow-md bg-green-100'
                        : 'max-h-0 p-0 border-0 shadow-none bg-transparent'
                }`}
            >
                {isExpanded && (
                    <div>
                        <p>
                            <strong>ID:</strong> {user.id}
                        </p>
                        <p>
                            <strong>Role:</strong> {user.access || 'N/A'}
                        </p>
                        <p>
                            <strong>Created At:</strong>{' '}
                            {user.created_at || 'N/A'}
                        </p>
                        {/* Add more user details here */}
                    </div>
                )}
            </div>
        </div>
    );
}
