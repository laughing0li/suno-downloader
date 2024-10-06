import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function GET(req: NextRequest, { params }: { params: { music_id: string } }) {
    const supabase = createRouteHandlerClient({ cookies });
    const musicId = params.music_id;

    const { data: { session }} = await supabase.auth.getSession();
    try {
        const { data, error } = await supabase
            .from("media_urls")
            .select("*")
            .eq("id", musicId);
        if (error) {
            throw error;
        }
        return NextResponse.json({ audioData: data });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}