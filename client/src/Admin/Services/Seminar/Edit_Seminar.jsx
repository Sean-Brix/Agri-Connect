import React, { useEffect, useRef, useState } from 'react';
import default_picture from '../../../Assets/default_seminar_pic.svg';

export default function Edit_Seminar({ data, toggleOff, setProgramList }) {
    // Render editing data
    const [newData, setNewData] = useState(data);
    const [image, setImage] = useState(default_picture);
    const [newImage, setNewImage] = useState(null);
    const changedImage = useRef(false);

    // Save the record
    const saveSeminar = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/seminars/updateSeminar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });

            if (!response.ok) {
                const data = await response.json();

                console.error(
                    'Failed to update seminar:',
                    response.status,
                    response.statusText,
                    data.payload.error
                );

                alert('Failed to update seminar. Please try again.');
                return;
            }

            setProgramList((prev) => {
                const index = prev.findIndex(
                    (item) => item.location === newData.location
                );
                if (index !== -1) {
                    const updatedList = [...prev];
                    updatedList[index] = newData;
                    return updatedList;
                } else {
                    return [newData, ...prev];
                }
            });

            // Exit
            if(!changeImage.current) return toggleOff();
            
            // Create Body
            const formData = new FormData();
            formData.append('image', newImage);
            formData.append('id', newData.id);

            // Request Changes
            const setImage = await fetch('/api/seminars/setPhoto',{
                method: 'POST',
                body: formData
            });

            changedImage.current = false;

            // If Failes
            if(!setImage.ok){
                const data = await response.json();
                console.log(data.payload.error);
                alert("Failed to upload image");
                return
            }

        } 
        catch (error) {
            console.error('Error updating seminar:', error);
            alert(
                'An error occurred while updating the seminar. Please try again.'
            );
        }
    };

    // Change image
    const changeImage = (event) => {
        event.preventDefault();

        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);

            setNewImage(file);
            changedImage.current = true;
        } 
        else {
            // Revert to default if no file selected
            setImage(default_picture);
            changedImage.current = false;
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <form
                className="bg-white rounded-2xl shadow-2xl p-0 w-full max-w-[30%] relative border border-gray-100"
                onSubmit={saveSeminar}
                style={{ minWidth: 280 }}
            >
                <div className="flex justify-between items-center border-b border-gray-100 px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Edit Seminar
                    </h2>
                    <button
                        type="button"
                        className="text-gray-400 hover:text-gray-700 text-2xl leading-none"
                        onClick={() => toggleOff()}
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>
                <div className="px-6 py-6 flex flex-col gap-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                            value={newData.title}
                            onChange={(e) =>
                                setNewData({
                                    ...newData,
                                    title: e.target.value,
                                })
                            }
                            required
                            autoFocus
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                            Location
                        </label>
                        <input
                            type="text"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                            value={newData.location}
                            onChange={(e) =>
                                setNewData({
                                    ...newData,
                                    location: e.target.value,
                                })
                            }
                            required
                            autoFocus
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                Start Date
                            </label>
                            <input
                                type="date"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                                value={newData.start_date}
                                onChange={(e) =>
                                    setNewData({
                                        ...newData,
                                        start_date: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                End Date
                            </label>
                            <input
                                type="date"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                                value={newData.end_date}
                                onChange={(e) =>
                                    setNewData({
                                        ...newData,
                                        end_date: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                Opening Time
                            </label>
                            <input
                                type="time"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                                value={newData.start_time}
                                onChange={(e) =>
                                    setNewData({
                                        ...newData,
                                        start_time: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                Closing Time
                            </label>
                            <input
                                type="time"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                                value={newData.end_time}
                                onChange={(e) =>
                                    setNewData({
                                        ...newData,
                                        end_time: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                            Maximum Participants
                        </label>
                        <input
                            type="number"
                            min="1"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                            value={newData.capacity}
                            onChange={(e) =>
                                setNewProgram({
                                    ...newData,
                                    capacity: e.target.value,
                                })
                            }
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                            Speaker Name
                        </label>
                        <input
                            type="text"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                            value={newData.speaker}
                            onChange={(e) =>
                                setNewData({
                                    ...newData,
                                    speaker: e.target.value,
                                })
                            }
                            required
                            placeholder="Enter speaker name"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                            Registration Deadline
                        </label>
                        <input
                            type="date"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                            value={newData.registration_deadline}
                            onChange={(e) =>
                                setNewData({
                                    ...newData,
                                    registration_deadline: e.target.value,
                                })
                            }
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                            Description
                        </label>
                        <textarea
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition resize-none"
                            value={newData.description}
                            onChange={(e) =>
                                setNewData({
                                    ...newData,
                                    description: e.target.value,
                                })
                            }
                            required
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                            Upload Image{' '}
                            <span className="text-gray-300">(optional)</span>
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                            onChange={changeImage}
                        />

                        <img
                            src={image}
                            alt="Seminar"
                            className="w-full h-32 object-cover rounded-md"
                        />

                    </div>
                    <button
                        type="submit"
                        className="mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg py-2 transition-colors shadow-none focus:ring-2 focus:ring-green-200 focus:outline-none w-full"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
