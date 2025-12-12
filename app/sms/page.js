import SmsToolClient from './sms-tool-client';
import styles from './sms.module.css';
import { Fragment } from 'react';

export const metadata = {
    title: 'Free SMS QR Code Generator & NFC Writer | WebNfc',
    description: 'Instantly generate an SMS QR code to send a message to a phone number. Our free tool also lets you write the SMS link directly to an NFC tag using your phone. No sign-up required.',
    keywords: [
        'SMS QR code generator',
        'SMS QR generator',
        'SMS QR code',
        'SMS QR with pre-filled message',
        'generate SMS QR code',
        'create SMS QR code',
        'SMS QR code maker',
        'SMS QR code creator',
        'SMS QR code online',
        'custom SMS QR code',
        'NFC SMS QR code',
        'Free SMS QR code generator',
        'free SMS QR code',
        'SMS link',
        'NFC SMS writer',
        'WebNFC SMS',
        'create SMS QR',
        'online SMS tool',
        'SMS NFC tag writer',
        'QR code for text message',
        'send SMS with QR code',
        'WebNfc',
        'SMS NFC'
    ],
};

export default function SmsPage() {
    const softwareApplicationSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'SMS QR Code Generator & NFC Writer',
        applicationCategory: 'Utilities',
        operatingSystem: 'Web',
        browserRequirements: 'Requires a browser with WebNFC support (e.g., Chrome on Android).',
        description: 'A free online tool to generate SMS QR codes to send messages and write them directly to NFC tags.',
        featureList: [
            'Generate SMS QR codes',
            'Write SMS links to NFC tags',
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
            <SmsToolClient />
        </Fragment>
    );
}