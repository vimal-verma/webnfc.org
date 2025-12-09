import { notFound } from 'next/navigation';
import Link from 'next/link';
import hljs from 'highlight.js';
import '../syntax.css';
import styles from './page.module.css';
import CodeBlock from '../CodeBlock';
import { sections, navItems } from '../nav-items';
import JsonLd from '../../components/JsonLd';

async function getSectionContent(slug) {
    try {
        const guide = await import(`../guides/${slug}.json`);
        return guide.default;
    } catch (error) {
        return null;
    }
}

export async function generateStaticParams() {
    return navItems.map(item => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const section = await getSectionContent(slug);
    const title = section?.title || sections[slug] || "Documentation";
    const description = section?.description || `Learn about ${title.toLowerCase()} with the Web NFC API on WebNfc.org.`;

    return {
        title: `${title} | WebNfc.org`,
        description: description,
        keywords: ["Web NFC", "NFC", "NFC tutorial", "WebNFC API", "NFC guide", title],
        openGraph: {
            title: `${title} | WebNfc.org`,
            description: description,
            url: `https://webnfc.org/documentation/${slug}`,
            siteName: 'WebNfc.org',
            type: 'article',
        },
    };
}

export default async function DocumentationContent({ params }) {
    // Await params to resolve the promise-like object in newer Next.js versions
    const { slug } = await params;
    const section = await getSectionContent(slug);

    const currentIndex = navItems.findIndex(item => item.slug === slug);

    const prevSection = currentIndex > 0 ? {
        slug: navItems[currentIndex - 1].slug,
        title: navItems[currentIndex - 1].title
    } : null;

    const nextSection = currentIndex < navItems.length - 1 ? {
        slug: navItems[currentIndex + 1].slug,
        title: navItems[currentIndex + 1].title
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

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        'headline': section.title,
        'description': section.description,
        'url': `https://webnfc.org/documentation/${slug}`,
        'author': {
            '@type': 'Organization',
            'name': 'WebNfc.org',
        },
        'publisher': {
            '@type': 'Organization',
            'name': 'WebNfc.org',
            'logo': {
                '@type': 'ImageObject',
                'url': 'https://webnfc.org/logo.png'
            }
        },
        'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': `https://webnfc.org/documentation/${slug}`
        }
    };

    return (
        <div className={styles.documentationContainer}>
            <article className={styles.guide}>
                <h1 className={styles.guideTitle}>{sections[slug]}</h1>
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
                <JsonLd data={jsonLd} />
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
            </article>
        </div>
    );
}