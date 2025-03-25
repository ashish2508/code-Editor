import { SignInButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";

function LoginButton() {
	return (
		<SignInButton mode="modal">
			<button
				className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/60 to-green-500 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg
             transition-all duration-200 font-medium shadow-lg shadow-lime-500/20"
			>
				<LogIn className="w-4 h-4 transition-transform" />
				<span>Sign In</span>
			</button>
		</SignInButton>
	);
}
export default LoginButton;
