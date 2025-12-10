import { Suspense } from 'react';
import ShowCaseClient from './showcase-client';

export const metadata = {
    title: 'Web NFC Project Showcase | Examples & Demos | WebNfc',
    description: 'Explore a curated list of innovative projects, websites, and applications built with the Web NFC API. See real-world examples and get inspired to build your own.',
    keywords: [
        'Web NFC showcase',
        'WebNFC projects',
        'Web NFC examples',
        'NFC demos',
        'Web NFC applications',
        'community projects',
        'NFC showcase',
    ],
};

export default function ShowCasePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ShowCaseClient />
        </Suspense>
    );
}