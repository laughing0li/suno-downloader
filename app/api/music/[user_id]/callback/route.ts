import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
export const runtime = "edge";

interface CallbackData {
    id: string;
    prompt: string;
    model_name: string;
    title: string;
    tags: string;
    // duration should be optional
    duration?: string;
    audio_url: string;
    image_url: string;
    createTime: number;
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
);


export async function POST(
    req: NextRequest,
    { params }: { params: { user_id: string } }
) {
    try {
        const { code, msg, data } = await req.json();
        if (code !== 200 || !data) {
            return NextResponse.json(
                { message: "Invalid callback data" },
                { status: 400 }
            );
        }
        const userId = params.user_id;
        // console.log("Received callback data:", jsonData.text);
        // Process callback data
        const { callbackType, data: callBackData } = data;
        // const { callbackType, callBackData } = jsonData.complete;
        switch (callbackType) {
            case "text":
                await handleTextCallback(callBackData, userId);
                break;
            case "first":
                await insertOrUpdateMedia(callBackData, userId);
                break;
            case "complete":
                await insertOrUpdateMedia(callBackData, userId);
                break;
            default:
                console.log("Received unknown callback data:", callBackData);
                return NextResponse.json(
                    { message: "Invalid callback type" },
                    { status: 400 }
                );
        }


        return NextResponse.json(
            { message: "Callback processed successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { message: "Error processing callback" },
            { status: 500 }
        );
    }
}

const handleTextCallback = async (data: CallbackData[], user_id: string) => {
    if (!data || data.length === 0) {
        throw new Error("No data in text callback");
    }
    const { id, prompt, model_name, title, tags, duration } = data[0];
    await insertAudioGeneration(
        id,
        prompt,
        model_name,
        title,
        tags,
        duration,
        user_id
    );
    for (let i = 0; i < data.length; i++) {
        try {
            // Insert into the audio_urls table
            const { audio_url, image_url } = data[i];
            const { data: urlData, error: urlError } = await supabase
                .from("media_urls")
                .insert([
                    {
                        generation_id: id,
                        audio_url: audio_url || "", // This can be empty initially
                        image_url,
                        version: i + 1, // Assign version based on the index
                    },
                ]);

            if (urlError) {
                throw new Error(
                    "Error inserting audio URL data: " + urlError.message
                );
            }
        } catch (error) {
            throw new Error("Error processing audio data: " + error.message);
        }
    }
};

const insertOrUpdateMedia = async (
    data: CallbackData[],
    user_id: string,
) => {
    if (!data || data.length === 0) {
        throw new Error("No data in callback");
    }
    const { id, prompt, model_name, title, tags, duration } = data[0];
    try {
        // Upsert into the audio_generations table
        const { data: existingRecord, error: selectError } = await supabase
            .from("audio_generations")
            .select("id")
            .eq("id", id)
            .single();
        if (selectError) {
            console.log("No audio data found, generating one...");
        }
        if (!existingRecord) {
            insertAudioGeneration(
                id,
                prompt,
                model_name,
                title,
                tags,
                duration,
                user_id
            );
        }
    } catch (error) {
        throw new Error("Error processing audio data: " + error.message);
    }
    for (let i = 0; i < data.length; i++) {
        await insertMediaUrls(id, data[i].audio_url, data[i].image_url, i + 1);
    }
};

const insertAudioGeneration = async (
    id: string,
    prompt: string,
    model_name: string,
    title: string,
    tags: string,
    duration: string,
    user_id: string
) => {
    try {
        const { data: audioData, error } = await supabase
            .from("audio_generations")
            .insert([
                {
                    id,
                    user_id,
                    prompt,
                    model_name,
                    title,
                    tags,
                    duration,
                    created_at: new Date(),
                },
            ]);
        if (error) {
            throw new Error("Error inserting audio data: " + error.message);
        }
    } catch (error) {
        throw new Error("Error processing audio data: " + error.message);
    }
};

const insertMediaUrls = async (
    generation_id: string,
    audio_url: string,
    image_url: string,
    version: number
) => {
    try {
        const { data: urlData, error: urlError } = await supabase
            .from("media_urls")
            .select("id")
            .match({ generation_id, version })
            .single();
        if (urlError) {
            console.log("No media URL found, inserting one...");
        }
        if (!urlData) {
            const { data: insertData, error: insertError } = await supabase
                .from("media_urls")
                .insert([
                    {
                        generation_id,
                        audio_url,
                        image_url,
                        version,
                    },
                ]);
            if (insertError) {
                throw new Error(
                    "Error inserting audio URL data: " + insertError.message
                );
            }
        } else {
            const { data: updateData, error: updateError } = await supabase
                .from("media_urls")
                .update({ audio_url, image_url })
                .match({ generation_id, version });
            if (updateError) {
                throw new Error(
                    "Error updating audio URL data: " + updateError.message
                );
            }
        }
    } catch (error) {
        throw new Error("Error processing audio data: " + error.message);
    }
};
