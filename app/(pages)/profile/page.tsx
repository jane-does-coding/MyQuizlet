import getCurrentUser from "@/app/actions/getCurrentUser";
import Button from "@/app/components/Buttons/Button";
import SignOutBtn from "@/app/components/SignOutBtn";
import React from "react";

const page = async () => {
	/* GET USER */
	const currentUser = await getCurrentUser();
	console.log(currentUser);
	return (
		<div>
			{/*   SHOW PROFILE PAGE */}
			<Button text={"Hello"} />
		</div>
	);
};

export default page;
