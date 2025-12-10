'use client';

import styles from './PhonePreview.module.css';

export default function PhonePreview({ vCardData }) {
    const { name, title, organization, phone, email, website, street, city, state, zip, country } = vCardData;

    const fullAddress = [street, city, state, zip, country].filter(Boolean).join(', ');

    return (
        <div className={styles.phoneContainer}>
            <div className={styles.phoneScreen}>
                <div className={styles.contactHeader}>
                    <div className={styles.profilePicPlaceholder}>
                        <span>{name ? name.charAt(0).toUpperCase() : '?'}</span>
                    </div>
                    <h2 className={styles.contactName}>{name || 'Your Name'}</h2>
                    <p className={styles.contactTitle}>{title || 'Job Title'}</p>
                    <p className={styles.contactOrg}>{organization || 'Company'}</p>
                </div>

                <div className={styles.actionButtons}>
                    {phone && (
                        <a href={`sms:${phone}`} className={styles.actionButton}>
                            <div className={styles.actionIcon}>💬</div>
                            <span>message</span>
                        </a>
                    )}
                    {phone && (
                        <a href={`tel:${phone}`} className={styles.actionButton}>
                            <div className={styles.actionIcon}>📞</div>
                            <span>call</span>
                        </a>
                    )}
                    {email && (
                        <a href={`mailto:${email}`} className={styles.actionButton}>
                            <div className={styles.actionIcon}>✉️</div>
                            <span>email</span>
                        </a>
                    )}
                    {website && (
                        <a href={website} target="_blank" rel="noopener noreferrer" className={styles.actionButton}>
                            <div className={styles.actionIcon}>🌐</div>
                            <span>website</span>
                        </a>
                    )}
                </div>

                <div className={styles.contactDetails}>
                    {phone && (
                        <div className={styles.detailItem}>
                            <a href={`tel:${phone}`} className={styles.detailValue}>
                                {phone}
                            </a>
                            <span className={styles.detailLabel}>mobile</span>
                        </div>
                    )}
                    {email && (
                        <div className={styles.detailItem}>
                            <a href={`mailto:${email}`} className={styles.detailValue}>
                                {email}
                            </a>
                            <span className={styles.detailLabel}>email</span>
                        </div>
                    )}
                    {website && (
                        <div className={styles.detailItem}>
                            <a href={website} target="_blank" rel="noopener noreferrer" className={styles.detailValue}>
                                {website}
                            </a>
                            <span className={styles.detailLabel}>website</span>
                        </div>
                    )}
                    {fullAddress && (
                        <div className={styles.detailItem}>
                            <p className={styles.detailValue}>
                                {fullAddress}
                            </p>
                            <span className={styles.detailLabel}>address</span>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.phoneNotch}></div>
            <div className={styles.phoneButton}></div>
        </div>
    );
}