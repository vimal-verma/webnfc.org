import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { getAllPosts } from '../lib/posts';
import JsonLd from '../components/JsonLd';

export const metadata = {
  title: 'Blog | WebNfc',
  description: 'Read the latest insights, tips, and stories on modern networking, NFC technology, and business card design from the WebNfc team.',
  keywords: ['NFC blog', 'WebNFC articles', 'NFC technology news', 'Business card design tips', 'Digital networking strategies', 'NFC use cases', 'WebNfc updates', 'NFC trends', 'vCard tips', 'QR code insights'],
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
  const blogPosts = getAllPosts();
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
          <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.postCard}>
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
      <JsonLd data={blogSchema} />
    </div>
  );
}