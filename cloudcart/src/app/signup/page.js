"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role, //  added
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Signup successful ✅");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Create CloudCart Account
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 rounded" />

          <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border p-2 rounded" />

          <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 rounded" />

          <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} className="border p-2 rounded" />

          <select name="role" onChange={handleChange} className="border p-2 rounded">
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </select>

          <button className="bg-blue-600 text-white py-2 rounded-lg">
            Create Account
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}