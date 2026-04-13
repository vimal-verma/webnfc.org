'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './documentation.module.css';
import { usePathname } from 'next/navigation';
import { navItems } from './nav-items';

export default function DocumentationLayout({ children }) {
    const pathname = usePathname();
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    const currentTitle = navItems.find(item => pathname === `/documentation/${item.slug}`)?.title;

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

            {/* Mobile nav toggle */}
            <button
                className={styles.mobileNavToggle}
                onClick={() => setMobileNavOpen(v => !v)}
                aria-expanded={mobileNavOpen}
            >
                <span className={styles.mobileNavToggleIcon}>{mobileNavOpen ? '✕' : '☰'}</span>
                {mobileNavOpen ? 'Close menu' : (currentTitle ? `Guide: ${currentTitle}` : 'Browse guides')}
            </button>

            {mobileNavOpen && (
                <nav className={styles.mobileNav}>
                    <ul>
                        {navItems.map(item => {
                            const isActive = pathname === `/documentation/${item.slug}`;
                            return (
                                <li key={item.slug}>
                                    <Link
                                        href={`/documentation/${item.slug}`}
                                        className={isActive ? styles.activeLink : ''}
                                        onClick={() => setMobileNavOpen(false)}
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            )}

            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
}
