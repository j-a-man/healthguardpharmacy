import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, message } = body;

        // Validation
        if (!name || !email || !phone || !message) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Configure Transporter (using our env config)
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '465', 10),
            secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        // 1. Pharmacy Admin Notification Email (Premium Layout)
        const adminSubject = `✉️ New Contact Form Message from ${name}`;
        const adminHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f5f6; margin: 0; padding: 0; color: #222222; }
                    .wrapper { padding: 40px 20px; }
                    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #eaeaea; }
                    .header { background-color: #0f5132; color: #ffffff; padding: 32px 24px; text-align: center; }
                    .header h1 { margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.05em; }
                    .header p { margin: 8px 0 0 0; font-size: 14px; opacity: 0.9; }
                    .content { padding: 32px 24px; }
                    .details-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
                    .details-table th, .details-table td { text-align: left; padding: 12px; border-bottom: 1px solid #f0f0f0; font-size: 15px; }
                    .details-table th { width: 35%; color: #666666; font-weight: 500; }
                    .details-table td { color: #111111; }
                    .message-section { background-color: #f8f9fa; border: 1px solid #e9ecef; padding: 20px; border-radius: 8px; margin-bottom: 24px; }
                    .message-title { font-size: 14px; color: #666666; font-weight: 500; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em; }
                    .message-body { font-size: 15px; color: #333333; line-height: 1.6; white-space: pre-wrap; }
                    .footer { text-align: center; padding: 24px; font-size: 12px; color: #888888; border-top: 1px solid #eaeaea; }
                </style>
            </head>
            <body>
                <div class="wrapper">
                    <div class="container">
                        <div class="header">
                            <h1>New Contact Message</h1>
                            <p>Health Guard Pharmacy Contact Portal</p>
                        </div>
                        <div class="content">
                            <table class="details-table">
                                <tr>
                                    <th>Full Name</th>
                                    <td><strong>${name}</strong></td>
                                </tr>
                                <tr>
                                    <th>Phone Number</th>
                                    <td><a href="tel:${phone}" style="color: #0f5132; text-decoration: none; font-weight: 600;">${phone}</a></td>
                                </tr>
                                <tr>
                                    <th>Email Address</th>
                                    <td><a href="mailto:${email}" style="color: #0f5132; text-decoration: none;">${email}</a></td>
                                </tr>
                            </table>

                            <div class="message-section">
                                <div class="message-title">Submitted Message</div>
                                <div class="message-body">${message}</div>
                            </div>
                        </div>
                        <div class="footer">
                            Sent from Health Guard Pharmacy Web App
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;

        // 2. User Receipt Confirmation Email (Premium Layout)
        const userHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f5f6; margin: 0; padding: 0; color: #222222; }
                    .wrapper { padding: 40px 20px; }
                    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #eaeaea; }
                    .header { background-color: #0f5132; color: #ffffff; padding: 40px 24px; text-align: center; }
                    .header h1 { margin: 0; font-size: 26px; font-weight: 400; letter-spacing: 0.02em; }
                    .content { padding: 40px 32px; line-height: 1.6; }
                    .welcome-title { font-size: 20px; font-weight: 600; color: #111111; margin-top: 0; margin-bottom: 16px; }
                    .message-preview { background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 12px; padding: 20px; margin: 24px 0; font-style: italic; }
                    .message-preview-title { font-weight: 600; font-size: 13px; margin-bottom: 8px; color: #666666; text-transform: uppercase; letter-spacing: 0.05em; font-style: normal; }
                    .footer { text-align: center; padding: 24px; font-size: 12px; color: #888888; border-top: 1px solid #eaeaea; }
                </style>
            </head>
            <body>
                <div class="wrapper">
                    <div class="container">
                        <div class="header">
                            <h1>Health Guard Pharmacy</h1>
                        </div>
                        <div class="content">
                            <h2 class="welcome-title">Hi ${name},</h2>
                            <p>Thank you for contacting Health Guard Pharmacy! We have successfully received your inquiry and our team will get back to you shortly.</p>
                            
                            <p>A member of our pharmacy staff will review your message and reach out via email or phone at <strong>${phone}</strong> if necessary.</p>
                            
                            <div class="message-preview">
                                <div class="message-preview-title">A copy of your message:</div>
                                "${message}"
                            </div>
                            
                            <p style="font-size: 14px; color: #666;">If you have any urgent prescriptions or questions, please do not hesitate to contact us directly over the phone.</p>
                            
                            <div style="text-align: center; margin-top: 32px;">
                                <a href="tel:7185076800" style="display: inline-block; background-color: #0f5132; color: #ffffff !important; padding: 12px 28px; text-decoration: none; border-radius: 30px; font-weight: 600; font-size: 15px; text-align: center;">Call Pharmacy: (718) 507-6800</a>
                            </div>
                        </div>
                        <div class="footer">
                            Health Guard Pharmacy &bull; 33-13 Junction Blvd, Jackson Heights, NY 11372 &bull; (718) 507-6800
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;

        // Send Email to Pharmacy Admin and Patient
        const mailPromises = [
            transporter.sendMail({
                from: `"Health Guard Web Portal" <${process.env.SMTP_USER || 'jaylinman4@gmail.com'}>`,
                to: process.env.CONTACT_EMAIL_TO || 'jaylinman4@gmail.com',
                subject: adminSubject,
                html: adminHtml
            }),
            transporter.sendMail({
                from: `"Health Guard Pharmacy" <${process.env.SMTP_USER || 'jaylinman4@gmail.com'}>`,
                to: email,
                subject: '✉️ We received your message - Health Guard Pharmacy',
                html: userHtml
            })
        ];

        await Promise.all(mailPromises);

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Contact Form API Error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to send message' },
            { status: 500 }
        );
    }
}
