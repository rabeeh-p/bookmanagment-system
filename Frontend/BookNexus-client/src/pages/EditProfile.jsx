import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../utils/authUtil"; 
const EditProfile = () => {
    
    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
            Swal.fire({
                icon: "warning",
                title: "Unauthorized!",
                text: "Please log in to edit your profile.",
                confirmButtonColor: "#FFD700",
            });
            setLoading(false);
            return;
        }

        axios.get("http://127.0.0.1:8000/profile/", {
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
                    icon: "error",
                    title: "Error!",
                    text: "Failed to load profile data.",
                    confirmButtonColor: "#FFD700",
                });
                setLoading(false);
            }
            });
    }, []);
    const sanitizeInput = (value) => {
        return value.replace(/[<>/"'`\\]/g, "");
    };

    // const handleChange = (e) => {
    //     setUser({ ...user, [e.target.name]: e.target.value });
    // };
    const handleChange = (e) => {
        const sanitizedValue = sanitizeInput(e.target.value);
        setUser({ ...user, [e.target.name]: sanitizedValue });
    };

    const validateInput = () => {
        for (const key in user) {
            if (!user[key].trim()) {
                Swal.fire({
                    icon: "warning",
                    title: "Validation Error!",
                    text: "Fields cannot be empty or contain only spaces.",
                    confirmButtonColor: "#FFD700",
                });
                return false;
            }
        }
        return true;
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateInput()) return;

        const accessToken = localStorage.getItem("access_token");

        axios.put("http://127.0.0.1:8000/profile/", user, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
        })
            .then(response => {
                
                
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Profile updated successfully.",
                    confirmButtonColor: "#FFD700",
                });
                navigate('/profile')
            
                
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    console.error('Unauthorized access - logging out');
                    handleLogout(navigate);  
                } else {
                    console.error('Error fetching books:', error);
                console.log(error,'err');
                
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: "Failed to update profile.",
                    confirmButtonColor: "#FFD700",
                });
                }
            });
    };

    if (loading) {
        return <p className="text-center text-white">Loading...</p>;
    }

    return (
        <div className="flex justify-center items-center min-h-">
            <div className="w-full max-w-md bg-gray-900 text-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-center mb-4">Edit Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-400">Username:</label>
                        <input type="text" name="username" value={user.username} onChange={handleChange} required 
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-500"/>
                    </div>

                    <div>
                        <label className="block text-gray-400">Email:</label>
                        <input type="email" name="email" value={user.email} onChange={handleChange} required 
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-500"/>
                    </div>

                    <div>
                        <label className="block text-gray-400">First Name:</label>
                        <input type="text" name="first_name" value={user.first_name} onChange={handleChange} required 
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-500"/>
                    </div>

                    <div>
                        <label className="block text-gray-400">Last Name:</label>
                        <input type="text" name="last_name" value={user.last_name} onChange={handleChange} required 
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-500"/>
                    </div>

                    <button type="submit" 
                        className="w-full bg-yellow-500 text-black py-2 rounded font-semibold hover:bg-yellow-600 transition">
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
