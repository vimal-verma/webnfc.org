export const navItems = [
    { slug: 'introduction', title: 'Introduction' },
    { slug: 'browser-support', title: 'Browser Support' },
    { slug: 'read-nfc', title: 'How to Read an NFC Tag' },
    { slug: 'write-text-record', title: 'How to Write a Text Record' },
    { slug: 'write-url-record', title: 'How to Write a URL Record' },
    { slug: 'write-vcard-record', title: 'How to Write a vCard' },
    { slug: 'write-upi-record', title: 'How to Write a UPI Link' },
    { slug: 'lock-nfc', title: 'How to Lock an NFC Tag' },
    { slug: 'clone-and-format', title: 'Cloning and Formatting' },
    { slug: 'react-hook-web-nfc', title: 'Building a Web NFC React Hook' },
    { slug: 'smart-posters', title: 'Smart Posters with Web NFC' },
    { slug: 'nfc-security-best-practices', title: 'NFC Security Best Practices' },
    { slug: 'nfc-tag-types', title: 'NFC Tag Types Explained' },
    { slug: 'nfc-vs-rfid', title: "NFC vs. RFID: What's the Difference?" },
    { slug: 'troubleshooting', title: 'Troubleshooting' },
    { slug: 'history-of-nfc', title: 'A Brief History of NFC' },
    { slug: 'nfc-use-cases', title: 'NFC Use Cases' },
];

export const sections = Object.fromEntries(navItems.map(item => [item.slug, item.title]));