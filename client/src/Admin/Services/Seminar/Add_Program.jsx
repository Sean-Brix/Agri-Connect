import { useState } from 'react'
import default_seminar_pic from '../../../Assets/default_seminar_pic.jpg';

export default function Add_Program({programList, setProgramList, fetchAndSetImageUrls, setShowAdd}) {

    const [newProgram, setNewProgram] = useState({
        title: '',
        description: '',
        location: '',
        startDate: '',
        endDate: '',
        openTime: '',
        closeTime: '',
        maxParticipants: '',
        speaker: '',
        registrationDeadline: '',
        photo: '',
    });

    const handleAddProgram = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/seminars/addSeminar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: newProgram.title,
                    description: newProgram.description,
                    location: newProgram.location,
                    start_date: newProgram.startDate,
                    end_date: newProgram.endDate,
                    start_time: newProgram.openTime,
                    end_time: newProgram.closeTime,
                    capacity: newProgram.capacity,
                    speaker: newProgram.speaker,
                    registration_deadline: newProgram.registrationDeadline,
                }),
            });
            const data = await response.json();

            // Create Body
            const formData = new FormData();
            // If newImage is a base64 string, convert it to a Blob
            let imageFile;
            if (
                typeof newImage === 'string' &&
                newImage.startsWith('data:image')
            ){
                const response = await fetch(newImage);
                const blob = await response.blob();
                imageFile = new File([blob], 'image.png', { type: blob.type }); // You can adjust the filename and type
            } 
            else {
                imageFile = newImage; // Use the File object directly if it's already a File
            }
            formData.append('image', imageFile);
            formData.append('id', data.payload.id);
            const setImage = await fetch('/api/seminars/setPhoto', {
                method: 'POST',
                body: formData,
            });

            // If Fails
            if (!setImage.ok) {
                const data = await setImage.json();
                console.log(data.payload.error);
                alert('Failed to upload image');
                return;
            }

            if (response.ok) {
                // Program added successfully, update the program list
                const updatedList = await fetchAndSetImageUrls([
                    data.payload,
                    ...programList,
                ]);
                setProgramList(updatedList);
                setShowAdd(false); // Close the modal
                setNewProgram({
                    title: '',
                    description: '',
                    location: '',
                    start_date: '',
                    end_date: '',
                    start_time: '',
                    end_time: '',
                    capacity: '',
                    speaker: '',
                    registrationDeadline: '',
                    photo: '',
                });

                return;
            }

            // Handle error response
            console.error('Failed to add program:', data.payload.Error);
            alert('All Parameters Required');
            
        } catch (error) {
            console.error('Error adding program:', error);
        }
    };

    // upload image
    const [newImage, setNewImage] = useState(default_seminar_pic);

    const changeImage = (event) => {
        event.preventDefault();

        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewImage(reader.result);
            };
            reader.readAsDataURL(file);

            setNewImage(file);
        } else {
            // Revert to default if no file selected
            setNewImage(default_seminar_pic);
        }
    };

    return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <form
            className="bg-white rounded-2xl shadow-2xl p-0 w-full max-w-md relative border border-gray-100 animate-fade-in"
            onSubmit={() => setShowAdd(true)}
            style={{ minWidth: 320 }}
        >
            {/* HEADER */}
            <div className="flex justify-between items-center border-b border-gray-100 px-7 py-5">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Add Program
                </h2>
                <button
                    type="button"
                    className="text-gray-400 hover:text-gray-700 text-2xl leading-none"
                    onClick={() => setShowAdd(false)}
                    aria-label="Close"
                >
                    &times;
                </button>
            </div>

            <div className="px-7 py-7 flex flex-col gap-4">

                {/* TITLE */}
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                        value={newProgram.title}
                        onChange={(e) =>
                            setNewProgram({
                                ...newProgram,
                                title: e.target.value,
                            })
                        }
                        required
                        autoFocus
                    />
                </div>

                {/* LOCATION */}
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                        Location
                    </label>
                    <input
                        type="text"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                        value={newProgram.location}
                        onChange={(e) =>
                            setNewProgram({
                                ...newProgram,
                                location: e.target.value,
                            })
                        }
                        required
                    />
                </div>

                {/* DATE */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                            Start Date
                        </label>
                        <input
                            type="date"
                            className="w-full border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                            value={newProgram.startDate}
                            onChange={(e) =>
                                setNewProgram({
                                    ...newProgram,
                                    startDate: e.target.value,
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
                            className="w-full border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                            value={newProgram.endDate || ''}
                            onChange={(e) =>
                                setNewProgram({
                                    ...newProgram,
                                    endDate: e.target.value,
                                })
                            }
                            required
                        />
                    </div>
                </div>

                {/* TIME */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                            Opening Time
                        </label>
                        <input
                            type="time"
                            className="w-full border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                            value={newProgram.openTime || ''}
                            onChange={(e) =>
                                setNewProgram({
                                    ...newProgram,
                                    openTime: e.target.value,
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
                            className="w-full border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                            value={newProgram.closeTime || ''}
                            onChange={(e) =>
                                setNewProgram({
                                    ...newProgram,
                                    closeTime: e.target.value,
                                })
                            }
                            required
                        />
                    </div>
                </div>

                {/* PARTICIPANTS */}
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                        Maximum Participants
                    </label>
                    <input
                        type="number"
                        min="1"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                        value={newProgram.capacity}
                        onChange={(e) =>
                            setNewProgram({
                                ...newProgram,
                                capacity: e.target.value,
                            })
                        }
                        required
                        placeholder="Enter maximum number of participants"
                    />
                </div>

                {/* SPEAKER */}
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                        Speaker Name
                    </label>
                    <input
                        type="text"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                        value={newProgram.speaker || ''}
                        onChange={(e) =>
                            setNewProgram({
                                ...newProgram,
                                speaker: e.target.value,
                            })
                        }
                        required
                        placeholder="Enter speaker name"
                    />
                </div>

                {/* DEADLINE */}
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                        Registration Deadline
                    </label>
                    <input
                        type="date"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                        value={
                            newProgram.registrationDeadline || ''
                        }
                        onChange={(e) =>
                            setNewProgram({
                                ...newProgram,
                                registrationDeadline:
                                    e.target.value,
                            })
                        }
                        required
                    />
                </div>

                {/* IMAGE AND DESCRIPTION */}
                <div className='fixed right-[5%] bg-white border-2 p-10'>

                    {/* IMAGE */}
                    <div className=" flex flex-col items-center gap-2 mb-[30px]">
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                            Upload Image{' '}
                            <span className="text-gray-300">
                                (optional)
                            </span>
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border border-gray-200 mt-2 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                            onChange={changeImage}
                        />
                        <img
                            src={newImage}
                            alt="Seminar"
                            className="w-full max-w-[300px] max-h-[200px] bg-amber-50 object-cover mt-2 rounded-lg border-2"
                        />
                    </div>
                
                    {/* DESCRIPTION */}
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                            Description
                        </label>
                        <textarea
                            className="w-full border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition resize-none"
                            value={newProgram.description}
                            onChange={(e) =>
                                setNewProgram({
                                    ...newProgram,
                                    description: e.target.value,
                                })
                            }
                            required
                            rows={3}
                        />
                    </div>

                </div>


                {/* SAVE */}
                <button
                    type="submit"
                    className="mt-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl py-2 transition-all shadow focus:ring-2 focus:ring-green-200 focus:outline-none w-full"
                    onClick={handleAddProgram}
                >
                    Add Program
                </button>
            </div>
        </form>
    </div>
  )
}
