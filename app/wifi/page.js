import WIFIToolClient from './wifi-tool-client';
import styles from './wifi.module.css';
import { Fragment } from 'react';
import SecondaryNav from '../components/SecondaryNav';

export const metadata = {
    title: 'Free WiFi QR Code Generator & NFC Writer | WebNfc',
    description: 'Instantly generate a WiFi QR code to connect to a network. Our free tool also lets you write the WiFi connection details directly to an NFC tag using your phone. No sign-up required.',
    keywords: [
        'WiFi QR code generator',
        'WiFi QR generator',
        'WiFi QR code',
        'generate WiFi QR code',
        'create WiFi QR code',
        'WiFi QR code maker',
        'connect to WiFi with QR code',
        'share WiFi password QR',
        'WiFi network QR code',
        'NFC WiFi setup',
        'custom WiFi QR code',
        'NFC WiFi QR code',
        'Free WiFi QR code generator',
        'free WiFi QR code',
        'WiFi connection link',
        'NFC WiFi writer',
        'WebNFC WiFi',
        'create WiFi QR',
        'online WiFi tool',
        'WiFi NFC tag writer',
        'WebNfc',
        'WiFi NFC',
        'WiFi NFC tag writer',
        'NFC WiFi writer',
        'WiFi to NFC tag'
    ],
};

export default function WIFIPage() {
    const softwareApplicationSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'WiFi QR Code Generator & NFC Writer',
        applicationCategory: 'Utilities',
        operatingSystem: 'Web',
        browserRequirements: 'Requires a browser with WebNFC support (e.g., Chrome on Android).',
        description: 'A free online tool to generate WiFi QR codes for network connections and write them directly to NFC tags.',
        featureList: [
            'Generate WiFi QR codes',
            'Write WiFi connection data to NFC tags',
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
            <WIFIToolClient />
        </Fragment>
    );
}