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
                    <div className={styles.actionButton}><div className={styles.actionIcon}>💬</div><span>message</span></div>
                    <div className={styles.actionButton}><div className={styles.actionIcon}>📞</div><span>call</span></div>
                    <div className={styles.actionButton}><div className={styles.actionIcon}>✉️</div><span>email</span></div>
                    <div className={styles.actionButton}><div className={styles.actionIcon}>🌐</div><span>website</span></div>
                </div>

                <div className={styles.contactDetails}>
                    {phone && (
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>mobile</span>
                            <span className={styles.detailValue}>{phone}</span>
                        </div>
                    )}
                    {email && (
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>email</span>
                            <span className={styles.detailValue}>{email}</span>
                        </div>
                    )}
                    {website && (
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>website</span>
                            <span className={styles.detailValue}>{website}</span>
                        </div>
                    )}
                    {fullAddress && (
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>work address</span>
                            <span className={styles.detailValue}>{fullAddress}</span>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.phoneNotch}></div>
            <div className={styles.phoneButton}></div>
        </div>
    );
}