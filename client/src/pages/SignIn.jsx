import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Form validation
    const validate = () => {
        let tempErrors = {};

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
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            setErrors({ general: "Something went wrong. Try again later." });
        }
    };
    

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Field */}
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
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter password"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Sign In
                    </button>
                    <button
                        type="submit"
                        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                    >Sign up with Google</button>
                    <div className="text-center text-slate-500  mx-auto w-full">
                    <Link to='/sign-up' className="hover:underline"> Don't have an account</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
