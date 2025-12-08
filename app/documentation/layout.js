import Link from 'next/link';
import styles from './documentation.module.css';

const navItems = [
    { slug: 'introduction', title: 'Introduction' },
    { slug: 'browser-support', title: 'Browser Support' },
    { slug: 'nfc-use-cases', title: 'NFC Use Cases' },
    { slug: 'read-nfc', title: 'How to Read an NFC Tag' },
    { slug: 'write-nfc', title: 'How to Write to an NFC Tag' },
    { slug: 'lock-nfc', title: 'How to Lock an NFC Tag' },
    { slug: 'clone-and-format', title: 'Cloning and Formatting' },
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
                {children}
            </main>
        </div>
    );
}