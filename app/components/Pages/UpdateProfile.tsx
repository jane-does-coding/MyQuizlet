"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateUser = ({ currentUser }: any) => {
	const [formData, setFormData] = useState({
		name: currentUser.name || "",
		username: currentUser.username || "",
		email: currentUser.email || "",
		password: "",
	});

	const handleChange = (e: any) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const response = await axios.put("/api/update-user", {
				id: currentUser.id,
				...formData,
			});
			console.log("User updated:", response.data);
		} catch (error) {
			console.error("Error updating user:", error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					id="name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label htmlFor="username">Username</label>
				<input
					type="text"
					id="username"
					name="username"
					value={formData.username}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
				/>
			</div>
			<button type="submit">Update Profile</button>
		</form>
	);
};

export default UpdateUser;
