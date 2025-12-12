import { Suspense, Fragment } from 'react';
import VCardClientTool from './vcard-client-tool';
import styles from './page.module.css';
import SecondaryNav from '../components/SecondaryNav';

export const metadata = {
    title: 'Free vCard Generator with QR Code & Shareable Link | WebNfc',
    description: 'Create a professional digital business card with our free vCard generator. Instantly generate a shareable link and a downloadable QR code for your contact details. You can also write your vCard directly to an NFC tag. No sign-up required.',
    keywords: [
        'vCard',
        'vCard generator',
        'free vCard generator',
        '.vcf',
        '.vcf file',
        '.vcf download',
        '.vcf generator',
        'online vCard creator',
        'vCard QR code',
        'vCard QR code generator',
        'vCard url generator',
        'vCard link generator',
        'vCard to QR code',
        'vCard share link',
        'NFC vCard',
        'digital business card generator',
        'create vCard',
        'NFC contact sharing',
        'WebNFC vCard',
        'vCard generator online',
        'vCard maker',
        'contact QR code',
        'download vCard',
        'vCard NFC writer',
        'WebNfc',
        'vCard NFC',
        'Download vCard QR code',
        'vCard QR code download',
        'generate vCard QR code',
        'shareable vCard link',
        'vCard contact QR code',
        'NFC business card',
        'digital vCard',
        'vCard contact sharing',
        'NFC contact card',
        'vCard NFC tag',
        'free digital business card',
        'business card QR code',
        'contact vCard',
        'vCard online tool'
    ],
    openGraph: {
        title: 'Free vCard Generator with QR Code & Shareable Link | WebNfc',
        description: 'Instantly create and share your digital business card. Generate a vCard, QR code, and a shareable link for free.',
        url: 'https://webnfc.org/vcard',
        siteName: 'WebNfc',
        images: '/og-vcard-tool.png',
        type: 'website',
    },
};

export default function VCardPage() {
    const softwareApplicationSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Free vCard Generator',
        applicationCategory: 'Utilities',
        operatingSystem: 'Web',
        description: 'A free online tool to create vCards (.vcf files), generate shareable links and QR codes, and write contact details to NFC tags.',
        featureList: [
            'Create vCard (.vcf) files',
            'Generate shareable URL for vCard',
            'Generate QR code for vCard',
            'Write vCard to NFC tag',
            'Download vCard as .vcf file',
            'Download QR code as PNG'
        ],
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'INR'
        },
        publisher: {
            '@type': 'Organization',
            name: 'WebNfc'
        }
    };

    return (
        <Fragment>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
            />
            <SecondaryNav />
            <div className={styles.container}>
                <header className={styles.hero}>
                    <h1 className={styles.title}>Free Digital Business Card & vCard Generator</h1>
                    <p className={styles.subtitle}>
                        Create your vCard, generate a shareable link and QR code, or write directly to an NFC tag. Instantly share your contact information with anyone.
                    </p>
                </header>
                <Suspense fallback={<div>Loading...</div>}>
                    <VCardClientTool />
                </Suspense>
            </div>
        </Fragment>
    );
}