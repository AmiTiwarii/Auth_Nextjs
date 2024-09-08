"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import toast from "react-hot-toast";


export default function LoginPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: '',
        password: '',
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login",user);
            console.log("Login Success",response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error : any) {
            console.log("Login failed",error.message);
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 6){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    },[user]);
    return (
        <div className="flex flex-col py-2 h-screen justify-center items-center">
            <h1 className="text-2xl text-white">{loading ? "Loading..." : "Login"}</h1>
            <hr/>
            <label htmlFor="email"> email </label>
            <input 
                className="p-2 text-black border border-gray-400 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                id="email" 
                type="text" 
                value={user.email} 
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email"
            />
            <label htmlFor="password"> password </label>
            <input 
                className="p-2 text-black border border-gray-400 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                id="password" 
                type="password" 
                value={user.password} 
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={onLogin} type="button">{buttonDisabled ? "Missing fields" : "Login"}</button>
            <Link href="/signup">Don{`'`}t have an account? Signup</Link>
        </div>
    )
}