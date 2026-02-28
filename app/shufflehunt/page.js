import ShuffleHuntGame from './shuffle-hunt';
import { Fragment } from 'react';

export const metadata = {
    title: 'NFC Shuffle Hunt Game | WebNfc',
    description: 'A fun memory and sequence game using NFC tags. Register cards, shuffle them, and find them in the correct order using your phone.',
    keywords: [
        'NFC game',
        'Shuffle Hunt',
        'NFC memory game',
        'Web NFC game',
        'browser NFC game',
        'NFC tag game',
        'interactive NFC',
        'WebNfc'
    ],
};

export default function ShuffleHuntPage() {
    const gameSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'NFC Shuffle Hunt',
        applicationCategory: 'Game',
        operatingSystem: 'Web',
        browserRequirements: 'Requires a browser with WebNFC support (e.g., Chrome on Android).',
        description: 'A browser-based game where players register NFC tags, shuffle them, and attempt to scan them in the correct sequence.',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(gameSchema) }}
            />
            <ShuffleHuntGame />
        </Fragment>
    );
}