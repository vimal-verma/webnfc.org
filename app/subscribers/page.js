import styles from './page.module.css';

async function getSubscribers() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscribers`, {
            cache: 'no-store', // Ensures we always get the latest list
        });

        if (!res.ok) {
            throw new Error('Failed to fetch subscribers');
        }

        return res.json();
    } catch (error) {
        return [];
    }
}

export const metadata = {
    title: 'Newsletter Subscribers | NFCBuzz Admin',
    robots: {
        index: false,
        follow: false,
    },
};

export default async function SubscribersPage() {
    const subscribers = await getSubscribers();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Newsletter Subscribers ({subscribers.length})</h1>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Email Address</th>
                            <th>Subscribed On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscribers.map((subscriber) => (
                            <tr key={subscriber._id}>
                                <td>{subscriber.email}</td>
                                <td>{new Date(subscriber.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}