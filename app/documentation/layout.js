import Link from 'next/link';
import styles from './documentation.module.css';
import CodeBlock from './CodeBlock';

const navItems = [
    { slug: 'introduction', title: 'Introduction' },
    { slug: 'browser-support', title: 'Browser Support' },
    { slug: 'read-nfc', title: 'How to Read an NFC Tag' },
    { slug: 'write-text-record', title: 'How to Write a Text Record' },
    { slug: 'write-url-record', title: 'How to Write a URL Record' },
    { slug: 'write-vcard-record', title: 'How to Write a vCard' },
    { slug: 'write-upi-record', title: 'How to Write a UPI Link' },
    { slug: 'lock-nfc', title: 'How to Lock an NFC Tag' },
    { slug: 'clone-and-format', title: 'Cloning and Formatting' },
    { slug: 'nfc-security-best-practices', title: 'NFC Security Best Practices' },
    { slug: 'nfc-tag-types', title: 'NFC Tag Types Explained' },
    { slug: 'nfc-vs-rfid', title: "NFC vs. RFID: What's the Difference?" },
    { slug: 'troubleshooting', title: 'Troubleshooting' },
    { slug: 'history-of-nfc', title: 'A Brief History of NFC' },
    { slug: 'nfc-use-cases', title: 'NFC Use Cases' },
];

export default function DocumentationLayout({ children }) {
    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <nav>
                    <h3 className={styles.sidebarTitle}>Guides</h3>
                    <ul>
                        {navItems.map(item => (
                            <li key={item.slug}>
                                <Link href={`/documentation/${item.slug}`}>{item.title}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
            <main className={styles.mainContent}>
                <CodeBlock>
                    {children}
                </CodeBlock>
            </main>
        </div>
    );
}