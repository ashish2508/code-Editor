"use client";
import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
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
        <div className="px-6 py-2 bg-green-500/60 text-white rounded-3xl hover:bg-green-600/50 transition-colors">
          <SignInButton />
        </div>
      </SignedOut>
    </>
  );
}

export default HeaderProfileBtn;
