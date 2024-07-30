import getCurrentUser from "@/app/actions/getCurrentUser";
import UpdateUser from "@/app/components/Pages/UpdateProfile";
import React from "react";

const Page = async () => {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		return <div>User not found</div>;
	}

	return (
		<div>
			<UpdateUser currentUser={currentUser} />
		</div>
	);
};

export default Page;
