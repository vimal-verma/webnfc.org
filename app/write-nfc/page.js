import { Suspense, Fragment } from 'react';
import WriteTagClient from './write-tag-client';
import styles from './page.module.css';

export const metadata = {
    title: 'Write to NFC Tag Online | Free Web NFC Writer | WebNfc',
    description: 'Use our free online tool to write data to any NFC tag directly in your browser. Write text, URLs, or contact cards (vCards) with a single tap. No app installation required.',
    keywords: [
        'Write NFC',
        'NFC tag writer online',
        'NFC tag writer',
        'Free NFC tag writer online',
        'Free NFC tag writer',
        'NFC Writer',
        'Web NFC Writer',
        'Program NFC Tag',
        'NFC Data Writer',
        'Online NFC Tool',
        'Write vCard to NFC',
        'Write URL to NFC',
        'WebNFC',
        'NFC Tag Encoder',
        'NFC Tag Programmer',
        'NFC Tag Copier',
        'NFC Tag Editor',
        'NFC Tag Tool',
        'NFC Tag Utility',
        'NFC Tag Manager',
        'NFC Tag Application',
        'NFC Tag Service',
    ],
    openGraph: {
        title: 'Write to NFC Tag Online | Free Web NFC Writer | WebNfc',
        description: 'Use our free online tool to write data to any NFC tag directly in your browser. Write text, URLs, or contact cards (vCards) with a single tap.',
        url: 'https://webnfc.org/write-nfc',
        siteName: 'WebNfc',
        images: '/og-logo.png',
        type: 'website',
    },
};

export default function WriteTagPage() {
    const softwareApplicationSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Online NFC Tag Writer',
        applicationCategory: 'Utilities',
        operatingSystem: 'Web',
        browserRequirements: 'Requires a browser with WebNFC support (e.g., Chrome on Android).',
        description: 'A free online tool to write text, URLs, and vCards to NFC tags directly in your browser.',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
        },
        publisher: {
            '@type': 'Organization',
            name: 'WebNfc'
        }
    };

    return (
        <Fragment>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
            />
            <div className={styles.container}>
                <header className={styles.hero}>
                    <h1 className={styles.title}>Online NFC Tag Writer</h1>
                    <p className={styles.subtitle}>
                        Choose a record type, enter your data, and tap your NFC tag to write.
                    </p>
                </header>
                <Suspense fallback={<div>Loading...</div>}>
                    <WriteTagClient />
                </Suspense>
            </div>
        </Fragment>
    );
}