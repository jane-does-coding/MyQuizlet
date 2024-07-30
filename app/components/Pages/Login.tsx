"use client";

import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { signIn, signOut } from "next-auth/react";
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
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						type="email"
						{...register("email", { required: "Email is required" })}
						disabled={isLoading}
					/>
					{errors.email && <p>{errors.email.message}</p>}
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						id="password"
						type="password"
						{...register("password", { required: "Password is required" })}
						disabled={isLoading}
					/>
					{errors.password && <p>{errors.password.message}</p>}
				</div>
				<button type="submit" disabled={isLoading}>
					{isLoading ? "Logging in..." : "Login"}
				</button>
			</form>
		</>
	);
};

export default Login;
