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

    return (
        // Main Container
        <div className="flex-col">
            {/* Row Container */}
            <div className="border rounded shadow-md py-4 px-6 flex justify-between items-center">
                <div className="flex w-[70%]">
                    <img
                        src={account.picture}
                        alt={`${account.username}'s profile`}
                        className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                        <h3 className="text-lg font-semibold">
                            {account.username}
                        </h3>
                        <p className="text-gray-600">{account.email_address}</p>
                    </div>
                </div>

                <div className="space-x-2 flex w-[30%] justify-end">
                    <button
                        onClick={() => onEdit(account.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white w-[100px] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
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
                        ? 'p-4 border-t border shadow-md bg-green-100'
                        : 'p-0 border-0 shadow-none bg-transparent'
                }`}
            >
                {isExpanded && (
                    <Info_Block user={account}/>
                )}
            </div>
        </div>
    );
}
