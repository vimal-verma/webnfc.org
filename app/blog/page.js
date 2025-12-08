import Link from 'next/link';
import Image from 'next/image';
import blogPosts from '../blog.json';
import styles from './page.module.css';

export const metadata = {
  title: 'Blog | WebNfc',
  description: 'Read the latest insights, tips, and stories on modern networking, NFC technology, and business card design from the WebNfc team.',
  keywords: ['NFC business cards', 'digital business cards', 'custom NFC cards', 'smart business cards', 'NFC technology', 'networking', 'contactless cards', 'NFC card design', 'digital networking', 'NFC card printing', 'Customizable NFC cards', 'Eco-friendly business cards', 'NFC card solutions', 'Professional networking tools', 'Design Your NFC Card', 'NFC Card Features', 'NFC Card Pricing', 'Order NFC Cards Online', 'low cost NFC cards', 'NFC card reviews', 'NFC card blog', 'NFC card contact', 'NFC card FAQ', 'NFC Tool for web', 'NFC card templates', 'NFC card ideas'],
  openGraph: {
    title: 'Blog | WebNfc',
    description: 'Read the latest insights, tips, and stories on modern networking, NFC technology, and business card design from the WebNfc team.',
    url: 'https://webnfc.org/blog',
    siteName: 'WebNfc',
    images: '/og-logo.png',
    type: 'website',
  },
  icons: {
    icon: '/logo.png',
  },
};

export default function BlogPage() {
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'The WebNfc Blog',
    'description': 'Insights, tips, and stories on the future of networking.',
    'publisher': {
      '@type': 'Organization',
      'name': 'WebNfc',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://webnfc.org/logo.png'
      }
    },
    'blogPost': blogPosts.map(post => ({
      '@type': 'BlogPosting',
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': `https://webnfc.org/blog/${post.slug}`
      },
      'headline': post.title,
      'image': `https://webnfc.org${post.image}`,
      'datePublished': post.date,
      'author': {
        '@type': 'Person',
        'name': post.author
      },
      'description': post.excerpt
    }))
  };

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <h1 className={styles.title}>The WebNfc Blog</h1>
        <p className={styles.subtitle}>
          Insights, tips, and stories on the future of networking.
        </p>
      </header>

      <div className={styles.postsGrid}>
        {blogPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className={styles.postCard}>
            <div className={styles.postImageWrapper}>
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.postImage}
              />
            </div>
            <div className={styles.postContent}>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p className={styles.postExcerpt}>{post.excerpt}</p>
              <div className={styles.postMeta}>
                <span>By {post.author}</span>
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
    </div>
  );
}