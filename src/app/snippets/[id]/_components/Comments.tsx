import { SignInButton, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { MessageSquareCodeIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

function Comments({ snippetId }: { snippetId: Id<"snippets"> }) {
	const { user } = useUser();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [deletinCommentId, setDeletingCommentId] = useState<string | null>(
		null
	);

	const comments = useQuery(api.snippets.getComments, { snippetId }) || [];
	const addComment = useMutation(api.snippets.addComment);
	const deleteComment = useMutation(api.snippets.deleteComment);

	const handleSubmitComment = async (content: string) => {
		setIsSubmitting(true);

		try {
			await addComment({ snippetId, content });
		} catch (error) {
			console.log("Error adding comment:", error);
			toast.error("Something went wrong");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDeleteComment = async (commentId: Id<"snippetComments">) => {
		setDeletingCommentId(commentId);

		try {
			await deleteComment({ commentId });
		} catch (error) {
			console.log("Error deleting comment:", error);
			toast.error("Something went wrong");
		} finally {
			setDeletingCommentId(null);
		}
	};

	return (
		<div className="bg-stone-700/60 border-blue-950 rounded-2xl overflow-hidden">
			<div className="px-6 sm:px-8 py-6 border-b border-pink-700 ">
				<h2 className="text-lg font-semibold font-code text-white flex items-center gap-2">
					<MessageSquareCodeIcon className="size-5" />
					Discussions ({comments.length})
				</h2>
			</div>
			<div className="p-6 sm:p-8">
				{user ? (
					<CommentForm
						onSubmit={handleSubmitComment}
						isSubmitting={isSubmitting}
					/>
				) : (
					<div className="bg-stone-800 rounded-xl p-6 text-center mb-8 border border-emerald-950/20">
						<p className="text-[#808086] mb-4">
							Sign in to join the discussion
						</p>{" "}
						<SignInButton mode="modal">
							<button className="px-6 py-2 bg-green-500/60 text-white rounded-3xl hover:bg-green-600/50 transition-colors">
								Sign In
							</button>
						</SignInButton>
					</div>
				)}

				<div className="space-y-6">
					{comments.map((comment) => (
						<Comment
							key={comment._id}
							comment={comment}
							onDelete={handleDeleteComment}
							isDeleting={deletinCommentId === comment._id}
							currentUserId={user?.id}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default Comments;
