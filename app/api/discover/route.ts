import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function GET(request: Request) {
    const supabase = createRouteHandlerClient({ cookies });
    try {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get("page") || "1", 10);
        const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

        const start = (page - 1) * pageSize;
        const end = start + pageSize - 1;
        const { count, error: countError } = await supabase
            .from("media_urls")
            .select(
                `
            id,
            audio_generations!inner(id)
            `,
            { count: "exact" }
            )
            .eq("version", "1");
            
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
            // only fetch version 1 of the media
            .eq("version", "1")
            .range(start, end);
        if (error) {
            throw error;
        }
        const totalPages = Math.ceil(count / pageSize);
        return NextResponse.json({ data, totalPages }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
