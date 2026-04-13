'use client';

import { useEffect } from 'react';
import styles from './Toast.module.css';

export default function Toast({ message, onClose }) {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div role="status" aria-live="polite" className={styles.toastWrapper}>
            <div className={styles.toast}>
                <span>{message}</span>
                <button onClick={onClose} className={styles.dismissBtn} aria-label="Dismiss notification">×</button>
            </div>
        </div>
    );
}