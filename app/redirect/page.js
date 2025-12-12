import { redirect } from 'next/navigation';
import { Fragment } from 'react';
import styles from './redirect.module.css';

export const metadata = {
    title: 'Redirect Tool | WebNfc',
    description: 'A simple tool to redirect to a URL specified as a query parameter.',
    robots: {
        index: false, // No need for search engines to index this utility page
    },
};

export default async function RedirectPage({ searchParams }) {
    const { url } = await searchParams;

    if (url) {
        // This will throw a REDIRECT error, which Next.js will handle.
        redirect(url);
    }


    // This content will be shown if no URL is provided.
    return (
        <Fragment>
            <meta httpEquiv="refresh" content="5;url=/" />
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>URL Redirector</h1>
                    <p className={styles.subtitle}>
                        This tool redirects you to the URL specified in the query parameter.
                    </p>
                </header>
                <div className={styles.usage}>
                    <h2>Usage</h2>
                    <p>Append <code>?url=</code> followed by the destination URL to the address bar.</p>
                    <p><strong>Example:</strong> <code>/redirect?url=https://webnfc.org</code></p>
                </div>
                <p className={styles.error}>No URL provided. Please specify a <code>url</code> query parameter to redirect.</p>
                <p>Redirecting to home page in 3 seconds...</p>
            </div>
        </Fragment>
    );
}