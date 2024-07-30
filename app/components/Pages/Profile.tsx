"use client";
import React from "react";
import Button from "../Buttons/Button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Profile = ({ currentUser }: any) => {
	const router = useRouter();

	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<div className="w-full md:w-[50vw] h-[60vh] bg-zinc-800 rounded-xl">
				<h1 className="mx-auto text-white text-center flex items-center justify-center text-[2rem] mt-6 mb-6">
					<img
						src="/avatar.png"
						className="w-[50px] h-[50px] rounded-full object-cover mr-4"
						alt="Profile Avatar"
					/>
					Your Profile
				</h1>
				<div className="w-full border-t-2 border-zinc-900 mb-auto">
					<div className="flex items-center pb-4 pt-4 w-[90%] mx-auto gap-6">
						<h2 className="text-neutral-400">Name</h2>
						<h2 className="text-neutral-200">{currentUser.name}</h2>
					</div>
					<div className="flex items-center pb-4 pt-4 w-[90%] mx-auto gap-6">
						<h2 className="text-neutral-400">Username</h2>
						<h2 className="text-neutral-200">{currentUser.username}</h2>
					</div>
					<div className="flex items-center pb-4 pt-4 w-[90%] mx-auto gap-6">
						<h2 className="text-neutral-400">Email</h2>
						<h2 className="text-neutral-200">{currentUser.email}</h2>
					</div>
				</div>
				<div className="flex gap-4 w-[90%] mx-auto mt-auto">
					<button
						className={
							"transition rounded-md px-4 py-2 bg-yellow-300 hover:bg-yellow-300/75 text-neutral-900 w-full"
						}
						onClick={() => signOut()}
					>
						Logout
					</button>
					<button
						className={
							"transition rounded-md px-4 py-2 bg-yellow-300 hover:bg-yellow-300/75 text-neutral-900 w-full"
						}
						onClick={() => router.push("/update-profile")}
					>
						Update Profile
					</button>
				</div>
			</div>
		</div>
	);
};

export default Profile;
