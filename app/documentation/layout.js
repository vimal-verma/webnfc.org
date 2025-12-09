'use client';

import Link from 'next/link';
import styles from './documentation.module.css';
import { usePathname } from 'next/navigation';
import { navItems } from './nav-items';

export default function DocumentationLayout({ children }) {
    const pathname = usePathname();

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <nav>
                    <h3 className={styles.sidebarTitle}>Guides</h3>
                    <ul>
                        {navItems.map(item => {
                            const isActive = pathname === `/documentation/${item.slug}`;
                            return (
                                <li key={item.slug}>
                                    <Link href={`/documentation/${item.slug}`} className={isActive ? styles.activeLink : ''}>
                                        {item.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>
            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
}