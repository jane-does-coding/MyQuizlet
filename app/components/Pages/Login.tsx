"use client";

import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		signIn("credentials", {
			...data,
			redirect: false,
		}).then((callback) => {
			setIsLoading(false);

			if (callback?.ok) {
				toast.success("Logged in");
				router.refresh();
			}

			if (callback?.error) {
				toast.error(callback.error);
			}
		});
	};

	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<div className="w-full md:w-[50vw] h-[50vh] bg-zinc-800 rounded-xl">
				<h1 className="mx-auto text-white text-center flex items-center justify-center text-[2rem] mt-6 mb-6">
					<img
						src="/avatar.png"
						className="w-[50px] h-[50px] rounded-full object-cover mr-4"
						alt="Profile Avatar"
					/>
					Login
				</h1>
				<div className="w-full border-t-2 border-zinc-900 mb-auto">
					<form onSubmit={handleSubmit(onSubmit)} className="w-[90%] mx-auto">
						<div className="flex flex-col pb-4 pt-4 gap-2">
							<label htmlFor="email" className="text-neutral-400">
								Email
							</label>
							<input
								id="email"
								type="email"
								{...register("email", { required: "Email is required" })}
								disabled={isLoading}
								className="text-neutral-200 bg-zinc-700 rounded-md px-2 py-1 w-full"
							/>
							{errors.email && (
								<p className="text-red-500 text-sm">
									{String(errors.email.message)}
								</p>
							)}
						</div>
						<div className="flex flex-col pb-4 pt-4 gap-2">
							<label htmlFor="password" className="text-neutral-400">
								Password
							</label>
							<input
								id="password"
								type="password"
								{...register("password", { required: "Password is required" })}
								disabled={isLoading}
								className="text-neutral-200 bg-zinc-700 rounded-md px-2 py-1 w-full"
							/>
							{errors.password && (
								<p className="text-red-500 text-sm">
									{String(errors.password.message)}
								</p>
							)}
						</div>
						<div className="flex gap-4 w-full mt-auto">
							<button
								type="submit"
								className="transition rounded-md px-4 py-2 bg-yellow-300 hover:bg-yellow-300/75 text-neutral-900 w-full"
								disabled={isLoading}
							>
								{isLoading ? "Logging in..." : "Login"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
