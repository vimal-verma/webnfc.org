import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import blogPosts from '../../blog.json';
import styles from './page.module.css';

function getPost(slug) {
  return blogPosts.find((p) => p.slug === slug);
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return { title: post.title, description: post.description, keywords: post.keywords };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);

  const postIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

  if (!post) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': post.title,
    'description': post.description,
    'image': `https://nfcbuzz.com${post.image}`,
    'author': {
      '@type': 'Person',
      'name': post.author,
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'NFCBuzz',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://nfcbuzz.com/logo.png'
      }
    },
    'datePublished': post.date,
  };

  return (
    <div className={styles.container}>
      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <span>By {post.author}</span>
            <span>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </span>
          </div>
        </header>
        <div className={styles.featuredImageWrapper}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.featuredImage}
          />
        </div>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content }} />
        {/* Add JSON-LD to the head */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {post.tags && post.tags.length > 0 && (
          <div className={styles.tagsSection}>
            <strong>Tags:</strong>
            <div className={styles.tags}>
              {post.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
        )}
        <footer className={styles.postNavigation}>
          {prevPost && (
            <Link href={`/blog/${prevPost.slug}`} className={styles.prevLink}>
              &larr; Previous Post
              <span className={styles.navTitle}>{prevPost.title}</span>
            </Link>
          )}
          {nextPost && (
            <Link href={`/blog/${nextPost.slug}`} className={styles.nextLink}>
              Next Post &rarr;
              <span className={styles.navTitle}>{nextPost.title}</span>
            </Link>
          )}
        </footer>
      </article>
    </div>
  );
}