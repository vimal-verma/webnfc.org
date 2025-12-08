import Link from 'next/link';
import Image from 'next/image';
import styles from '../blog/page.module.css';

export const metadata = {
    title: 'Documentation | WebNfc',
    description: 'Find all our guides, how-to articles, and documentation for using Web NFC and our free online tools.',
    keywords: [
        'Web NFC documentation',
        'Web NFC guide',
        'how to use Web NFC',
        'NFC tutorial',
        'NFC guides',
        'NFC how-to',
    ],
    openGraph: {
        title: 'Documentation | WebNfc',
        description: 'Find all our guides, how-to articles, and documentation for using Web NFC and our free online tools.',
        url: 'https://webnfc.org/documentation',
        siteName: 'WebNfc',
        images: '/og-logo.png',
        type: 'website',
    },
    icons: {
        icon: '/logo.png',
    },
};

export default function DocumentationPage() {


    return (
        <div className={styles.container}>
            <header className={styles.hero}>
                <h1 className={styles.title}>Documentation & Guides</h1>
                <p className={styles.subtitle}>
                    Your official resource for learning how to use Web NFC and our powerful online tools.
                </p>
            </header>


        </div>
    );
}