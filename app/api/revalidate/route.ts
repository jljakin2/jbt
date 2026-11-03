import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { POSTS_TAG } from "@/sanity/queries";

/**
 * Sanity → site. A webhook on the Sanity project POSTs here on create/update/delete of a post,
 * signed with SANITY_REVALIDATE_SECRET. We clear the posts cache tag, so the next request rebuilds
 * the pages. No deploy involved.
 */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string }>(req, process.env.SANITY_REVALIDATE_SECRET);
    if (!isValidSignature) return new NextResponse("Invalid signature", { status: 401 });
    if (body?._type !== "post") return NextResponse.json({ revalidated: false, reason: "not a post" });
    revalidateTag(POSTS_TAG);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return new NextResponse(err instanceof Error ? err.message : "Error", { status: 500 });
  }
}
