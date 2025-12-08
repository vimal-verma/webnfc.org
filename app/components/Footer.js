'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import Toast from './Toast';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [toastMessage, setToastMessage] = useState('');

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscribe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        setToastMessage(data.message);
        if (response.ok) setEmail('');
    };

    return (
        <footer className={styles.footer}>
            <Toast message={toastMessage} onClose={() => setToastMessage('')} />
            <div className={styles.footerContent}>
                <div className={styles.footerBrand}>
                    <Link href="/" className={styles.logo}>WebNfc</Link>
                    <p>learn, build, and use Web NFC technology directly in your browser.</p>
                </div>
                <div className={styles.linksGrid}>
                    <div className={styles.linkColumn}>
                        <h4>Company</h4>
                        <Link href="/about">About Us</Link>
                        <Link href="/documentation">Documentation</Link>
                        <Link href="/blog">Blog</Link>
                        <Link href="/contact">Contact Us</Link>
                        <Link href="/Design">Design</Link>
                    </div>
                    <div className={styles.linkColumn}>
                        <h4>Our Tools</h4>
                        <Link href="/vcard">vCard Generator</Link>
                        <Link href="/upi">Upi QR Generator</Link>
                        <Link href="/read-nfc">Read NFC Tag</Link>
                        <Link href="/write-nfc">Write NFC Tag</Link>
                        <Link href="/nfc-tool">Legacy NFC Tool</Link>
                    </div>
                </div>
                <div className={styles.newsletter}>
                    <h4>Subscribe to our Newsletter</h4>
                    <p>Get the latest on NFC tech, new products, and exclusive offers.</p>
                    <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
                        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>
            <p className={styles.copyright}>&copy; {new Date().getFullYear()} WebNfc. All rights reserved.</p>
        </footer>
    );
}