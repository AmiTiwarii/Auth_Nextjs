"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation";
export default function ProfilePage(){
    const router = useRouter();
    const [data, setData] = useState("Nothing");
    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout Successfully");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        console.log(res.data);
        setData(res.data.data.username);
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile </h1>
            <hr />
            <p>Profile Page</p>
            <hr/>
            <h2 className="mt-3 text-3xl p-2 bg-green-400">
                {data === "Nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
            </h2>
            <hr/>
            <button 
                className="mt-3 bg-blue-500 text-white px-4 py-2"
                onClick={logout}
            >
                Logout
            </button>
            <hr/>
            <button 
                className="mt-3 bg-gradient-to-r from-blue-500 via-green-500 to-violet-500 text-white px-4 py-2"
                onClick={getUserDetails}
            >
                Get User Details
            </button>
        </div>
    )
}