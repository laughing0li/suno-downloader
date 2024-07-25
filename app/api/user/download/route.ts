import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function GET(req: NextRequest) {
    const supabase = createRouteHandlerClient({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();

    // User who are not logged in can't make a purchase
    if (!session) {
        return NextResponse.json(
            { error: "You must be logged in to download." },
            { status: 401 }
        );
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    try {
        const { data, error } = await supabase
            .from("media_urls")
            .select("audio_url")
            .eq("id", id)
            .single();
        if (error) {
            throw error;
        }
        const res = await fetch(data.audio_url);
        if (!res.ok) {
            throw new Error("Failed to fetch audio");
        }
        const audioBuffer = await res.arrayBuffer();
        return new NextResponse(audioBuffer, {
            headers: {
                "Content-Type": "audio/mpeg",
                "Content-Disposition": "inline",
            },
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
