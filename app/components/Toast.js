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
        <div className={styles.toast}>{message}</div>
    );
}