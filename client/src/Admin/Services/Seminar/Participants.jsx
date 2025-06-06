import React, { useState } from 'react';

export default function Participants({ data, toggleOff }) {
    const participantsData = [
        {
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Admin',
            status: 'Active',
            lastActive: '2023-11-15',
        },
        {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'User',
            status: 'Inactive',
            lastActive: '2023-11-01',
        },
        {
            name: 'Peter Jones',
            email: 'peter.jones@example.com',
            role: 'Editor',
            status: 'Active',
            lastActive: '2023-11-20',
        },
    ];

    const [section, setSection] = useState('participants');

    return (
        <div
            style={{
                position: 'fixed',
                top: '5%',
                left: '15%',
                width: '70%',
                height: '90vh',
                zIndex: 1000,
                backgroundColor: 'white',
                border: '5px solid black',
            }}
        >
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-semibold mb-4">{data.title}</h2>

                <div className="flex justify-start space-x-4 mb-4">
                    <button
                        onClick={() => setSection('participants')}
                        className={`font-bold py-2 px-4 rounded ${
                            section === 'participants'
                                ? 'bg-blue-500 hover:bg-blue-700 text-white'
                                : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
                        }`}
                    >
                        All Participants
                    </button>
                    <button
                        onClick={() => setSection('application')}
                        className={`font-bold py-2 px-4 rounded ${
                            section === 'application'
                                ? 'bg-blue-500 hover:bg-blue-700 text-white'
                                : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
                        }`}
                    >
                        Application Requests
                    </button>
                </div>

                {/* ALL PARTICIPANTS */}
                {section === 'participants' && (
                    <div className="overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Role
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Last Active
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {participantsData.map((participant, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {participant.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {participant.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {participant.role}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ${
                                                    participant.status ===
                                                    'Active'
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900'
                                                        : 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900'
                                                }`}
                                            >
                                                {participant.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {participant.lastActive}
                                        </td>
                                        <td className="px-6 py-4">
                                            <a
                                                href="#"
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* ALL APPLICATION REQUEST */}
                {section === 'application' && (
                    <div className="overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Role
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {participantsData.map((participant, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {participant.name}
                                        </th>

                                        <td className="px-6 py-4">
                                            {participant.role}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ${
                                                    participant.status ===
                                                    'Active'
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900'
                                                        : 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900'
                                                }`}
                                            >
                                                {participant.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a
                                                href="#"
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
