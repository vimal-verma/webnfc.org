import Link from 'next/link';
import styles from './page.module.css';
import NfcClientTool from './nfc-client-tool';

export const metadata = {
  title: 'Advanced NFC Web Tool | WebNfc',
  description: 'An all-in-one Web NFC tool to read, write, clone, erase, format, and lock NFC tags directly from your browser. Supports text, URL, and vCard records. No installation needed.',
  keywords: ['NFC', 'Web NFC', 'NFC Tool', 'NFC Reader', 'NFC Writer', 'Clone NFC', 'Erase NFC', 'vCard NFC', 'NFC Formatting', 'Lock NFC Tags', 'Contactless Technology', 'NFC Tags', 'Low Cost NFC Cards', 'NFC Stickers', 'NFC Keychains', 'NFC Rings', 'NFC Bracelets', 'NFC Business Cards', 'NFC for Marketing', 'NFC for Events', 'NFC for Payments', 'NFC for Access Control', 'NFC for Smart Homes', 'NFC for IoT', 'NFC Development', 'NFC Programming', 'NFC Applications', 'NFC Solutions', 'WebNfc', 'NFC Online Tool', 'NFC Tag Management', 'NFC Tag Writer', 'NFC Tag Reader', 'NFC Tag Cloner', 'NFC Tag Eraser', 'NFC Tag Formatter', 'NFC Tag Locker'],
  openGraph: {
    title: 'Advanced NFC Web Tool | WebNfc',
    description: 'An all-in-one Web NFC tool to read, write, clone, erase, format, and lock NFC tags directly from your browser.',
    url: 'https://webnfc.org/nfc-tool',
    siteName: 'WebNfc',
    images: '/og-logo.png',
    type: 'website',
  },
  icons: {
    icon: '/logo.png',
  },
};

// This is the new main page component (Server Component)
export default function NfcToolPage() {
  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <h1 className={styles.title}>NFC Tool</h1>
        <p className={styles.subtitle}>Read from and Write to NFC tags directly in your browser.</p>
        <p className={styles.warning}>
          <strong>Note:</strong> This tool requires a browser that supports the Web NFC API (like Chrome on Android).
        </p>
      </header>

      <NfcClientTool />

      <section className={styles.ctaSection}>
        <h2>Create Your Own NFC Business Card</h2>
        <p>Ready to make a lasting impression? Design a custom NFC business card and share your details with a single tap.</p>
        <Link href="/design" className={styles.ctaButton}>
          Start Designing Now
        </Link>
      </section>
    </div>
  );
}