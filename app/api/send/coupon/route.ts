import { Coupon } from "@/components/emailTemplates/Coupon"
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
export const runtime = 'edge';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    const body = await req.json();
    const to = body.to;
    try {
        const data = await resend.emails.send({
            from: "AI Music Generator <noreply@support.resumego.io>",
            to: [to],
            subject: "Enjoy the 15% off coupon",
            react: Coupon(),
        });
        return NextResponse.json({ message: 'Email sent successfully', data });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}