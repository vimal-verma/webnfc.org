import { Suspense } from 'react';
import ShowCaseClient from './showcase-client';
import styles from './page.module.css';

export const metadata = {
    title: 'Web NFC Project Showcase — Examples & Community Demos | WebNfc',
    description: 'Explore a curated list of innovative projects, websites, and applications built with the Web NFC API. See real-world examples and get inspired to build your own.',
    keywords: [
        'Web NFC showcase',
        'WebNFC projects',
        'Web NFC examples',
        'NFC demos',
        'Web NFC applications',
        'community projects',
        'NFC showcase',
    ],
    alternates: {
        canonical: 'https://webnfc.org/showcase',
    },
    openGraph: {
        title: 'Web NFC Project Showcase — Examples & Community Demos | WebNfc',
        description: 'Explore innovative projects built with the Web NFC API. Real-world examples and community demos.',
        url: 'https://webnfc.org/showcase',
        siteName: 'WebNfc',
        images: [{ url: '/og-logo.png', width: 1200, height: 630, alt: 'WebNfc Showcase' }],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Web NFC Project Showcase | WebNfc',
        description: 'Explore innovative projects built with the Web NFC API. Community demos and real-world examples.',
        images: ['/og-logo.png'],
    },
};

export default function ShowCasePage() {
    return (
        <>
            <header className={styles.pageHero}>
                <h1 className={styles.title}>Web NFC Project Showcase</h1>
                <p className={styles.subtitle}>
                    Explore innovative projects built with Web NFC technology or submit your own!
                </p>
            </header>
            <Suspense fallback={<div style={{textAlign:'center',padding:'4rem',color:'var(--text-secondary)'}}>Loading projects…</div>}>
                <ShowCaseClient />
            </Suspense>
        </>
    );
}
