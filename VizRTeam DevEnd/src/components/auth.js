
// This page is not used, but we previously had functionality for authentication via login, and we used normal mail login and google login

// imports
import { useState } from "react"
import { auth, googleProvider } from "../Firebase/firebasetest"
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"

// authentication component
export const Auth = () => {
    // fields
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

    
    // Sign in with mail
    const signIn = async () => {
        try {await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err)
        }
    }

    // Sign in with google
    const signInWithGoogle = async () => {
        try {await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err)
        }
    }

    // Logout functionality
    const logout = async () => {
        try {await signOut(auth);
        } catch (err) {
            console.error(err)
        }
    }
    return <div>

        <input placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}/>
        <input placerhodler="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={signIn}>Sign In</button>

        <button onClick={signInWithGoogle}>Sign In With Google</button>
        <button onClick={logout}> Logout</button>
    </div>
}