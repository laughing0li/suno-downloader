import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function GET(req: NextRequest) {
    const supabase = createRouteHandlerClient({ cookies });
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    try {
        const { data, error } = await supabase
            .from("media_urls")
            .select(
                `
                *,
                  audio_generations:audio_generations(
                  *,
                  user:users(
                    *
                  )
              )
              `
            )
            .eq("generation_id", id);
        if (error) {
            throw error;
        }
        return NextResponse.json({ audioData: data });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
