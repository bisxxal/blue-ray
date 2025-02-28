'use client';
import { useState } from 'react';
const NodeMailerEmail = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('Sending email...');
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject: 'Contact Form Submission',       // Subject of the email
          text: message,
          html: `<p>${message}</p>`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus('Email sent successfully!');
      } else {
        setStatus('Failed to send email');
      }
    } catch (error) {
      setStatus('Error sending email');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Recipient Email"
        required
        className=' bg-transparent inputbg'
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your Message"
        required
        className=' bg-transparent inputbg'
      />
      <button type="submit">Send Email</button>
      <p>{status}</p>
    </form>
  );
};

export default NodeMailerEmail;
