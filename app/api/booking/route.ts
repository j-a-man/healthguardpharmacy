import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// IN-MEMORY DATABASE
// This variable persists as long as the server is running.
// In a real app, you would save this to a database (Postgres/Firebase).
let bookedSlots: { date: string; time: string }[] = [];

export async function GET(request: Request) {
  // Allow the frontend to fetch taken slots to disable them in the UI
  return NextResponse.json({ bookedSlots });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, date, time, service } = body;

        // 1. Check availability (Server-side validation)
        // We check if any slot in our "database" matches the requested date and time
        const isTaken = bookedSlots.some(slot => slot.date === date && slot.time === time);
        
        if (isTaken) {
             return NextResponse.json(
                { success: false, message: 'This time slot was just booked by someone else.' }, 
                { status: 409 } // 409 Conflict
            );
        }

        // 2. Reserve the Slot
        bookedSlots.push({ date, time });

        // 3. Configure Email Transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'jaylinman4@gmail.com',
                pass: 'wtyckhujotshrcab' // Your App Password
            }
        });

        // 4. Define Email Content

        // --- A. Email to the PHARMACY (Notification) ---
        const pharmacySubject = `📅 New Booking: ${service} @ ${time}`;
        const pharmacyHtml = `
            <div style="font-family: Arial, sans-serif; border: 1px solid #ccc; padding: 20px; border-radius: 8px;">
                <h2 style="color: #16a34a;">New Appointment Received</h2>
                <p><strong>Service:</strong> ${service}</p>
                <p><strong>Customer Name:</strong> ${name}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Email:</strong> ${email}</p>
                <hr />
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Time:</strong> ${time}</p>
            </div>
        `;

        // --- B. Email to the CUSTOMER (Confirmation) ---
        const userSubject = `✅ Appointment Confirmed: Health Guard Pharmacy`;
        const userHtml = `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px; max-w-600px;">
                <h2 style="color: #16a34a;">Your Appointment is Confirmed</h2>
                <p>Hi ${name},</p>
                <p>We have received your booking for a <strong>${service}</strong>.</p>
                
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p style="margin: 5px 0;"><strong>📅 Date:</strong> ${date}</p>
                    <p style="margin: 5px 0;"><strong>⏰ Time:</strong> ${time}</p>
                    <p style="margin: 5px 0;"><strong>📍 Location:</strong> 33-13 Junction Blvd, Jackson Heights, NY</p>
                </div>

                <p>If you need to reschedule or cancel, please give us a call at <strong>(718) 507-6800</strong>.</p>
                <br />
                <p style="font-size: 12px; color: #888;">Health Guard Pharmacy</p>
            </div>
        `;

        // 5. Send Both Emails Simultaneously
        await Promise.all([
            // Send to Pharmacy
            transporter.sendMail({
                from: '"Health Guard Website" <jaylinman4@gmail.com>',
                to: 'jaylinman4@gmail.com', // Pharmacy's email
                subject: pharmacySubject,
                html: pharmacyHtml,
            }),
            // Send to Customer
            transporter.sendMail({
                from: '"Health Guard Pharmacy" <jaylinman4@gmail.com>',
                to: email, // User's email from form
                subject: userSubject,
                html: userHtml,
            })
        ]);

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Booking Error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to process booking' }, 
            { status: 500 }
        );
    }
}