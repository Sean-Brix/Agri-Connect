import React, { useRef, useState } from 'react'

function Edit_Profile({admin_navigate, details}) {

  const [image, setImage] = useState(null);
  
  const uploadProfile = async(event)=>{
    event.preventDefault();

    const file = event.target.files[0];

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/Accounts/uploadProfile',{
        method:'POST',
        body: formData
      }
    );
    
    if(!response.ok){
      const data = await response.json();
      console.log(data.payload.error);
      return
    }

    const newProfile = await response.blob();
    const newUrl = URL.createObjectURL(newProfile);
    
    console.log(newUrl);
    details.setProfile((prev)=>({...prev, picture: newUrl}));

  }

  return (
    <div className='flex flex-col justify-center items-center font-bold bg-orange-300 w-full h-[91%] mt-[5%]'>

      <img
        src={details.picture}
        alt="Profile"
        className="w-32 h-32 sm:w-40 sm:h-40 mt-10 mb-6 object-cover border-2 rounded-full shadow-lg" 
      />

      {/* UPLOAD PROFILE PICTURE */}
      <input 
        type="file" 
        accept="image/*"
        onChange={uploadProfile}
        className="block w-[40%] text-sm text-gray-900
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-orange-50 file:text-orange-700
          hover:file:bg-orange-100
          cursor-pointer border-4 p-4"
      />

      <div className="text-center">
          <div
              className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 cursor-pointer bg-green-500 text-black rounded-lg hover:bg-green-600 transition text-sm sm:text-base border-2 border-blue-800"
              onClick={()=>admin_navigate("account")}
          >
                  <i className="fa-solid fa-pen-to-square"></i>
                  Save Profile
          </div>
      </div>

    </div>
  )
}

export default Edit_Profile