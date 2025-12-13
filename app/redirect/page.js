'use client';

import { useSearchParams, redirect } from 'next/navigation';
import { Suspense } from 'react';
import styles from './redirect.module.css';


function RedirectLinks() {



    const searchParams = useSearchParams();
    const encodedUrls = searchParams.get('urls');
    let urls = [];

    if (encodedUrls) {
        try {
            urls = JSON.parse(atob(encodedUrls));
        } catch (e) {
            console.error("Failed to parse URLs", e);
            return <p className={styles.error}>Invalid URL data provided.</p>;
        }
    }

    if (urls.length === 0) {
        return <p>No URLs to display.</p>;
    }

    return (
        <div className={styles.linksContainer}>
            <h1 className={styles.title}>Choose a link to open</h1>
            <ul className={styles.linkList}>
                {urls.map((url, index) => (
                    <li key={index} className={styles.linkItem}>
                        <a href={url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                            {url}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function RedirectPage() {
    const searchParams = useSearchParams();
    const encodedUrl = searchParams.get('url');
    if (encodedUrl) {
        // This will throw a REDIRECT error, which Next.js will handle.
        redirect(encodedUrl);
    }

    return <div className={styles.container}>
        <Suspense fallback={<div>Loading links...</div>}>
            <RedirectLinks />
        </Suspense>
    </div>;
}