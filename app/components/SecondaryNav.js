'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './SecondaryNav.module.css';

const tools = [
    { name: 'vCard', href: '/vcard' },
    { name: 'UPI', href: '/upi' },
    { name: 'URL', href: '/url' },
    { name: 'WiFi', href: '/wifi' },
    { name: 'SMS', href: '/sms' },
    { name: 'Email', href: '/email' },
    { name: 'Call', href: '/call' },
    { name: 'Event', href: '/event' },
    { name: 'Location', href: '/location' },
];

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