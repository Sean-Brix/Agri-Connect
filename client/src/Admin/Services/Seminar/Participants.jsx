import React, { useEffect, useState } from 'react';

export default function Participants({ data, toggleOff }) {
    const [section, setSection] = useState('participants');
    const [participants, setParticipants] = useState([]);
    const [statsVisible, setStatsVisible] = useState(false);
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [totalCounts, setTotalCounts] = useState({
        total: 0,
        attended: 0,
        cancelled: 0,
        noShow: 0,
        registered: 0,
    });
    const [showSelect, setShowSelect] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchParticipants();
    }, [data.id]);

    const fetchParticipants = async () => {
        try {
            const response = await fetch(
                `/api/seminars/getParticipants?seminar_id=${data.id}`
            );
            const users = await response.json();
            const participantList = users.payload.list;
            setParticipants(participantList);
            updateCounts(participantList);
        } catch (error) {
            console.error('Error fetching participants:', error);
        }
    };

    const updateCounts = (participantList) => {
        const initialCounts = {
            total: participantList.length,
            attended: participantList.filter((p) => p.status === 'Attended')
                .length,
            cancelled: participantList.filter((p) => p.status === 'Cancelled')
                .length,
            noShow: participantList.filter((p) => p.status === 'No Show')
                .length,
            registered: participantList.filter((p) => p.status === 'Registered')
                .length,
        };
        setTotalCounts(initialCounts);
    };

    const handleStatusUpdate = async (e) => {
        e.preventDefault();

        const newStatus = e.target.value;
        const userId = e.target.closest('tr').querySelector('th').textContent;

        await updateStatus(userId, newStatus);
    };

    const updateStatus = async (userId, newStatus) => {
        const participant_id = participants.find(
            (participant) => participant.id == userId
        )?.participant_id;

        try {
            const response = await fetch(
                '/api/seminars/participants/updateStatus',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        participants_id: participant_id,
                        new_status: newStatus,
                    }),
                }
            );

            if (!response.ok) {
                console.error('Failed to update status:', response.status);
                alert('Failed to update status. Please try again.');
                return;
            }
            const updatedResponse = await fetch(
                `/api/seminars/getParticipants?seminar_id=${data.id}`
            );
            const updatedUsers = await updatedResponse.json();

            const updatedParticipantList = updatedUsers.payload.list;
            setParticipants(updatedParticipantList);

            const updatedCounts = {
                total: updatedParticipantList.length,
                attended: updatedParticipantList.filter(
                    (p) => p.status === 'Attended'
                ).length,
                cancelled: updatedParticipantList.filter(
                    (p) => p.status === 'Cancelled'
                ).length,
                noShow: updatedParticipantList.filter(
                    (p) => p.status === 'No Show'
                ).length,
                registered: updatedParticipantList.filter(
                    (p) => p.status === 'Registered'
                ).length,
            };
            setTotalCounts(updatedCounts);
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Error updating status. Please try again.');
        }
    };

    const handleToggleSelectParticipant = (userId) => {
        setSelectedParticipants((prevSelected) => {
            if (prevSelected.includes(userId)) {
                return prevSelected.filter((id) => id !== userId);
            } else {
                return [...prevSelected, userId];
            }
        });
    };

    const handleSearchChange = async (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);

        if (searchTerm === '') {
            fetchParticipants();
        } else {
            try {
                const response = await fetch(
                    `/api/seminars/getParticipants?seminar_id=${data.id}`
                );
                const users = await response.json();
                const allParticipants = users.payload.list;

                const filteredParticipants = allParticipants.filter(
                    (participant) =>
                        participant.firstname
                            .toLowerCase()
                            .includes(searchTerm) ||
                        participant.lastname
                            .toLowerCase()
                            .includes(searchTerm) ||
                        participant.email_address
                            .toLowerCase()
                            .includes(searchTerm)
                );
                setParticipants(filteredParticipants);
                updateCounts(filteredParticipants);
            } catch (error) {
                console.error('Error fetching participants:', error);
            }
        }
    };

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

                {/* HEADER */}
                <div className="flex flex-col items-start justify-between mb-4 border p-4 rounded">
                    <h2 className="text-2xl font-semibold mb-2">
                        {data.title}
                    </h2>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className="font-semibold pr-2">Speaker:</td>
                                <td className="text-lg text-gray-800">
                                    {data.speaker}
                                </td>
                            </tr>
                            <tr>
                                <td className="font-semibold pr-2">
                                    Location:
                                </td>
                                <td className="text-lg text-gray-800">
                                    {data.location}
                                </td>
                            </tr>
                            <tr>
                                <td className="font-semibold pr-2">Status:</td>
                                <td className="text-lg text-gray-800">
                                    {data.status}
                                </td>
                            </tr>
                            <tr>
                                <td className="font-semibold pr-2">Dates:</td>
                                <td className="text-lg text-gray-800">
                                    {new Date(
                                        data.start_date
                                    ).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                    {' - '}
                                    {new Date(data.end_date).toLocaleDateString(
                                        undefined,
                                        {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        }
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* CONTROLS */}
                <button
                    onClick={toggleOff}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        fontSize: '20px',
                        cursor: 'pointer',
                        backgroundColor: 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '5px 10px',
                    }}
                >
                    X
                </button>

                <div className="flex justify-start space-x-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search participants..."
                        className="border p-2 rounded w-1/3"
                        onChange={handleSearchChange}
                    />
                    <button
                        onClick={() => setStatsVisible(!statsVisible)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                    >
                        Stats
                    </button>
                    <button
                        onClick={() =>
                            alert(
                                `Selected Participant IDs: ${selectedParticipants.join(
                                    ', '
                                )}`
                            )
                        }
                        className="bg-blue-200 hover:bg-blue-300 text-gray-800 font-bold py-2 px-4 rounded"
                    >
                        Select Multiple
                    </button>
                    <button
                        onClick={() => setShowSelect(!showSelect)}
                        className="bg-green-200 hover:bg-green-300 text-gray-800 font-bold py-2 px-4 rounded"
                    >
                        Select Multiple
                    </button>
                </div>
                {statsVisible && (
                    <div className="mb-4 p-4 border rounded shadow-md">
                        <h3 className="text-lg font-semibold mb-2">
                            Participant Statistics
                        </h3>
                        <p>Total Participants: {totalCounts.total}</p>
                        <p>Attended: {totalCounts.attended}</p>
                        <p>Registered: {totalCounts.registered}</p>
                        <p>Cancelled: {totalCounts.cancelled}</p>
                        <p>No Show: {totalCounts.noShow}</p>
                    </div>
                )}

                {section === 'participants' && (
                    <div className="overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-3 py-3">
                                        ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        FULLNAME
                                    </th>
                                    <th scope="col" className="px-8 py-3">
                                        EMAIL
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        STATUS
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        Registration Date
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        Actions
                                    </th>
                                    {showSelect && (
                                        <th scope="col" className="px-3 py-3">
                                            Select
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {participants.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="px-6 py-[10%] text-center text-lg font-semibold bg-gray-100"
                                        >
                                            No participants found.
                                        </td>
                                    </tr>
                                ) : (
                                    participants.map((user, index) => (
                                        <tr
                                            key={index}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                        >
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {user.id}
                                            </th>
                                            <td className="px-6 py-4">
                                                {user.firstname} {user.lastname}
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.email_address}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ${
                                                        user.status ===
                                                        'Registered'
                                                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-900'
                                                            : user.status ===
                                                              'Attended'
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900'
                                                            : user.status ===
                                                              'Cancelled'
                                                            ? 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900'
                                                            : user.status ===
                                                              'No Show'
                                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900'
                                                            : 'bg-gray-100 text-gray-800 dark:bg-gray-200 dark:text-gray-900'
                                                    }`}
                                                >
                                                    {user.status || 'loading'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.reg_date}
                                            </td>

                                            <td className="px-6 py-4">
                                                <select
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    value={
                                                        user.status || 'loading'
                                                    }
                                                    onChange={
                                                        handleStatusUpdate
                                                    }
                                                >
                                                    <option value="Registered">
                                                        Registered
                                                    </option>
                                                    <option value="Attended">
                                                        Attended
                                                    </option>
                                                    <option value="Cancelled">
                                                        Cancelled
                                                    </option>
                                                    <option value="No Show">
                                                        No Show
                                                    </option>
                                                </select>
                                            </td>
                                            {showSelect && (
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedParticipants.includes(
                                                            user.id
                                                        )}
                                                        onChange={() =>
                                                            handleToggleSelectParticipant(
                                                                user.id
                                                            )
                                                        }
                                                    />
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
