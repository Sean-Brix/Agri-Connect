import { Link } from 'react-router-dom';
import User from './User.jsx';

export default function Profiles() {
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
                    <select className=" border rounded w-25">
                        <option value="">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="super_admin">Super Admin</option>
                        <option value="user">User</option>
                    </select>
                    <select className=" border rounded w-25">
                        <option value="">Sort by</option>
                        <option value="name">Name</option>
                        <option value="date">Date</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col p-[5px] gap-4 h-[60%]">

                <User
                    user={{
                        name: 'Sean-Brix',
                        email: 'kcseancalinao@gmail.com',
                        id: '01',
                        role: 'Super Admin',
                        createdAt: '08/06/2025',
                    }}
                    onDelete={() => {
                        alert('Deleted');
                    }}
                    onEdit={() => {
                        alert('Edited');
                    }}
                />

                <User
                    user={{
                        name: 'Rhenzy',
                        email: 'rhenzycruzat@gmail.com',
                        id: '02',
                        role: 'Super Admin',
                        createdAt: '08/07/2025',
                    }}
                    onDelete={() => {
                        alert('Deleted');
                    }}
                    onEdit={() => {
                        alert('Edited');
                    }}
                />
            </div>
        </>
    );
}
