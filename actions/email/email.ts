'use server'
import VerificationEmail from '@/emailTemplate/emailTemplate';
import { Resend } from 'resend';
interface EmailProps {
    email: string;
    subject: string;
}
export async function emailResend({email , subject}:EmailProps) {
    try {
      console.log('sending Mail')
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject:subject,
      react: VerificationEmail({email: email}),
    });
    if (error) {
        return JSON.parse(JSON.stringify({ error } ));  
    }
    console.log(data?.id , email)
    return JSON.parse(JSON.stringify(data));
} catch (error) {
    console.log(error)
    return JSON.parse(JSON.stringify({ error }));  
  }
}
