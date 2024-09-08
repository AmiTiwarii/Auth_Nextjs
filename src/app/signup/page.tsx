"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";
import toast from "react-hot-toast";


export default function SignupPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: '',
        password: '',
        username: ''
    })
    
    const [buttonDisabled, setbuttonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 8 && user.username.length > 0) {
            setbuttonDisabled(false);
        } else {
            setbuttonDisabled(true);
        }
    }, [user]);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup Success",response.data);
            router.push("/login");
        } catch (error: any) {
            console.log("Signup Failed",error.message);
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }
    return (
        <div className="flex flex-col py-2 h-screen justify-center items-center">
            <h1 className="text-3xl text-white">{loading ? "Processing" : "Signup"}</h1>
            <hr/>
            <label htmlFor="username" className="p-1.5 text-sm"> username </label>
            <input 
                className="p-2 text-black border border-gray-400 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                id="username" 
                type="text" 
                value={user.username} 
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="username"
            />
            <label htmlFor="email" className="p-1.5 text-sm"> email </label>
            <input 
                className="p-2 text-black border border-gray-400 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                id="email" 
                type="text" 
                value={user.email} 
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email"
            />
            <label htmlFor="password" className="p-1.5 text-sm"> password </label>
            <input 
                className="p-2 text-black border border-gray-400 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                id="password" 
                type="password" 
                value={user.password} 
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={onSignup} type="button">
                {buttonDisabled ? "Missing Something" : "Signup"}
            </button>
            <Link href="/login" className="p-1.5">Already have an account? Login</Link>
        </div>
    )
}