'use client';
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = async () => {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.href = "/dashboard";

        } else {
            alert(data.error || "LOGIN FAILED");
        }
    };
    return (
        <div className="p-10 mx-auto max-w-sm">

            <h2 className="text-2xl font-bold mb-4">
                Login
            </h2>

            <input
                className="border p-2 w-full mb-2"
                type="email"
                placeholder="abc@gmail.com"
                onChange={(e) => setEmail(e.target.value)} />

            <input
                className="border p-2 w-full mb-2"
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)} />


            <button
                onClick={handleLogin}
                className="bg-blue-500 text-white p-2 rounded cursor-pointer">
                Login
            </button>
            <p>
                Don't have an account? <a href="/signup" className="text-green-400 underline">Sign up</a>
            </p>

        </div>
    )
}