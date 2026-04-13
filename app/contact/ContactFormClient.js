'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function ContactFormClient() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');
    const [isSending, setIsSending] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSending(true);
        const { name, email, message } = formData;
        const subject = `Contact Form Message from ${name}`;
        const body = `\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        const mailtoLink = `mailto:NFCBuzz.com@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
        setTimeout(() => {
            setIsSending(false);
            setStatus('Your email client should now be open. Thank you!');
            setFormData({ name: '', email: '', message: '' });
        }, 1000);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className={styles.contactForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. John Doe" />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="e.g. john@example.com" />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className={styles.submitButton} disabled={isSending}>
                    {isSending ? 'Opening email client…' : 'Send Message →'}
                </button>
            </form>
            {status && <p className={styles.statusMessage}>{status}</p>}
        </>
    );
}
