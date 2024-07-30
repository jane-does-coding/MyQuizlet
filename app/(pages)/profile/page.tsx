import getCurrentUser from "@/app/actions/getCurrentUser";
import Profile from "@/app/components/Pages/Profile";
import React from "react";

const page = async () => {
	/* GET USER */
	const currentUser = await getCurrentUser();
	console.log(currentUser);
	return (
		<div>
			{/*   SHOW PROFILE PAGE */}
			<Profile currentUser={currentUser} />
		</div>
	);
};

export default page;
