import LocationToolClient from './location-tool-client';
import { Fragment } from 'react';
import SecondaryNav from '../components/SecondaryNav';

export const metadata = {
    title: 'Free Location & DigiPin QR Code Generator | WebNfc',
    description: 'Instantly generate a Location QR code (Geo URI) or a DigiPin QR code to share coordinates. Our free tool also lets you write the location link directly to an NFC tag using your phone. No sign-up required.',
    keywords: [
        'Location QR code generator',
        'Geo QR generator',
        'Location QR code',
        'Google Maps QR code',
        'DigiPin QR code',
        'India digital address',
        'generate Location QR code',
        'create Location QR code',
        'Location QR code maker',
        'Location QR code creator',
        'Location QR code online',
        'custom Location QR code',
        'NFC Location QR code',
        'Free Location QR code generator',
        'free Location QR code',
        'Geo link',
        'NFC Location writer',
        'WebNFC Location',
        'create Location QR',
        'online Location tool',
        'Location NFC tag writer',
        'QR code for coordinates',
        'share location with QR code',
        'WebNfc',
        'Location NFC'
    ],
};

export default function LocationPage() {
    const softwareApplicationSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Location & DigiPin QR Code Generator & NFC Writer',
        applicationCategory: 'Utilities',
        operatingSystem: 'Web',
        browserRequirements: 'Requires a browser with WebNFC support (e.g., Chrome on Android).',
        description: 'A free online tool to generate Location QR codes (Geo URIs) and DigiPin QR Codes, and write them directly to NFC tags.',
        featureList: [
            'Generate Location QR codes',
            'Write Geo links to NFC tags',
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
            <LocationToolClient />
        </Fragment>
    );
}