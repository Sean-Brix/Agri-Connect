import React, { useRef, useState } from 'react'

function Edit_Profile() {

  const [image, setImage] = useState(null);
  
  const uploadProfile = async(event)=>{
    event.preventDefault();

    const file = event.target.files[0];
    console.log(event.target.files);

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/Accounts/uploadProfile',{
        method:'POST',
        body: formData
      }
    );
    const data = await response.text();
    console.log(data);

  }

  return (
    <div className='flex flex-col justify-center items-center font-bold bg-orange-300 w-full h-[91%] mt-[5%]'>
        <h1 className="text-2xl mb-6">Edit Profile</h1>

        {/* UPLOAD PROFILE PICTURE */}
        <input 
          type="file" 
          accept="image/*"
          onChange={uploadProfile}
          className="block w-64 text-sm text-gray-900
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-orange-50 file:text-orange-700
            hover:file:bg-orange-100
            cursor-pointer"
        />

    </div>
  )
}

export default Edit_Profile