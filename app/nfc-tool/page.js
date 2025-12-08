import Link from 'next/link';
import styles from './page.module.css';
import NfcClientTool from './nfc-client-tool';

export const metadata = {
  title: 'Advanced NFC Web Tool | WebNfc',
  description: 'An all-in-one Web NFC tool to read, write, clone, erase, format, and lock NFC tags directly from your browser. Supports text, URL, and vCard records. No installation needed.',
  keywords: ['NFC', 'Web NFC', 'NFC Tool', 'NFC Reader', 'NFC Writer', 'Clone NFC', 'Erase NFC', 'vCard NFC', 'NFC Formatting', 'Lock NFC Tags', 'Contactless Technology', 'NFC Tags', 'NFC Business Cards', 'Digital Business Cards', 'Custom NFC Cards', 'Smart Business Cards', 'NFC Technology', 'Networking', 'Contactless Cards', 'NFC Card Design', 'Digital Networking', 'NFC Card Printing', 'Customizable NFC Cards', 'Eco-friendly Business Cards', 'NFC Card Solutions', 'Professional Networking Tools', 'Design Your NFC Card', 'NFC Card Features', 'NFC Card Pricing', 'Order NFC Cards Online', 'Low Cost NFC Cards', 'NFC Card Reviews', 'NFC Card Blog', 'NFC Card Contact', 'NFC Card FAQ', 'NFC Tool for Web', 'NFC Card Templates', 'NFC Card Ideas'],
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