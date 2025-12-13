'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './SecondaryNav.module.css';
import { tools } from '../lib/tool-list';

export default function SecondaryNav() {
    const pathname = usePathname();

    return (
        <nav className={styles.secondaryNav}>
            <div className={styles.scrollContainer}>
                {tools.map((tool) => (
                    <Link key={tool.href} href={tool.href} className={`${styles.navLink} ${pathname === tool.href ? styles.active : ''}`}>
                        {tool.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
}