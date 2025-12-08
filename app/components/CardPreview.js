import React from 'react';
import styles from '../design/page.module.css';
import Image from 'next/image';

const CardPreview = React.memo(function CardPreview({ design }) {
    const cardStyle = {
        backgroundColor: design.backgroundType === 'color' ? design.cardColor : 'transparent',
        backgroundImage: design.backgroundType === 'image' && design.backgroundImagePreview ? `url(${design.backgroundImagePreview})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const frontCardPreviewClassName = `${styles.cardPreview} ${styles[design.layout]}`;
    const backCardPreviewClassName = `${styles.cardPreview} ${styles[design.backLayout]}`;
    const logoClassName = `${styles.logoPreview} ${design.uploadType === 'logo' ? styles.logoCircle : styles.logoSquare}`;
    const backLogoClassName = `${styles.logoPreview} ${design.backUploadType === 'logo' ? styles.logoCircle : styles.logoSquare}`;

    return (
        <div className={styles.flipper}>
            <div className={`${styles.cardFace} ${styles.cardFaceFront} ${frontCardPreviewClassName}`} style={{ ...cardStyle, backgroundColor: design.cardColor, color: design.textColor, fontFamily: design.fontFamily }}>
                {design.logoPreview && (
                    <div className={styles.logoWrapper}>
                        <Image
                            src={design.logoPreview}
                            alt={`${design.uploadType} preview`}
                            fill
                            sizes="(max-width: 768px) 10vw, 5vw"
                            className={logoClassName} />
                    </div>
                )}
                <div className={styles.cardText}>
                    <p className={styles.nameText}>{design.name}</p>
                    <p className={styles.titleText}>{design.title}</p>
                    <div className={styles.contactInfo}>
                        <p>{design.phone}</p>
                        <p>{design.email}</p>
                    </div>
                </div>
                {design.nfcIcon && (
                    <Image
                        src="/nfc.svg"
                        alt="NFC Icon"
                        width={25}
                        height={25}
                        className={styles.nfcIcon}
                        style={{ filter: design.textColor === '#ffffff' ? 'invert(100%)' : 'none' }}
                    />
                )}
            </div>
            <div className={`${styles.cardFace} ${styles.cardFaceBack} ${backCardPreviewClassName}`} style={{ ...cardStyle, color: design.backTextColor, fontFamily: design.fontFamily }}>
                {design.backLogoPreview && (
                    <div className={styles.logoWrapper}>
                        <Image
                            src={design.backLogoPreview}
                            alt={`${design.backUploadType} preview`}
                            fill
                            sizes="(max-width: 768px) 10vw, 5vw"
                            className={backLogoClassName} />
                    </div>
                )}
                <div className={styles.cardText}>
                    <p className={styles.nameText}>{design.backName}</p>
                    <p className={styles.titleText}>{design.backTitle}</p>
                    <div className={styles.contactInfo}>
                        <p>{design.backPhone}</p>
                        <p>{design.backEmail}</p>
                    </div>
                </div>
                {design.nfcIcon && (
                    <Image
                        src="/nfc.svg"
                        alt="NFC Icon"
                        width={25}
                        height={25}
                        className={styles.nfcIcon}
                        style={{ filter: design.backTextColor === '#ffffff' ? 'invert(100%)' : 'none' }}
                    />
                )}
            </div>
        </div>
    );
});

export default CardPreview;