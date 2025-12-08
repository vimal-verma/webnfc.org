import { notFound } from 'next/navigation';
import guide from '../web-nfc-api-guide.json';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import '../syntax.css';
import styles from '../page.module.css';

const sections = {
    'introduction': "Introduction",
    'browser-support': "Supported Browsers & Devices",
    'read-nfc': "How to Read an NFC Tag",
    'write-nfc': "How to Write to an NFC Tag",
    'lock-nfc': "How to Lock an NFC Tag (Make Read-Only)",
    'clone-and-format': "What About Cloning, and Formatting?",
};

function getSectionContent(slug) {
    const title = sections[slug];
    if (!title) return null;

    // Find the h3 tag by its title, which is more reliable than the slug-derived ID.
    // The regex now looks for an h3 tag with any ID, captures the title, and then the content until the next h3 or the end of the string.
    const contentRegex = new RegExp(`<h3 id="[^"]*">${title}</h3>([\\s\\S]*?)(?=<h3|$)`, 'i');
    const match = guide.content.match(contentRegex);

    // Reconstruct the content with its original h3 tag to preserve the ID for linking.
    return match ? `<h3 id="${slug}">${title}</h3>${match[1]}` : null;
}

export async function generateStaticParams() {
    return Object.keys(sections).map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
    const title = sections[params.slug] || "Documentation";
    return {
        title: `${title} | Documentation`,
        description: `Learn ${title.toLowerCase()} with the Web NFC API.`,
    };
}

export default async function DocumentationContent({ params }) {
    // Await params to resolve the promise-like object in newer Next.js versions
    const { slug } = await params;
    const content = getSectionContent(slug);

    if (!content) {
        notFound();
    }

    // Apply syntax highlighting to code blocks on the server
    const highlightedContent = content.replace(
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