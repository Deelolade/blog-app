import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const SignIn = () => {
    const navigate = useNavigate();
    const [passwordType, setPasswordType] = useState('password');
    const [passwordIcon, setPasswordIcon] = useState(FaEye);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handlePasswordToggle = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
            setPasswordIcon(FaEyeSlash);
        } else {
            setPasswordType('password');
            setPasswordIcon(FaEye);
        }
    };


    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Form validation
    const validate = () => {
        let tempErrors = {};
        if (!formData.username.trim()) {
            tempErrors.username = "*Username is required*";
        }
        if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
            tempErrors.email = "Valid email is required";
        }
        if (formData.password.length < 6) {
            tempErrors.password = "Password must be at least 6 characters";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            return setErrors({ general: "Please fill out all fields" });
        }

        try {
            const res = await fetch("http://localhost:5000/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log(data);

            if (!res.ok) {
                return setErrors({ general: data.message || "Invalid credentials" });
            }

            // Save token & redirect
            localStorage.setItem("authToken", data.token);
            navigate("/");
        } catch (error) {
            console.error(error);
            setErrors({ general: "Something went wrong. Try again later." });
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>
                {successMessage && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black/20">
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter username"
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm">{errors.username}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter email"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="mt-1 w-full flex justify-between items-center px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <input
                                type={passwordType}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                className="outline-none w-[90%]"
                            />
                            <i
                                className="password-icon"
                                onClick={handlePasswordToggle}
                            >
                                {passwordIcon}
                            </i>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white outline py-2 rounded-lg  transition hover:outline-blue-200 "
                    >
                        Sign In
                    </button>
                    <OAuth />
                    <div className="text-center text-slate-500  mx-auto w-full">
                        <Link to='/sign-up' className="hover:underline"> Don't have an account</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
