"use client";
import LoginButton from "@/components/LoginButton";
import { SignedOut, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";

function HeaderProfileBtn() {
	return (
		<>
			<UserButton>
				<UserButton.MenuItems>
					<UserButton.Link
						label="Profile"
						href="/profile"
						labelIcon={<User className="size-4" />}
					></UserButton.Link>
				</UserButton.MenuItems>
			</UserButton>
			<SignedOut>
				<LoginButton />
			</SignedOut>
		</>
	);
}

export default HeaderProfileBtn;
