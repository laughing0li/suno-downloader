import { EmailTemplate } from "@/components/emailTemplates/EmailTemplate";
import { NextRequest, NextResponse } from "next/server";
export const runtime = 'edge';


export async function POST(req: NextRequest) {
    const body = await req.json();
    const to = body.to;
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
        const data = await resend.emails.send({
            from: "AI Music Generator <noreply@support.resumego.io>",
            to: [to],
            subject: "Welcome to AI Music Generator",
            react: EmailTemplate(),
        });
        return NextResponse.json({ message: 'Email sent successfully', data });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}