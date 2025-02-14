'use server'
import VerificationEmail from '@/components/emailTemplate';
import { Resend } from 'resend';
interface EmailProps {
    email?: string;
    func ?: any;
    subject?: string;
}
export async function emailResend({email , func , subject}:EmailProps) {
    try {
      console.log('sending Mail')
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['bbgudul@gmail.com'],
      subject: 'Hello world',
      react: VerificationEmail({username: 'bishal ',otp: '2323'}),
    });

    if (error) {
        return JSON.parse(JSON.stringify({ error } ));  
    }
 
    console.log(error)
    return JSON.parse(JSON.stringify(data));  
    
} catch (error) {
    console.log(error)
    return JSON.parse(JSON.stringify({ error }));  
  }
}
