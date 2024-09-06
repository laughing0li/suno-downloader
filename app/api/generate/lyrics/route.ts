import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
// because call the OpenAI api will take 10-15 seconds, so we set the maxDuration to 30 seconds
export const maxDuration = 30;
export const runtime = "edge";


async function GetLyrics(description: string) {
    const { OpenAI } = await import('openai');
    const client = new OpenAI({ apiKey: process.env.OPENAI_KEY });
    try {
        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `# Song Lyrics Generation Prompt

Please generate lyrics for a  song based on the following structure and description:
## Description: ${description}

## Song Structure:
1. [Intro] (4-8 seconds)
2. [Verse 1] (6-8 lines)
3. [Pre-Chorus] (2-4 lines)
4. [Chorus] (4-6 lines)
5. [Verse 2] (6-8 lines)
6. [Pre-Chorus] (repeat)
7. [Chorus] (repeat)
8. [Bridge] (optional, 2-4 lines)
9. [Chorus] (final repetition)
10. [Outro] (brief conclusion)
Please check the language the description is in and make sure the lyrics are in the same language. 
Please generate complete lyrics following this structure and incorporating the description.
Please remember do not use markdown or any special characters in the lyrics. and you do not need to stick to the structure strictly, but it should be close to the structure.`,
                        }
                    ],
                },
            ],
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error converting image or fetching rate:", error);
        throw error;
    }
}

export async function POST(request: NextRequest) {
    const supabase = createRouteHandlerClient({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
        return NextResponse.json(
            {"error": "You are not logged in", status: 401},
        );
    }
    const user_id = session.user.id;
    const { description } = await request.json();
    try {
        const { data, error } = await supabase.from("users").select("has_access").eq("id", session?.user.id).single();
        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }
        if (!data.has_access) {
            return NextResponse.json(
                {"error": "You do not have access to this feature", status: 403},
            );
        }
        const lyrics = await GetLyrics(description);
        const { data: creditData} = await supabase.from("users").select("lyric_credits").eq("id", user_id).single();
        let credits = creditData.lyric_credits;
        // TODO: Check if the user has enough credits to generate lyrics
        if (credits <= 0) {
            return NextResponse.json(
                {"error": "You do not have enough credits to generate lyrics", status: 403},
            );
        }
        await supabase.from("users").update({ lyric_credits: credits - 1 }).eq("id", user_id);
        
        return NextResponse.json({ lyrics }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}