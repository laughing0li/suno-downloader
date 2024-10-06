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
    type: string;
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
        if (code === 2046 || !data) {
            return NextResponse.json(
                { message: "Invalid callback data" },
                { status: 400 }
            );
        }
        const title = data.extend.payload.title;
        const tags = data.extend.payload.tags
        if (data.concat.audios.length > 0) {
            const audios = data.concat.audios
            audios.forEach((audio: CallbackData) => {
                audio.title = title
                audio.tags = tags
            })
            await insertOrUpdateMedia(audios, params.user_id)
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
// const handleTextCallback = async (data: CallbackData[], user_id: string) => {
//     if (!data || data.length === 0) {
//         throw new Error("No data in text callback");
//     }
//     const { id, prompt, model_name, title, tags, duration } = data[0];
//     // Check if the data with this id already exists
//     const { data: existingData, error: checkError } = await supabase
//         .from("audio_generations")
//         .select("id")
//         .eq("id", id)
//         .single();

//     if (existingData) {
//         console.log(`Data with id ${id} already exists. Skipping insertion.`);
//         return;
//     }
//     await insertAudioGeneration(
//         id,
//         prompt,
//         model_name,
//         title,
//         tags,
//         duration,
//         user_id
//     );
//     for (let i = 0; i < data.length; i++) {
//         try {
//             // Insert into the audio_urls table
//             const { audio_url, image_url } = data[i];
//             const { data: urlData, error: urlError } = await supabase
//                 .from("media_urls")
//                 .insert([
//                     {
//                         generation_id: id,
//                         audio_url: audio_url || "", // This can be empty initially
//                         image_url,
//                         version: i + 1, // Assign version based on the index
//                     },
//                 ]);

//             if (urlError) {
//                 throw new Error(
//                     "Error inserting audio URL data: " + urlError.message
//                 );
//             }
//         } catch (error) {
//             throw new Error(
//                 "Error processing audio data at Text stage: " + error.message
//             );
//         }
//     }
// };
const insertOrUpdateMedia = async (data: CallbackData[], user_id: string) => {
    if (!data || data.length === 0) {
        throw new Error("No data in callback");
    }
    console.log('data: ', data)
    const { id, prompt, model_name, title, tags, duration } = data[0];
    try {
        await insertAudioGeneration(
            id,
            prompt,
            model_name,
            title,
            tags,
            duration,
            user_id
        );
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
            .upsert([
                {
                    id,
                    user_id,
                    prompt,
                    model_name,
                    title,
                    tags,
                    duration,
                    type: "extend",
                    created_at: new Date(),
                },
            ]);
        if (error) {
            throw new Error(
                "Error inserting data to audio_generations table: " +
                    error.message
            );
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
