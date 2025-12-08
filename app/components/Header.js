'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';
import styles from './Header.module.css';
import { useState } from 'react';

export default function Header() {
    const { theme, toggleTheme } = useTheme();
    const [isNavOpen, setIsNavOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isNavOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isNavOpen]);

    return (
        <header className={styles.header}>
            {isNavOpen && (
                <div
                    className={styles.overlay}
                    onClick={() => setIsNavOpen(false)}
                />
            )}
            <div className={styles.headerContent}>
                <Link href="/" className={styles.logo}>
                    WebNfc
                </Link>

                <nav className={`${styles.nav} ${isNavOpen ? styles.navOpen : ''}`}>
                    <Link href="/" onClick={() => setIsNavOpen(false)}>Home</Link>
                    <Link href="/vcard" onClick={() => setIsNavOpen(false)}>vCard</Link>
                    <Link href="/upi" onClick={() => setIsNavOpen(false)}>UPI Tool</Link>
                    <Link href="/nfc-tool" onClick={() => setIsNavOpen(false)}>NFC Tool</Link>
                    <Link href="/blog" onClick={() => setIsNavOpen(false)}>Blog</Link>
                    <Link href="/documentation" onClick={() => setIsNavOpen(false)}>Documentation</Link>
                </nav>

                <div className={styles.headerActions}>
                    <div className={styles.themeToggler}>
                        <button onClick={() => toggleTheme('light')} className={theme === 'light' ? styles.activeTheme : ''} aria-label="Light theme">
                            ☀️
                        </button>
                        <button onClick={() => toggleTheme('dark')} className={theme === 'dark' ? styles.activeTheme : ''} aria-label="Dark theme">
                            🌙
                        </button>
                    </div>
                    <button
                        className={`${styles.hamburger} ${isNavOpen ? styles.hamburgerOpen : ''}`}
                        onClick={() => setIsNavOpen(!isNavOpen)}
                        aria-label="Toggle navigation"
                        aria-expanded={isNavOpen}
                    >
                        <span></span><span></span><span></span>
                    </button>
                </div>
            </div>
        </header>
    );
}