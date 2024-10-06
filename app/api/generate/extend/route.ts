import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { toast } from "react-hot-toast";

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
        callBackUrl:
            // `https://0414-159-196-132-2.ngrok-free.app/api/extend/${user_id}/callback`,
            `https://www.sunodownloader.io/api/extend/${user_id}/callback`,
    };
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LUMA_API_KEY}`,
    };
    try {
        const response = await fetch(
            "https://api.lumaapi.com/api/suno/extcon",
            {
                method: "POST",
                headers,
                body: JSON.stringify(param),
            }
        );
        if (!response.ok) {
            // throw new Error(`Error: ${response.statusText}`);
            toast.error(`Error: ${response.statusText}`);
        }
        const { data: user} = await supabase.from("users").select().eq("id", user_id).single();
        let credits = user.credits;
        credits -= 1;
        await supabase.from("users").update({ credits }).eq("id", user_id);
        const data = await response.json();
        return NextResponse.json({ data });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

