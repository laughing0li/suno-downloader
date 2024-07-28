import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function GET(req: NextRequest) {
    const supabase = createRouteHandlerClient({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
        return NextResponse.json({ isLoggedIn: false }, { status: 200 });
    }
    try {
        const { data, error } = await supabase.from("users").select("*").eq("id", session?.user.id).single();
        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }
        return NextResponse.json({ isLoggedIn: true, data }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
