import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from "../utils/authUtil"; 

const Profile = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token"); 

        if (!accessToken) {
            Swal.fire({
                icon: "warning",
                title: "Unauthorized!",
                text: "Please log in to access your profile.",
                confirmButtonColor: "#FFD700",  
            });
            setLoading(false);
            return;
        }
        axios.get('http://127.0.0.1:8000/profile/', {
            headers: {
                Authorization: `Bearer ${accessToken}`,  
            },
        })
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    console.error('Unauthorized access - logging out');
                    handleLogout(navigate);  
                } else {
                    console.error('Error fetching books:', error);
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to load profile data.',
                    confirmButtonColor: '#FFD700'  
                });
                setLoading(false);
            }
            });
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-white text-2xl text-center mb-6">Profile</h2>
                
                {loading ? (
                    <p className="text-white text-center">Loading...</p>
                ) : user ? (
                    <div className="space-y-4 text-white">
                        <div>
                            <p className="text-gray-400 text-sm">Username</p>
                            <p className="text-lg">{user.username}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Email</p>
                            <p className="text-lg">{user.email}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">First Name</p>
                            <p className="text-lg">{user.first_name}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Last Name</p>
                            <p className="text-lg">{user.last_name}</p>
                        </div>

                        <button
                        onClick={()=>navigate('/editprofile')}
                            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Edit Profile
                        </button>
                    </div>
                ) : (
                    <p className="text-red-500 text-center">No user data found.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
