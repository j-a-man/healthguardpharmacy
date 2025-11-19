import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { rating, message } = body;

        // 1. Setup Transporter (Matches your working test-email.js)
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'jaylinman4@gmail.com',
                pass: 'wtyckhujotshrcab' // Your working App Password
            }
        });

        // 2. Define email content
        const isHighRating = rating >= 4;
        const subject = isHighRating 
            ? `🌟 New ${rating} Star Review Received!` 
            : `⚠️ Feedback Received: ${rating} Stars`;

        const htmlContent = `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2 style="color: ${isHighRating ? '#16a34a' : '#dc2626'};">
                    ${subject}
                </h2>
                <p><strong>Rating:</strong> ${rating}/5 Stars</p>
                <hr />
                <h3>Message:</h3>
                <p style="background-color: #f3f4f6; padding: 15px; border-radius: 5px;">
                    ${message}
                </p>
                <hr />
                <p style="font-size: 12px; color: #666;">
                    Sent via Health Guard Pharmacy Website
                </p>
            </div>
        `;

        // 3. Send Email
        // Note: We send TO yourself. Check your SENT folder if not in Inbox.
        await transporter.sendMail({
            from: '"Health Guard Web" <jaylinman4@gmail.com>',
            to: 'jaylinman4@gmail.com', 
            subject: subject,
            html: htmlContent,
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to send email' }, 
            { status: 500 }
        );
    }
}