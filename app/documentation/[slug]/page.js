import { notFound } from 'next/navigation';
import Link from 'next/link';
import hljs from 'highlight.js';
import '../syntax.css';
import styles from './page.module.css';
import CodeBlock from '../CodeBlock';

const sections = {
    'introduction': "Introduction",
    'browser-support': "Supported Browsers & Devices",
    'read-nfc': "How to Read an NFC Tag",
    'write-text-record': "How to Write a Text Record",
    'write-url-record': "How to Write a URL Record",
    'write-vcard-record': "How to Write a vCard (Contact Card)",
    'write-upi-record': "How to Write a UPI Link",
    'lock-nfc': "How to Lock an NFC Tag (Make Read-Only)",
    'clone-and-format': "What About Cloning, and Formatting?",
    'nfc-security-best-practices': "NFC Security Best Practices",
    'nfc-tag-types': "NFC Tag Types Explained",
    'nfc-vs-rfid': "NFC vs. RFID: What's the Difference?",
    'troubleshooting': "Troubleshooting Common Web NFC Issues",
    'history-of-nfc': "A Brief History of NFC",
    'nfc-use-cases': "NFC Use Cases",
};

async function getSectionContent(slug) {
    try {
        const guide = await import(`../guides/${slug}.json`);
        return guide.default;
    } catch (error) {
        return null;
    }
}

export async function generateStaticParams() {
    return Object.keys(sections).map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
    const title = sections[params] || "Documentation";
    return {
        title: `${title} | Documentation`,
        description: `Learn ${title.toLowerCase()} with the Web NFC API.`,
    };
}

export default async function DocumentationContent({ params }) {
    // Await params to resolve the promise-like object in newer Next.js versions
    const { slug } = await params;
    const section = await getSectionContent(slug);

    const sectionSlugs = Object.keys(sections);
    const currentIndex = sectionSlugs.indexOf(slug);

    const prevSection = currentIndex > 0 ? {
        slug: sectionSlugs[currentIndex - 1],
        title: sections[sectionSlugs[currentIndex - 1]]
    } : null;

    const nextSection = currentIndex < sectionSlugs.length - 1 ? {
        slug: sectionSlugs[currentIndex + 1],
        title: sections[sectionSlugs[currentIndex + 1]]
    } : null;

    if (!section) {
        notFound();
    }

    // Apply syntax highlighting to code blocks on the server
    const highlightedContent = section.content.replace(
        /<pre><code class="language-js">([\s\S]*?)<\/code><\/pre>/g,
        (match, code) => {
            const highlightedCode = hljs.highlight(code, { language: 'javascript' }).value;
            return `<pre><code class="language-js hljs">${highlightedCode}</code></pre>`;
        },
    );

    return (
        <>
            {slug === 'introduction' && (
                <header className={styles.hero}>
                    <h1 className={styles.title}>Documentation & Guides</h1>
                    <p className={styles.subtitle}>
                        Your official resource for learning how to use the Web NFC API and our powerful online tools.
                    </p>
                </header>
            )}
            <article className={styles.guide}>
                {slug !== 'introduction' && (
                    <h1 className={styles.guideTitle}>{sections[slug]}</h1>
                )}
                <CodeBlock>
                    <div
                        className={styles.guideContent}
                        dangerouslySetInnerHTML={{ __html: highlightedContent }}
                    />
                </CodeBlock>
                <a
                    href={`https://github.com/vimal-verma/webnfc.org/edit/main/app/documentation/guides/${slug}.json`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.editLink}>✏️ Edit this page on GitHub</a>
            </article>

            <div className={styles.pagination}>
                {prevSection && (
                    <Link href={`/documentation/${prevSection.slug}`} className={styles.prevLink}>
                        &larr; {prevSection.title}
                    </Link>
                )}
                {nextSection && (
                    <Link href={`/documentation/${nextSection.slug}`} className={styles.nextLink}>
                        {nextSection.title} &rarr;
                    </Link>
                )}
            </div>
        </>
    );
}