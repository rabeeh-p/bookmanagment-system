import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RegistrationForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirmation: '',
    });

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirmation: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

  

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        const sanitizedValue = value.replace(/[<>]/g, '');
    
        if (name === 'username' && /\s/.test(sanitizedValue)) {
            setErrors(prev => ({ ...prev, username: 'No spaces allowed' }));
        } 
        else if ((name === 'firstName' || name === 'lastName') && /[^a-zA-Z]/.test(sanitizedValue)) {
            setErrors(prev => ({ ...prev, [name]: 'Only letters allowed' }));
        } 
        else {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    
        setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
    };
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formErrors = { ...errors };

        if (formData.password !== formData.passwordConfirmation) {
            formErrors.passwordConfirmation = 'Passwords do not match';
        } else {
            formErrors.passwordConfirmation = '';
        }

        setErrors(formErrors);

        if (!Object.values(formErrors).some(err => err)) {
            setIsSubmitting(true);

            try {
                const response = await axios.post('http://127.0.0.1:8000/register/', {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    password_confirmation: formData.passwordConfirmation,
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                });

                if (response.data.message === 'User registered successfully.') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Registration Successful!',
                        text: 'You can now log in.',
                        confirmButtonColor: '#FFD700',
                        timer: 2000,
                        showConfirmButton: true,
                    });
                    navigate('/login');
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Registration Failed!',
                        text: 'Please try again.',
                        confirmButtonColor: '#FFD700',
                    });
                }
            } catch (error) {
                if (error.response && error.response.data.errors) {
                    const errors = error.response.data.errors;
                    let errorMessage = Object.values(errors).join("\n");

                    Swal.fire({
                        icon: 'error',
                        title: 'Registration Failed!',
                        text: errorMessage,
                        confirmButtonColor: '#FFD700',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'An unexpected error occurred. Please try again!',
                        confirmButtonColor: '#FFD700',
                    });
                }

                console.log('Registration error:', error);
            } finally {
                setIsSubmitting(false);
            }

        }
    };

    return (

        <div className="flex justify-center items-center min-h-screen ">
            <div className="bg-gray-800 bg-opacity-90 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <h2 className="text-white text-3xl text-center font-semibold mb-6">Create an Account</h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div className="relative">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Username"
                            className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
                            required
                        />
                        <span className="absolute left-3 top-3 text-gray-400"><i className="fas fa-user"></i></span>
                    </div>

                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
                            required
                        />
                        <span className="absolute left-3 top-3 text-gray-400"><i className="fas fa-envelope"></i></span>
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
                            required
                        />
                        <span className="absolute left-3 top-3 text-gray-400"><i className="fas fa-id-card"></i></span>
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
                            required
                        />
                        <span className="absolute left-3 top-3 text-gray-400"><i className="fas fa-id-card"></i></span>
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
                            required
                        />
                        <span className="absolute left-3 top-3 text-gray-400"><i className="fas fa-lock"></i></span>
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            id="passwordConfirmation"
                            name="passwordConfirmation"
                            value={formData.passwordConfirmation}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
                            required
                        />
                        <span className="absolute left-3 top-3 text-gray-400"><i className="fas fa-lock"></i></span>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Registering...' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>

    );
};

export default RegistrationForm;
