import getCurrentUser from "@/app/actions/getCurrentUser";
import getUserById from "@/app/actions/getUserById";
import Profile from "@/app/components/Pages/Profile";
import React from "react";

const page = async (props: any) => {
	/* GET USER */
	const { params } = props;

	const currentUser = await getCurrentUser();
	const user = await getUserById(params);

	/* 	console.log(user);
	 */ return (
		<div>
			{/*   SHOW PROFILE PAGE */}
			<Profile currentUser={user} />
		</div>
	);
};

export default page;
