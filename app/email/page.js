import EmailToolClient from './email-tool-client';
import styles from './email.module.css';
import { Fragment } from 'react';
import SecondaryNav from '../components/SecondaryNav';

export const metadata = {
    title: 'Free Email QR Code Generator & NFC Writer | WebNfc',
    description: 'Instantly generate an Email QR code to send a pre-filled email. Our free tool also lets you write the Email link directly to an NFC tag using your phone. No sign-up required.',
    keywords: [
        'Email QR code generator',
        'Email QR generator',
        'Email QR code',
        'Email QR with subject and body',
        'generate Email QR code',
        'create Email QR code',
        'Email QR code maker',
        'Email QR code creator',
        'Email QR code online',
        'custom Email QR code',
        'NFC Email QR code',
        'Free Email QR code generator',
        'free Email QR code',
        'Email link',
        'NFC Email writer',
        'WebNFC Email',
        'create Email QR',
        'online Email tool',
        'Email NFC tag writer',
        'QR code for email',
        'send Email with QR code',
        'WebNfc',
        'Email NFC'
    ],
};

export default function EmailPage() {
    const softwareApplicationSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Email QR Code Generator & NFC Writer',
        applicationCategory: 'Utilities',
        operatingSystem: 'Web',
        browserRequirements: 'Requires a browser with WebNFC support (e.g., Chrome on Android).',
        description: 'A free online tool to generate Email QR codes to send pre-filled emails and write them directly to NFC tags.',
        featureList: [
            'Generate Email QR codes',
            'Write Email links to NFC tags',
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
            <EmailToolClient />
        </Fragment>
    );
}