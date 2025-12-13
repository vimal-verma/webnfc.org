import UpiToolClient from './upi-tool-client';
import styles from './upi.module.css';
import { Fragment } from 'react';
import SecondaryNav from '../components/SecondaryNav';

export const metadata = {
    title: 'Free UPI QR Code Generator & NFC Writer | WebNfc',
    description: 'Instantly generate a UPI QR code for payments. Our free tool also lets you write the UPI payment link directly to an NFC tag using your phone. No sign-up required.',
    keywords: [
        'UPI QR code generator',
        'UPI QR generator',
        'UPI QR code',
        'UPI QR with fixed amount',
        'generate UPI QR code',
        'create UPI QR code',
        'UPI QR code maker',
        'UPI QR code creator',
        'UPI QR code online',
        'custom UPI QR code',
        'colored UPI QR code',
        'UPI QR code with logo',
        'UPI QR code designer',
        'UPI QR Fixed Amount',
        'Fixed Amount UPI QR',
        'UPI QR code fixed amount',
        'UPI QR code generator with fixed amount',
        'NFC UPI QR code',
        'Free UPI QR code generator',
        'free UPI QR code',
        'UPI payment link',
        'NFC UPI writer',
        'WebNFC UPI',
        'create UPI QR',
        'NFC payment tag',
        'UPI QR code for shops',
        'online UPI tool',
        'UPI NFC tag writer',
        'UPI vCard',
        'UPI contact sharing',
        'WebNfc',
        'UPI NFC',
        'UPI NFC tag writer',
        'NFC UPI writer',
        'UPI to NFC tag'
    ],
};

export default function UpiPage() {
    const softwareApplicationSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'UPI QR Code Generator & NFC Writer',
        applicationCategory: 'Utilities',
        operatingSystem: 'Web',
        browserRequirements: 'Requires a browser with WebNFC support (e.g., Chrome on Android).',
        description: 'A free online tool to generate UPI QR codes for payments and write them directly to NFC tags.',
        featureList: [
            'Generate UPI QR codes',
            'Write UPI links to NFC tags',
            'Customize QR code colors',
            'Add a logo to the QR code'
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
            <UpiToolClient />
        </Fragment>
    );
}