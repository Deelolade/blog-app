import { FcGoogle } from "react-icons/fc";
import {GoogleAuthProvider, signInWithPopup, getAuth,} from "firebase/auth";
import { app } from "../Firebase";


const OAuth = () => {
    const auth = getAuth(app);
    const handleGoogleClick = async() => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt: 'select_account'})
        try {
            const resultFromGoogle = await signInWithPopup(auth, provider)
            console.log(resultFromGoogle)
        } catch (error) {
            console.log(error)
            
        }
    }
    return (
        <button
            type="submit"
            className="w-full flex items-center justify-center text-slate-700 font-bold   outline outline-2 outline-gray-300  py-3 rounded-lg hover:outline-red-500 transition"
            onClick={handleGoogleClick}
        ><FcGoogle className="mx-2 text-3xl" />Google</button>
    )
}

export default OAuth
