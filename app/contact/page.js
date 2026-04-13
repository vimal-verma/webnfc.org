import styles from './page.module.css';
import ContactFormClient from './ContactFormClient';

export const metadata = {
    title: 'Contact Us | WebNfc',
    description: 'Get in touch with the WebNfc team. Ask questions, report issues, or share your ideas about NFC technology and our tools.',
    keywords: ['contact WebNfc', 'NFC support', 'WebNFC contact', 'NFC help', 'contact NFC team', 'WebNfc feedback'],
    alternates: {
        canonical: 'https://webnfc.org/contact',
    },
    openGraph: {
        title: 'Contact Us | WebNfc',
        description: 'Get in touch with the WebNfc team. Ask questions, report issues, or share your ideas about NFC technology.',
        url: 'https://webnfc.org/contact',
        siteName: 'WebNfc',
        images: [{ url: '/og-logo.png', width: 1200, height: 630, alt: 'WebNfc' }],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Us | WebNfc',
        description: 'Get in touch with the WebNfc team. Ask questions, report issues, or share your ideas.',
        images: ['/og-logo.png'],
    },
};

export default function ContactPage() {
    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>Contact Us</h1>
                <p className={styles.subtitle}>
                    Have a question or want to work with us? Drop us a message and we&apos;ll get back to you.
                </p>
                <ContactFormClient />
            </div>
        </div>
    );
}
