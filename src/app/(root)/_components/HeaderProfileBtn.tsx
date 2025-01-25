"use client"
import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";

function HeaderProfileBtn() {
  return (
    <>
      <UserButton >
        <UserButton.MenuItems>
          <UserButton.Link label="Profile" href="/profile" labelIcon={<User className="size-4" />}>
          </UserButton.Link>
        </UserButton.MenuItems>
      </UserButton>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </>
  )
}

export default HeaderProfileBtn;
