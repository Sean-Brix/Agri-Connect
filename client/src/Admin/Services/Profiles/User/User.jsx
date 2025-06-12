import React, { useEffect } from 'react';
import { useState } from 'react';

// ASSETS
import default_picture from '../../../../Assets/default_picture.png';

// Global Component
import Info_Block from '../../../../Components/settings/AccountProfile/Info_Block';

export default function User({ user, onEdit }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [account, setAccount] = useState(user);

    useEffect(()=>{

        (async ()=>{
            const getImage = await fetch(`/api/Accounts/getProfile?user_id=${user.id}`)

            if(getImage.status == 204){
                setAccount({...account, picture: default_picture});
                return;
            }
            
            const imageBlob = await getImage.blob()
            const imageObjectURL = URL.createObjectURL(imageBlob);

            setAccount({...account, picture: imageObjectURL});

        })()

    }, [])

    // Modal component
    const Modal = ({ open, onClose, children }) => {
        if (!open) return null;
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 transition-opacity">
            <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full relative animate-fade-in max-h-[95vh] flex flex-col border border-blue-100">
                <button
                onClick={onClose}
                className="absolute top-5 right-5 text-gray-400 hover:text-blue-600 text-2xl font-bold focus:outline-none transition-colors"
                aria-label="Close"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
                <div className="p-10 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50" style={{ maxHeight: '85vh' }}>
                {children}
                </div>
            </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex items-center justify-between w-full max-w-4xl bg-white rounded-xl shadow p-6 ">
                <div className="flex items-center gap-4">
                    <img
                        src={account.picture}
                        alt={`${account.username}'s profile`}
                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
                    />
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">{account.username}</h3>
                        <p className="text-gray-500">{account.email_address}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => onEdit(account.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg shadow transition"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => setIsExpanded(true)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-5 rounded-lg shadow transition"
                    >
                        Details
                    </button>
                </div>
            </div>

            {/* Modal for Details */}
            <Modal open={isExpanded} onClose={() => setIsExpanded(false)}>
                <h2 className="text-2xl font-bold mb-6 text-blue-700 flex items-center gap-2">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.797.607 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    User Details
                </h2>
                <div className="mb-4">
                    <Info_Block user={account} />
                </div>
            </Modal>
        </div>
    );
}
