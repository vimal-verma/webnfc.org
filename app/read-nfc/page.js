import { Suspense } from 'react';
import ReadNfcClient from './read-nfc-client';
import styles from './page.module.css';

export const metadata = {
    title: 'Read NFC Tag Online | Free Web NFC Reader | WebNfc',
    description: 'Use our free online tool to read data from any NFC tag directly in your browser. Supports text, URLs, contact cards (vCards), and more. No app installation required.',
    keywords: [
        'Read NFC',
        'NFC tag reader online',
        'NFC tag reader',
        'Free NFC tag reader online',
        'Free NFC tag reader',
        'NFC Reader',
        'Web NFC Reader',
        'Scan NFC Tag',
        'NFC Data Reader',
        'Online NFC Tool',
        'Read vCard from NFC',
        'Check NFC Tag',
        'WebNFC',
        'vCard Preview',
        'NFC Tag Scanner',
        'vCard Reader',
        'vCard NFC',
        'NFC Contact Card',
        'vcard download',
        'read nfc card',
        'read nfc tag online',
        'nfc tag data reader',
        'nfc tag info reader',
        'nfc tag content reader',
        'nfc tag text reader',
        'nfc tag url reader',
        'nfc tag vcard reader',
        'nfc tag utl opener',
        'nfc tag vcard opener',
        'nfc tag contact reader',
    ],
};

export default function ReadNfcPage() {
    return (
        <div className={styles.container}>
            <header className={styles.hero}>
                <h1 className={styles.title}>Online NFC Tag Reader</h1>
                <p className={styles.subtitle}>
                    Instantly read the contents of any NFC tag using your phone&apos;s browser.
                </p>
            </header>
            <Suspense fallback={<div>Loading...</div>}>
                <ReadNfcClient />
            </Suspense>
        </div>
    );
}