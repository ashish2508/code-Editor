import { useUser } from "@clerk/nextjs";
import type { Id } from "../../../../../convex/_generated/dataModel";

function Comments({ snippetId }: { snippetId: Id<"snippets"> }) {
    const { user } = useUser();

	return (
		<div>
			Comments
		</div>
	);
}

export default Comments;
