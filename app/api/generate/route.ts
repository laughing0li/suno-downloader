import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export const runtime = 'edge';
export async function POST(req: NextRequest) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    // User who are not logged in can't make a purchase
    if (!session) {
        return NextResponse.json(
            { error: "You must be logged in first." },
            { status: 401 }
        );
    }
    const user_id = session.user.id;
    const body = await req.json();
    const param = {
        ...body,
        // TODO When in production, change the callback URL to your own server
        callBackUrl:
            // `https://c9d9-159-196-132-3.ngrok-free.app/api/music/${user_id}/callback`,
            `https://www.sunodownloader.io/api/music/${user_id}/callback`,
    };
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SUNO_API_KEY}`,
    };
    try {
        const response = await fetch(
            "https://sunoapi.erweima.ai/api/v1/generate",
            {
                method: "POST",
                headers,
                body: JSON.stringify(param),
            }
        );
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const { data: user} = await supabase.from("users").select().eq("id", user_id).single();
        console.log('user', user)
        let credits = user.credits;
        let free = user.free;
        if (free > 0) {
            free -= 1;
            await supabase.from("users").update({ free }).eq("id", user_id);
        } else {
            credits -= 1;
            await supabase.from("users").update({ credits }).eq("id", user_id);
        }
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error:", error);
    }
}

