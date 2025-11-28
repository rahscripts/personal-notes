'use client';

import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup successful! Please log in.");
      window.location.href = "/login";
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-neutral-900 p-8 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6">Create Account</h1>

        <input
          className="w-full p-3 mb-4 rounded bg-neutral-800 outline-none"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-3 mb-4 rounded bg-neutral-800 outline-none"
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-green-600 hover:bg-green-700 p-3 rounded text-white font-bold"
        >
          Sign Up
        </button>

        <p className="mt-4 text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-green-400 underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
