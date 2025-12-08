import { notFound } from 'next/navigation';
import hljs from 'highlight.js';
import '../syntax.css';
import styles from '../page.module.css';

const sections = {
    'introduction': "Introduction",
    'browser-support': "Supported Browsers & Devices",
    'nfc-use-cases': "NFC Use Cases",
    'read-nfc': "How to Read an NFC Tag",
    'write-nfc': "How to Write to an NFC Tag",
    'lock-nfc': "How to Lock an NFC Tag (Make Read-Only)",
    'clone-and-format': "What About Cloning, and Formatting?",
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

    if (!section) {
        notFound();
    }

    // Apply syntax highlighting to code blocks on the server
    const highlightedContent = section.content.replace(
        /<pre><code class="language-js">([\s\S]*?)<\/code><\/pre>/g,
        (match, code) => {
            const highlightedCode = hljs.highlight(code, { language: 'javascript' }).value;
            return `<pre><code class="language-js hljs">${highlightedCode}</code></pre>`;
        }
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
                <div
                    className={styles.guideContent}
                    dangerouslySetInnerHTML={{ __html: highlightedContent }}
                />
            </article>
        </>
    );
}