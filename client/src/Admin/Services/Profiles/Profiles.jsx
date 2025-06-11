import { Link } from 'react-router-dom';
import User from './User/User.jsx';
import { useEffect, useState } from 'react';

export default function Profiles() {
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
        <>
            <h1 className="text-3xl font-bold mt-[8%] text-center text-gray-800 mb-6">
                Account Management
            </h1>

            <hr />

            <div className="relative p-2 mt-6 flex justify-between">
                <div className="mb-2 w-[45%]">
                    <input
                        type="text"
                        placeholder="Search profiles..."
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4 flex space-x-2 p-2">
                    <select className=" border rounded w-25" onChange={(e)=>{setFilter({...filter, roles: e.target.value})}}>
                        <option value="none">All Roles</option>
                        <option value="Admin">Admin</option>
                        <option value="Super Admin">Super Admin</option>
                        <option value="User">User</option>
                    </select>
                    <select className=" border rounded w-25" onChange={(e)=>{setFilter({...filter, client_profile: e.target.value})}}>
                        <option value="">Sort by</option>
                        <option value="name">Name</option>
                        <option value="date">Date</option>
                    </select>
                </div>
            </div>

            {/* USER CONTAINER */}
            <div className="flex flex-col p-[5px] gap-4 h-[60%]">

                {/* ROWS */}
                {userList.map((user, index)=>{
                    return(

                        <User 
                            key={index}
                            user={user}

                            onEdit={() => {
                                alert('Edited');
                            }}
                        />

                    )
                })}
                
            </div>

        </>
    );
}
