import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
    const navigate = useNavigate();
    const [passwordType, setPasswordType] = useState("password");
    const [passwordIcon, setPasswordIcon] = useState(FaEye);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handlePasswordToggle = ()=> {
        if(passwordType === "password"){
            setPasswordType("text")
            setPasswordIcon(FaEyeSlash)
        }
        if(passwordType === "text"){
            setPasswordType("password")
            setPasswordIcon(FaEye)
        }
    }
    // Form validation
    const validate = () => {
        let tempErrors = {};
        if (!formData.username.trim()) {
            tempErrors.username = "*Username is required*";
        }
        if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
            tempErrors.email = "*Valid email is required*";
        }
        if (formData.password.length < 6) {
            tempErrors.password = "*Password must be at least 6 characters*";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        if (!formData.username || !formData.email || !formData.password) {
            return setErrors("please fill out all fields");
        }
        try {
            const res = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log(data);
            if (data.success === false) {
                return setErrors("Error posting data");
            }
            setSuccessMessage(true);
            setTimeout(() => navigate("/sign-in"), 2000);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-screen max-w-md p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
                {successMessage && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black/20">
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username Field */}
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
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email}</p>
                        )}
                    </div>
                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-1 w-full flex justify-between items-center px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <input
                                type={passwordType}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                className="outline-none w-[90%]"
                            />
                            <button
                                className="password-icon"
                                onClick={handlePasswordToggle}
                            >
                                {passwordIcon}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password}</p>
                        )}
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white outline py-2 rounded-lg  transition hover:outline-green-200"
                    >
                        Sign Up
                    </button>

                    <OAuth />
                    <div className="text-center text-slate-500  mx-auto w-full">
                        <Link to="/sign-in" className="hover:underline">
                            {" "}
                            Already have an account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
