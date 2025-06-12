import { Link } from 'react-router-dom';
import User from './User/User.jsx';
import { useEffect, useState } from 'react';

export default function Profiles({details}) {
    const [userList, setUserList] = useState([]);
    const [filter, setFilter] = useState({
        roles: "none",
        client_profile: "none"
    });

    // Initial Render
    useEffect(() => {

        (async () => {

            // Get the list of accounts
            const response = await fetch('/api/Accounts/allAccounts');
            const data = await response.json();

            if (data.payload.error || !response.ok) {
                console.log(data.payload.error);
                alert(data.message);
                return;
            } 

            setUserList(data.payload);  
            
        })();
    }, []);

    useEffect(()=>{

        console.log(filter.client_profile);
        console.log(filter.roles);

        //! ERROR: Role filter does not work properly and shows random user 

        (async () => {

            // Get the list of accounts
            const response = await fetch(`/api/Accounts/allAccounts?access=${filter.roles}&client=${filter.client_profile}`);
            const data = await response.json();

            if (data.payload.error || !response.ok) {
                console.log(data.payload.error);
                alert(data.message);
                return;
            } 

            setUserList(data.payload);  
            
        })();

    }, [filter])


    return (
        <div className="min-h-screen bg-gray-50 py-6 px-2 sm:py-10 sm:px-4 mt-10">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 md:mb-0 text-center md:text-left">
                        Account Management
                    </h1>
                    <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Search profiles..."
                            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                        <select
                            className="w-full sm:w-40 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            onChange={(e) => setFilter({ ...filter, roles: e.target.value })}
                        >
                            <option value="none">All Roles</option>
                            <option value="Admin">Admin</option>
                            <option value="Super Admin">Super Admin</option>
                            <option value="User">User</option>
                        </select>
                        <select
                            className="w-full sm:w-40 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            onChange={(e) => setFilter({ ...filter, client_profile: e.target.value })}
                        >
                            <option value="">Sort by</option>
                            <option value="name">Name</option>
                            <option value="date">Date</option>
                        </select>
                    </div>
                </div>
                <hr className="mb-6" />
                <div className="flex flex-col gap-4">
                    {userList.length === 0 ? (
                        <div className="text-center text-gray-500 py-12">
                            No profiles found.
                        </div>
                    ) : (
                        userList.map((user, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition p-4"
                            >
                                <User
                                    user={user}
                                    details={details}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
