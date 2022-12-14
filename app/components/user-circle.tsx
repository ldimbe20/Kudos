/** @format */

// app/components/user-circle.tsx
import type { Profile } from "@prisma/client";

interface props {
	profile: Profile;
	className?: string;
	onClick?: (...args: any) => any;
}

export function UserCircle({ profile, onClick, className }: props) {
	return (
		<div
			className={`${className} cursor-pointer bg-gray-400 rounded-full flex justify-center items-center`}
			onClick={onClick}
		>
			<h2>
				{profile.firstName.charAt(0).toUpperCase()}
				{/* charAt displays the character at the 0 index */}
				{profile.lastName.charAt(0).toUpperCase()}
			</h2>
		</div>
	);
}
