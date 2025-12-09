'use client';

import { useState, useRef } from 'react';
import styles from './page.module.css';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
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
        // Constructing a body with line breaks for the email client
        const body = `\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

        // Create the mailto link and trigger it
        const mailtoLink = `mailto:NFCBuzz.com@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;

        // Reset form after a short delay to allow the email client to open
        setTimeout(() => {
            setIsSending(false);
            setStatus('Your email client should now be open. Thank you!');
            setFormData({ name: '', email: '', message: '' });
        }, 1000);
    };

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>Contact Us</h1>
                <p className={styles.subtitle}>
                    Have a question or want to work with us? Drop us a message!
                </p>
                <form onSubmit={handleSubmit} className={styles.contactForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className={styles.submitButton} disabled={isSending}>
                        {isSending ? 'Opening Email...' : 'Send Message'}
                    </button>
                </form>
                {status && <p className={styles.statusMessage}>{status}</p>}
            </div>
        </div>
    );
}