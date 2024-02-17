// import { EmailTemplate } from '../../../components/EmailTemplate';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { EmailTemplate } from '/app/_components/email-template';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['shireff14@gmail.com'],
      subject: 'E-Commerce',
      react: EmailTemplate({ firstName: 'For Trusting Us' }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}