import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import Modal from 'react-bootstrap/Modal';


const Profile = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const [modalopen, setmodalopen] = useState(false);
  const [formData, setformData] = useState({
    name: "",
    email: "",
    DOB: "",
    phone: "",
    address: "",
    pinCode: ""
  });

  const handleChange =(e)=>{
    const {name,value} = e.target
    setformData({
      ...formData,
      [name]:value
    });
  };

  const updateUser =()=>{
    console.log(formData); 
  }

  const handleEdit = () => {
    setformData({
      name: user.name || '',
      email: user.email || '',
      DOB: user.DOB || '',
      phone: user.phone || '',
      address: user.address || '',
      pinCode: user.pinCode || ''
    });
    setmodalopen(true);
  }
  const modalClose = () => {
    setmodalopen(false)
  }

  const [user, setuser] = useState([])
  const api_url = import.meta.env.VITE_API_URL

  const getProfile = async () => {
    try {
      const res = await axios.get(`${api_url}/api/user/get-single-user`, {
        headers: {
          Authorization: token
        }
      })
      setuser(res.data.user)
      console.log(res.data.user);
    } catch (error) {
      console.log(error);


    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
    getProfile();
  }, [])
  return (
    <>
      <div className="min-h-screen bg-slate-100 px-4 py-10">

        <div className="max-w-3xl mx-auto">

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-8 text-white">
              <div className="flex items-center gap-4">

                <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center text-3xl font-bold">
                  {user.name?.charAt(0)?.toUpperCase()}
                </div>

                <div>
                  <h2 className="text-2xl font-bold">My Profile</h2>
                  <p className="text-blue-100 text-sm mt-1">
                    Manage your personal information
                  </p>
                </div>

              </div>
            </div>

            {/* Form */}
            <div className="p-8">

              <h3 className="text-lg font-bold text-slate-800 mb-6">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={user.name || ""}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email || ""}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  />
                </div>

                {/* DOB */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={user.DOB || ""}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  />
                </div>

                {/* PIN */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    value={user.PinCode || ""}
                    placeholder="Enter PIN code"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  />
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={user.address || ""}
                    placeholder="Enter your complete address"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  />
                </div>

              </div>

              {/* Button */}
              <div className="flex justify-end mt-8">
                <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:scale-[1.02] transition duration-300"
                  onClick={handleEdit}
                >
                  Update Profile →
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>





      <Modal show={modalopen}>
        <Modal.Header>
          <h1>Update profile</h1>

        </Modal.Header>
        <Modal.Body>
          <input type="text" name='name' value={formData.name} onChange={handleChange} />
          <input type="text" name='email' value={formData.email} onChange={handleChange} />
          <input type="text" name='phone' value={formData.phone} onChange={handleChange} />
          <input type="text" name='DOB' value={formData.DOB} onChange={handleChange} />
          <input type="text" name='address' value={formData.address} onChange={handleChange} />
          <input type="text" name='pincode' value={formData.pinCode} onChange={handleChange} />
          <button onClick={updateUser}>Update user</button>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={modalClose}>close</button>
        </Modal.Footer>

      </Modal>


    </>
  )
}

export default Profile