import EventToolClient from './event-tool-client';
import { Fragment } from 'react';
import SecondaryNav from '../components/SecondaryNav';

export const metadata = {
    title: 'Free Event QR Code Generator & NFC Writer | WebNfc',
    description: 'Instantly generate an Event QR code (vEvent) to share calendar details. Our free tool also lets you write the event details directly to an NFC tag using your phone. No sign-up required.',
    keywords: [
        'Event QR code generator',
        'Calendar QR generator',
        'vEvent QR code',
        'iCal QR code',
        'generate Event QR code',
        'create Event QR code',
        'Event QR code maker',
        'Event QR code creator',
        'Event QR code online',
        'custom Event QR code',
        'NFC Event QR code',
        'Free Event QR code generator',
        'free Event QR code',
        'Calendar link',
        'NFC Event writer',
        'WebNFC Event',
        'create Event QR',
        'online Event tool',
        'Event NFC tag writer',
        'QR code for calendar event',
        'share event with QR code',
        'WebNfc',
        'Event NFC'
    ],
};

export default function EventPage() {
    const softwareApplicationSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Event QR Code Generator & NFC Writer',
        applicationCategory: 'Utilities',
        operatingSystem: 'Web',
        browserRequirements: 'Requires a browser with WebNFC support (e.g., Chrome on Android).',
        description: 'A free online tool to generate Event QR codes (vEvent) and write them directly to NFC tags.',
        featureList: [
            'Generate Event QR codes',
            'Write vEvent data to NFC tags',
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
            <EventToolClient />
        </Fragment>
    );
}