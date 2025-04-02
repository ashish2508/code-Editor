"use node";
import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { createHmac } from "crypto";

const webhookSecret = process.env.LEMON_SQUEEZY_WH_SECRET!;

function verifySignature(payload: string, signature: string): boolean {
	const hmac = createHmac("sha256", webhookSecret);
	const computedSignature = hmac.update(payload).digest("hex");
	return signature === computedSignature;
}

export const verifyWebhook = internalAction({
	args: {
		payload: v.string(),
		signature: v.string(),
	},
	handler: async (ctx, args) => {
		if (!webhookSecret) {
			console.error("LEMON_SQUEEZY_WH_SECRET is not set!");
			throw new Error("LEMON_SQUEEZY_WH_SECRET is not set!");
		}
		const isValid = verifySignature(args.payload, args.signature);

		if (!isValid) {
			throw new Error("Invalid signature");
		}

		return JSON.parse(args.payload);
	},
});
