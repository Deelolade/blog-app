import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import { FaEye, FaEyeSlash } from 'react-icons/fa';


export default function SignIn() {
    const [formData, setFormData] = useState({});
    const { loading, error: errorMessage } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [passwordType, setPasswordType] = useState("password");
    const [passwordIcon, setPasswordIcon] = useState(FaEye);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };
    const handlePasswordToggle = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            setPasswordIcon(FaEyeSlash)
        }
        if (passwordType === "text") {
            setPasswordType("password")
            setPasswordIcon(FaEye)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            return dispatch(signInFailure('Please fill all the fields'));
        }
        try {
            dispatch(signInStart());
            const res = await fetch('http://localhost:5000/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch(signInFailure(data.message));
            } else {
                dispatch(signInSuccess(data));
                navigate('/');
            }
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-6 space-y-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-center">Sign In</h2>
                <p className="text-center text-sm">Sign in with your email or Google.</p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <Label value="Email" />
                        {/* <TextInput type="email" id="email" placeholder="Enter your email" className="border-none outline-none " onChange={handleChange} /> */}
                        <input type="email" id="email" placeholder="Enter your email" className=" p-3 rounded-md w-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400" onChange={handleChange} />
                    </div>
                    <div className="">
                        <Label value="Password" />
                        <div className="flex justify-between  p-3 rounded-md w-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400">
                            {/* <TextInput type="password" id="password" placeholder="Enter your password" onChange={handleChange} /> */}
                            <input type={passwordType} id="password" className="outline-none w-[90%]" placeholder="Enter your password" onChange={handleChange} />
                            <button
                                type="button"
                                className="ml-2 text-gray-600 hover:text-gray-800"
                                onClick={handlePasswordToggle}
                            >
                                {passwordIcon}
                            </button>
                        </div>
                    </div>
                    <Button type="submit" disabled={loading} className="w-full bg-green-500 hover:bg-green-600 text-white py-1 rounded-md  shadow-md flex items-center justify-center">
                        {loading ? (<><Spinner size="sm" /><span className="ml-2">Signing in...</span></>) : 'Sign In'}
                    </Button>
                </form>
                <OAuth />
                <div className="text-center text-sm">
                    Don't have an account? <Link to="/sign-up" className="text-blue-600">Sign Up</Link>
                </div>
                {errorMessage && <Alert color="failure" className="text-red-500">*{errorMessage}*</Alert>}
            </div>
        </div>
    );
}