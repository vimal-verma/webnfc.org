import UrlToolClient from './url-tool-client';
import { Fragment } from 'react';
import SecondaryNav from '../components/SecondaryNav';

export const metadata = {
    title: 'Free URL QR Code Generator & NFC Writer | WebNfc',
    description: 'Instantly generate a URL QR code to open a website. Our free tool also lets you write the URL link directly to an NFC tag using your phone. No sign-up required.',
    keywords: [
        'URL QR code generator',
        'URL QR generator',
        'URL QR code',
        'website QR code',
        'generate URL QR code',
        'create URL QR code',
        'URL QR code maker',
        'URL QR code creator',
        'URL QR code online',
        'custom URL QR code',
        'NFC URL QR code',
        'Free URL QR code generator',
        'free URL QR code',
        'URL link',
        'NFC URL writer',
        'WebNFC URL',
        'create URL QR',
        'online URL tool',
        'URL NFC tag writer',
        'QR code for website',
        'open website with QR code',
        'WebNfc',
        'URL NFC',
        'URL NFC tag writer',
        'NFC URL writer',
        'URL to NFC tag'
    ],
};

export default function UrlPage() {
    const softwareApplicationSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'URL QR Code Generator & NFC Writer',
        applicationCategory: 'Utilities',
        operatingSystem: 'Web',
        browserRequirements: 'Requires a browser with WebNFC support (e.g., Chrome on Android).',
        description: 'A free online tool to generate URL QR codes to open websites and write them directly to NFC tags.',
        featureList: [
            'Generate URL QR codes',
            'Write URL links to NFC tags',
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
            <UrlToolClient />
        </Fragment>
    );
}