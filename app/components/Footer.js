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
                    <p>The Future of Networking.</p>
                    <div className={styles.socialIcons}>
                        <a href="https://twitter.com/webnfcCom" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Twitter">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                        </a>
                        <a href="https://instagram.com/webnfc" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.227-1.669 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.148-3.227 1.669-4.771 4.919-4.919 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.058 1.281-.072 1.688-.072 4.947s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.688.072 4.947.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"></path></svg>
                        </a>
                    </div>
                </div>
                <div className={styles.linksGrid}>
                    <div className={styles.linkColumn}>
                        <h4>Company</h4>
                        <Link href="/about">About Us</Link>
                        <Link href="/blog">Blog</Link>
                        <Link href="/media">Media</Link>
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