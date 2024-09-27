import { NextResponse, NextRequest } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import config from "@/config";

export const dynamic = "force-dynamic";
export const runtime = "edge";

// This route is called after a successful login. It exchanges the code for a session and redirects to the callback URL (see config.js).
export async function GET(req: NextRequest) {
    const ip = req.headers.get('x-forwarded-for') ?? 'Unknown'
    const requestUrl = new URL(req.url);
    const code = requestUrl.searchParams.get("code");
    if (code) {
        const supabase = createRouteHandlerClient({ cookies });
        const { data, error } = await supabase.auth.exchangeCodeForSession(
            code
        );
        if (error) {
            console.error("Error exchanging code for session:", error);
        }
        const { session } = data;
        if (session) {
            try {
                const { user } = session;
                const { id: userId, email, user_metadata: { full_name, avatar_url } } = user;
                const { data: profileData, error: profileError } = await supabase
                    .from("users")
                    .select("*")
                    .eq("id", userId)
                    .single();

                if (profileError) {
                    console.error("Error fetching profile data:", profileError);
                } 
                // const new_ip = '5.188.62.140'
                // const res = await fetch(`https://ipapi.co/${new_ip}/country_name`).then(res => res.text())
                // console.log("res: ", res)
                if (!profileData) {
                    const res = await fetch(`https://ipapi.co/${ip}/country_name`).then(res => res.text())
                    let free_credits = 3
                    let country = res
                    // if (res === 'Russia') {
                    //     free_credits = 1
                    //     country = 'Russia'
                    // }
                    // console.log("country: ", country)
                    const { error: insertError } = await supabase.from("users").insert([
                        {
                            id: userId,
                            email,
                            full_name,
                            avatar_url,
                            free: free_credits,
                            lyric_credits: free_credits,
                            country: country
                        },
                    ]);

                    if (insertError) {
                        console.error("Error inserting profile data:", insertError);
                    } else {
                        console.log("Profile created successfully");
                    }
                }
                
            } catch (error) {
                return NextResponse.redirect(requestUrl.origin);
            }
        }
    }

    // URL to redirect to after sign in process completes
    return NextResponse.redirect(requestUrl.origin + config.auth.callbackUrl);
}
