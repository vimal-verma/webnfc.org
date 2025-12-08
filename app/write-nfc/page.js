import { Suspense } from 'react';
import WriteTagClient from './write-tag-client';
import styles from './page.module.css';

export const metadata = {
    title: 'Write to NFC Tag Online | Free Web NFC Writer | WebNfc',
    description: 'Use our free online tool to write data to any NFC tag directly in your browser. Write text, URLs, or contact cards (vCards) with a single tap. No app installation required.',
    keywords: [
        'Write NFC',
        'NFC Writer',
        'Web NFC Writer',
        'Program NFC Tag',
        'NFC Data Writer',
        'Online NFC Tool',
        'Write vCard to NFC',
        'Write URL to NFC',
        'WebNFC'
    ],
};

export default function WriteTagPage() {
    return (
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
    );
}