"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    //  use context instead of localStorage directly
    login(data.user);

    alert("Login successful ✅");

    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Login to CloudCart
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border p-2 rounded" />

          <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 rounded" />

          <button className="bg-blue-600 text-white py-2 rounded-lg">
            Login
          </button>

        </form>

        <p className="text-sm text-center mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}