import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, email, callTime, language, comments, consent } = body;

        // Validation
        if (!name || !phone || !callTime || !consent) {
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

        // 1. Pharmacy Email Content (Premium Layout)
        const pharmacySubject = `📋 New Prescription Transfer Request: ${name}`;
        const pharmacyHtml = `
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
                    .warning-box { background-color: #fff3cd; border-left: 4px solid #ffc107; color: #664d03; padding: 16px; margin-bottom: 24px; border-radius: 4px; font-size: 14px; line-height: 1.5; }
                    .details-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
                    .details-table th, .details-table td { text-align: left; padding: 12px; border-bottom: 1px solid #f0f0f0; font-size: 15px; }
                    .details-table th { width: 35%; color: #666666; font-weight: 500; }
                    .details-table td { color: #111111; }
                    .comments-section { background-color: #f8f9fa; border: 1px solid #e9ecef; padding: 16px; border-radius: 8px; margin-bottom: 24px; }
                    .comments-title { font-size: 14px; color: #666666; font-weight: 500; margin-bottom: 8px; }
                    .comments-body { font-size: 15px; color: #333333; line-height: 1.5; white-space: pre-wrap; }
                    .footer { text-align: center; padding: 24px; font-size: 12px; color: #888888; border-top: 1px solid #eaeaea; }
                </style>
            </head>
            <body>
                <div class="wrapper">
                    <div class="container">
                        <div class="header">
                            <h1>Prescription Transfer Request</h1>
                            <p>Health Guard Pharmacy Callback Portal</p>
                        </div>
                        <div class="content">
                            <div class="warning-box">
                                <strong>🔒 Privacy Reminder:</strong> To comply with HIPAA guidelines, no medication lists or clinical records are collected via web submission. The pharmacist must call this patient directly to obtain prescription details over the phone.
                            </div>
                            
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
                                    <td>${email ? `<a href="mailto:${email}" style="color: #0f5132; text-decoration: none;">${email}</a>` : '<span style="color: #888; font-style: italic;">Not provided</span>'}</td>
                                </tr>
                                <tr>
                                    <th>Best Time to Call</th>
                                    <td><span style="background-color: #d1e7dd; color: #0f5132; padding: 4px 8px; border-radius: 4px; font-size: 13px; font-weight: 600;">${callTime}</span></td>
                                </tr>
                                <tr>
                                    <th>Preferred Language</th>
                                    <td>${language || 'No preference'}</td>
                                </tr>
                            </table>

                            ${comments ? `
                            <div class="comments-section">
                                <div class="comments-title">Additional Details</div>
                                <div class="comments-body">${comments}</div>
                            </div>
                            ` : ''}

                            <div style="font-size: 13px; color: #666; text-align: center; margin-top: 16px;">
                                Patient consented to call and confirmed receipt of notification policy.
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

        // 2. Patient Confirmation Email (Premium Layout)
        const patientHtml = `
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
                    .card { background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 12px; padding: 24px; margin: 24px 0; }
                    .card-title { font-weight: 600; font-size: 15px; margin-bottom: 12px; color: #111111; text-transform: uppercase; letter-spacing: 0.05em; }
                    .step-list { padding-left: 20px; margin: 0; }
                    .step-list li { margin-bottom: 12px; font-size: 15px; }
                    .btn-call { display: inline-block; background-color: #0f5132; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 30px; font-weight: 600; font-size: 15px; margin: 16px 0; text-align: center; }
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
                            <p>Thank you for initiating your prescription transfer to Health Guard Pharmacy. We are excited to welcome you and handle all the details for you!</p>
                            
                            <div class="card">
                                <div class="card-title">What Happens Next?</div>
                                <ol class="step-list">
                                    <li><strong>We Review Your Request:</strong> Our pharmacy team has received your callback preference.</li>
                                    <li><strong>We Call You:</strong> A pharmacist will call you at <strong>${phone}</strong> during your preferred time (<strong>${callTime}</strong>).</li>
                                    <li><strong>We Call Your Old Pharmacy:</strong> Once we securely collect your prescription names over the phone, we will contact your previous pharmacy to transfer them directly.</li>
                                </ol>
                            </div>

                            <p style="font-size: 14px; color: #666; font-style: italic;">Note: To protect your private health information, we never ask you to send prescription names or lists over the internet.</p>
                            
                            <div style="text-align: center; margin-top: 32px;">
                                <p style="margin-bottom: 8px; font-size: 14px; color: #555;">Prefer to speed up the process and speak to us right now?</p>
                                <a href="tel:7185076800" class="btn-call">Call Pharmacy: (718) 507-6800</a>
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

        // Send Email to Pharmacy
        const mailPromises = [
            transporter.sendMail({
                from: `"Health Guard Web Portal" <${process.env.SMTP_USER || 'jaylinman4@gmail.com'}>`,
                to: process.env.CONTACT_EMAIL_TO || 'jaylinman4@gmail.com',
                subject: pharmacySubject,
                html: pharmacyHtml
            })
        ];

        // Send confirmation email to patient if email is provided
        if (email) {
            mailPromises.push(
                transporter.sendMail({
                    from: `"Health Guard Pharmacy" <${process.env.SMTP_USER || 'jaylinman4@gmail.com'}>`,
                    to: email,
                    subject: '✅ Prescription Transfer Request Received - Health Guard Pharmacy',
                    html: patientHtml
                })
            );
        }

        await Promise.all(mailPromises);

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Transfer RX Error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to submit transfer request' },
            { status: 500 }
        );
    }
}
