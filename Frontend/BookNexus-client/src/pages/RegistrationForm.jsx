import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
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
    const [serverError, setServerError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formErrors = { ...errors };
        setServerError('');  

        if (formData.password !== formData.passwordConfirmation) {
            formErrors.passwordConfirmation = 'Passwords do not match';
        } else {
            formErrors.passwordConfirmation = '';
        }

        setErrors(formErrors);

        if (!formErrors.username && !formErrors.password && !formErrors.passwordConfirmation) {
            setIsSubmitting(true);  
            try {
                const dataToSubmit = {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    password_confirmation: formData.passwordConfirmation,  
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                };
                console.log(dataToSubmit,'submitt');
                

                const response = await axios.post('http://127.0.0.1:8000/register/', dataToSubmit);
                
                if (response.data.message === 'User registered successfully.') {
                    console.log('Registration successful', response.data);
                } else {
                    setServerError('Registration failed, please try again!');
                }
            } catch (error) {
                setServerError('An error occurred, please try again!');
                console.error('Error submitting form:', error);
            } finally {
                setIsSubmitting(false);  
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-white text-2xl text-center mb-6">Registration Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label htmlFor="username" className="text-white text-sm">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="email" className="text-white text-sm">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="firstName" className="text-white text-sm">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="lastName" className="text-white text-sm">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="password" className="text-white text-sm">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="passwordConfirmation" className="text-white text-sm">Confirm Password</label>
                        <input
                            type="password"
                            id="passwordConfirmation"
                            name="passwordConfirmation"
                            value={formData.passwordConfirmation}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {errors.passwordConfirmation && <p className="text-red-500 text-xs mt-1">{errors.passwordConfirmation}</p>}
                    </div>

                    {serverError && <p className="text-red-500 text-xs mt-2">{serverError}</p>}

                    <button 
                        type="submit" 
                        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
