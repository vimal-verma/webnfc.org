import Link from 'next/link';
import styles from './[slug]/page.module.css';
import { navItems } from './nav-items';

export const metadata = {
    title: 'Documentation & Guides | WebNfc.org',
    description: 'Your official resource for learning how to use the Web NFC API and our powerful online tools.',
    keywords: ['Web NFC documentation', 'WebNFC guides', 'NFC tutorials', 'Web NFC API', 'NFC examples', 'NFC how-to', 'WebNFC learning', 'NFC tag writing guide', 'NFC tag reading guide', 'WebNfc.org', 'webnfc code examples', 'nfc api documentation', 'nfc programming guide', 'nfc development tutorials', 'nfc application examples', 'nfc web tool guides', 'web nfc tutorials', 'nfc tag management', 'nfc tag writing tutorials', 'nfc tag reading tutorials', 'web nfc api guide', 'nfc for developers', 'nfc coding examples', 'web nfc projects', 'nfc technology guides', 'nfc online tool documentation', 'web nfc how-to guides'],
};

export default function DocumentationPage() {
    return (
        <div className={styles.documentationContainer}>
            <header className={styles.hero}>
                <h1 className={styles.title}>Documentation & Guides</h1>
                <p className={styles.subtitle}>
                    Your official resource for learning how to use the Web NFC API and our powerful online tools.
                </p>
            </header>
            <div className={styles.guidesGrid}>
                {navItems.filter(item => item.slug !== 'introduction').map(item => (
                    <Link href={`/documentation/${item.slug}`} key={item.slug} className={styles.guideCard}>
                        <h3>{item.title}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
}