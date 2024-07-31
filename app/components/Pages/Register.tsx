"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
	const [formData, setFormData] = useState({
		name: "",
		username: "",
		email: "",
		password: "",
	});

	const router = useRouter();

	const handleChange = (e: any) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const response = await axios.post("/api/register", formData);
			console.log("User created:", response.data);
		} catch (error) {
			console.error("Error creating user:", error);
		}
	};

	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<div className="w-full md:w-[50vw] h-[60vh] bg-zinc-800 rounded-xl">
				<h1 className="mx-auto text-white text-center flex items-center justify-center text-[2rem] mt-6 mb-6">
					<img
						src="/avatar.png"
						className="w-[50px] h-[50px] rounded-full object-cover mr-4"
						alt="Profile Avatar"
					/>
					Register
				</h1>
				<div className="w-full border-t-2 border-zinc-900 mb-auto">
					<form onSubmit={handleSubmit}>
						<div className="flex items-center pb-4 pt-4 w-[90%] mx-auto gap-6">
							<label htmlFor="name" className="text-neutral-400">
								Name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								className="text-neutral-200 bg-zinc-700 rounded-md px-2 py-1 w-full"
								required
							/>
						</div>
						<div className="flex items-center pb-4 pt-4 w-[90%] mx-auto gap-6">
							<label htmlFor="username" className="text-neutral-400">
								Username
							</label>
							<input
								type="text"
								id="username"
								name="username"
								value={formData.username}
								onChange={handleChange}
								className="text-neutral-200 bg-zinc-700 rounded-md px-2 py-1 w-full"
								required
							/>
						</div>
						<div className="flex items-center pb-4 pt-4 w-[90%] mx-auto gap-6">
							<label htmlFor="email" className="text-neutral-400">
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								className="text-neutral-200 bg-zinc-700 rounded-md px-2 py-1 w-full"
								required
							/>
						</div>
						<div className="flex items-center pb-4 pt-4 w-[90%] mx-auto gap-6">
							<label htmlFor="password" className="text-neutral-400">
								Password
							</label>
							<input
								type="password"
								id="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								className="text-neutral-200 bg-zinc-700 rounded-md px-2 py-1 w-full"
								required
							/>
						</div>
						<div className="flex gap-4 w-[90%] mx-auto mt-auto">
							<button
								type="submit"
								className={
									"transition rounded-md px-4 py-2 bg-yellow-300 hover:bg-yellow-300/75 text-neutral-900 w-full"
								}
							>
								Create User
							</button>
							<button
								type="button"
								className={
									"transition rounded-md px-4 py-2 bg-yellow-300 hover:bg-yellow-300/75 text-neutral-900 w-full"
								}
								onClick={() => router.push("/")}
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
