import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function GET(req: NextRequest) {
    const supabase = createRouteHandlerClient({ cookies });
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const { data: { session }} = await supabase.auth.getSession();
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
        if (data[0].audio_generations.user_id === session?.user.id) {
            return NextResponse.json({ audioData: data, isOwner: true });
        } else {
            return NextResponse.json({ audioData: data, isOwner: false });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest) {
    const supabase = createRouteHandlerClient({ cookies });
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    try {
        // Delete from audio_generations
        // Delete from media_urls first
        const { error: mediaUrlsError } = await supabase
            .from("media_urls")
            .delete()
            .eq("generation_id", id);

        if (mediaUrlsError) {
            throw mediaUrlsError;
        }

        // Then delete from audio_generations
        const { error: audioGenerationError } = await supabase
            .from("audio_generations")
            .delete()
            .eq("id", id);

        if (audioGenerationError) {
            throw audioGenerationError;
        }

        console.log('audioGenerationError', audioGenerationError);
        return NextResponse.json({ message: "Audio generation deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}