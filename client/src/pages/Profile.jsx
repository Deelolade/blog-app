import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const { currentUser } = useSelector(state => state.user)
    const filePickerRef = useRef()
    const handleImageChange = (e) => {
        setImageFile(e.target.files[0])
        const file = e.target.files[0];
        if (file) {
            setImageFile(file)
            setImageFileUrl(URL.createObjectURL(file))
        }
    }
    console.log(imageFile) 
    useEffect(()=>{ 
        if(imageFile){
            uploadImage()
        }
    },[imageFile])

    const uploadImage = async ()=>{
        console.log("uploading image..........")
    }
    return (
        <>
            <form className='w-screen flex  justify-center items-center'>
                <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
                <div className="flex  flex-col w-72 justify-center items-center">
                    <div className="" onClick={() => filePickerRef.current.click()} >
                        <img src={imageFileUrl || currentUser.profilePicture} alt="" className='w-52 h-52 rounded-full' />
                    </div>
                    <input type="text" id='username' placeholder='Username' defaultValue={currentUser.username} className='px-4 py-3 rounded-xl w-64 text-white my-3 bg-gray-500' />
                    <input type="text" id='Email' placeholder='Email' defaultValue={currentUser.email} className='px-4 py-3 w-64 rounded-xl text-white my-3 bg-gray-500' />
                    <input type="text" id='password' placeholder='********' className='px-4 py-3 text-white w-64 rounded-xl my-3 bg-gray-500' />
                    <button className='bg-green-500 hover:bg-green-600 text-white rounded-lg my-3 py-2 font-medium px-4'>Update</button>
                </div>
            </form>
            <div className=" flex space-x-5 justify-center items-center">
                <span className='text-red-500 font-medium hover:underline'>Delete Account</span>
                <span className='text-blue-500 font-medium hover:underline'>Log Out</span>
            </div>
        </>
    )
}

export default Profile
