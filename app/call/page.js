import CallToolClient from './call-tool-client';
import { Fragment } from 'react';
import SecondaryNav from '../components/SecondaryNav';

export const metadata = {
    title: 'Free Call QR Code Generator & NFC Writer | WebNfc',
    description: 'Instantly generate a Call QR code to dial a number. Our free tool also lets you write the Call link directly to an NFC tag using your phone. No sign-up required.',
    keywords: [
        'Call QR code generator',
        'Call QR generator',
        'Call QR code',
        'generate Call QR code',
        'create Call QR code',
        'Call QR code maker',
        'Call QR code creator',
        'Call QR code online',
        'custom Call QR code',
        'colored Call QR code',
        'Call QR code with logo',
        'Call QR code designer',
        'NFC Call QR code',
        'Free Call QR code generator',
        'free Call QR code',
        'Call payment link',
        'NFC Call writer',
        'WebNFC Call',
        'create Call QR',
        'Call QR code for shops',
        'online Call tool',
        'Call NFC tag writer',
        'Call vCard',
        'Call contact sharing',
        'WebNfc',
        'Call NFC'
    ],
};

export default function CallPage() {
    const softwareApplicationSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Call QR Code Generator & NFC Writer',
        applicationCategory: 'Utilities',
        operatingSystem: 'Web',
        browserRequirements: 'Requires a browser with WebNFC support (e.g., Chrome on Android).',
        description: 'A free online tool to generate Call QR codes to dial numbers and write them directly to NFC tags.',
        featureList: [
            'Generate Call QR codes',
            'Write Call links to NFC tags',
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
            <CallToolClient />
        </Fragment>
    );
}