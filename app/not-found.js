import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.subtitle}>Oops! Page Not Found.</p>
            <p className={styles.description}>
                It seems you&apos;ve taken a wrong turn. The page you are looking for
                doesn&apos;t exist or has been moved.
            </p>
            <Link href="/" className={styles.homeButton}>
                Go Back to Home
            </Link>
        </div>
    );
}