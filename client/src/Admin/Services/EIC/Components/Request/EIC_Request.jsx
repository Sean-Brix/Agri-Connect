import React, { useState, useEffect } from 'react';

export default function EIC_Request() {
    const [requests, setRequests] = useState([
        {
            id: 1,
            account_id: 101,
            eic_id: 1,
            quantity: 2,
            status: 'Waiting',
            borrow_date: '2024-01-15',
            return_date: '2024-01-22',
            request_note: 'Need for project demo For testing purposes For testing purposes Insufficient stock',
        },
        {
            id: 2,
            account_id: 102,
            eic_id: 2,
            quantity: 1,
            status: 'Approved',
            borrow_date: '2024-01-16',
            return_date: '2024-01-23',
            request_note: 'For testing purposes',
        },
        {
            id: 3,
            account_id: 103,
            eic_id: 3,
            quantity: 3,
            status: 'Rejected',
            borrow_date: '2024-01-17',
            return_date: '2024-01-24',
            request_note: 'Insufficient stock',
        },
        {
            id: 4,
            account_id: 101,
            eic_id: 4,
            quantity: 1,
            status: 'Waiting',
            borrow_date: '2024-01-18',
            return_date: '2024-01-25',
            request_note: 'Need urgently',
        },
        {
            id: 5,
            account_id: 102,
            eic_id: 5,
            quantity: 2,
            status: 'Processing',
            borrow_date: '2024-01-19',
            return_date: '2024-01-26',
            request_note: 'Preparing shipment',
        },
        {
            id: 6,
            account_id: 103,
            eic_id: 1,
            quantity: 1,
            status: 'Waiting',
            borrow_date: '2024-01-20',
            return_date: '2024-01-27',
            request_note: 'Extra item needed',
        },
    ]);
    const [eics, setEics] = useState([
        { id: 1, Name: 'Resistor', stock: 100, category: 'Electrical' },
        { id: 2, Name: 'Capacitor', stock: 50, category: 'Electrical' },
        { id: 3, Name: 'Inductor', stock: 75, category: 'Electrical' },
        { id: 4, Name: 'Transistor', stock: 120, category: 'Semiconductor' },
        { id: 5, Name: 'Diode', stock: 80, category: 'Semiconductor' },
        {
            id: 6,
            Name: 'Integrated Circuit',
            stock: 60,
            category: 'Semiconductor',
        },
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch('/api/eic_requests');
                const data = await response.json();
                setRequests(data);
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        const fetchAccounts = async () => {
            try {
                const response = await fetch('/api/accounts');
                const data = await response.json();
                setAccounts(data);
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        };

        const fetchEics = async () => {
            try {
                const response = await fetch('/api/eic');
                const data = await response.json();
                setEics(data);
            } catch (error) {
                console.error('Error fetching eics:', error);
            }
        };

        fetchRequests();
        fetchAccounts();
        fetchEics();
    }, []);

    const filteredRequests = requests.filter((request) => {
        const account = accounts.find(
            (account) => account.id === request.account_id
        );
        const eic = eics.find((eic) => eic.id === request.eic_id);

        const searchMatch =
            request.request_note
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            account?.username
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            eic?.Name?.toLowerCase().includes(searchQuery.toLowerCase());

        const statusMatch =
            statusFilter === '' || request.status === statusFilter;

        return searchMatch && statusMatch;
    });

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value);
    };

    const handleApprove = async (id) => {
        try {
            await fetch(`/api/eic_requests/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: 'Approved',
                }),
            });
            setRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request.id === id
                        ? { ...request, status: 'Approved' }
                        : request
                )
            );
        } catch (error) {
            console.error('Error approving request:', error);
        }
    };

    const handleReject = async (id) => {
        try {
            await fetch(`/api/eic_requests/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: 'Rejected',
                }),
            });
            setRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request.id === id
                        ? { ...request, status: 'Rejected' }
                        : request
                )
            );
        } catch (error) {
            console.error('Error rejecting request:', error);
        }
    };

    const RequestCard = ({ request }) => {
        const account = accounts.find(
            (account) => account.id === request.account_id
        );
        const eic = eics.find((eic) => eic.id === request.eic_id);

        return (
            <div className="w-full p-6 rounded-lg shadow-xl bg-white flex flex-col justify-between h-[500px]">
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {eic?.Name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                        Requested by: {account?.username}
                    </p>

                    <div className="overflow-x-auto">
                        <table className="min-w-full leading-normal">
                            <tbody>
                                <tr>
                                    <td className="px-2 py-1 border-b border-gray-200 bg-white text-sm">
                                        Item ID
                                    </td>
                                    <td className="px-2 py-1 border-b border-gray-200 bg-white text-sm">
                                        {eic?.id}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-1 border-b border-gray-200 bg-white text-sm">
                                        Quantity
                                    </td>
                                    <td className="px-2 py-1 border-b border-gray-200 bg-white text-sm">
                                        {request.quantity}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-1 border-b border-gray-200 bg-white text-sm">
                                        Status
                                    </td>
                                    <td className="px-2 py-1 border-b border-gray-200 bg-white text-sm">
                                        {request.status}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-1 border-b border-gray-200 bg-white text-sm">
                                        Borrow Date
                                    </td>
                                    <td className="px-2 py-1 border-b border-gray-200 bg-white text-sm">
                                        {request.borrow_date}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-1 border-b border-gray-200 bg-white text-sm">
                                        Return Date
                                    </td>
                                    <td className="px-2 py-1 border-b border-gray-200 bg-white text-sm">
                                        {request.return_date}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-1 border-b border-gray-200 bg-white text-sm">
                                        Current Stock
                                    </td>
                                    <td className="px-2 py-1 border-b border-gray-200 bg-white text-sm">
                                        {eic?.stock}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-1 border-b border-gray-200 bg-white text-sm">
                                        EIC Category
                                    </td>
                                    <td className="px-2 py-1 border-b border-gray-200 bg-white text-sm">
                                        {eic?.category}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-1 border-b border-gray-200 bg-white text-sm">
                                        Request Note
                                    </td>
                                    <td className="px-2 py-1 border-b border-gray-200 bg-white text-sm">
                                        <div className="relative">
                                            <details className="dropdown">
                                                <summary className="m-1 btn">
                                                    View Note
                                                </summary>
                                                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                                    <li>
                                                        <span>
                                                            {
                                                                request.request_note
                                                            }
                                                        </span>
                                                    </li>
                                                </ul>
                                            </details>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                        onClick={() => handleApprove(request.id)}
                    >
                        Approve
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                        onClick={() => handleReject(request.id)}
                    >
                        Reject
                    </button>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="flex flex-col md:flex-col justify-between items-center mb-10 max-w-7xl mx-auto gap-4 p-6">
                <div className="flex-1 flex flex-col md:flex-row gap-4 w-full">
                    <div className="relative w-full max-w-lg">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search requests..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-black bg-white shadow"
                        />
                    </div>
                    <select
                        onChange={handleStatusChange}
                        className="w-full md:w-44 border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 shadow"
                        value={statusFilter}
                    >
                        <option value="">All Statuses</option>
                        <option value="Waiting">Waiting</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Processing">Processing</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-auto p-4 rounded-2xl">
                {filteredRequests.length === 0 ? (
                    <div className="text-center w-full">No requests found</div>
                ) : (
                    filteredRequests.map((request) => (
                        <RequestCard key={request.id} request={request} />
                    ))
                )}
            </div>
        </>
    );
}
