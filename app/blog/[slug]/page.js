import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'app', 'blog', 'posts');

function getAllPosts() {
  const filenames = fs.readdirSync(postsDirectory);
  const posts = filenames.map(filename => {
    if (path.extname(filename) === '.json') {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContents);
    }
  }).filter(Boolean); // Filter out any undefined entries if non-json files exist
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function getPost(slug) {
  const filePath = path.join(postsDirectory, `${slug}.json`);
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    // If the file doesn't exist by slug name, search all posts.
    // This is a fallback for robustness.
    const allPosts = getAllPosts();
    return allPosts.find((p) => p.slug === slug) || null;
  }
}

export function generateStaticParams() {
  const blogPosts = getAllPosts();
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

  // For prev/next navigation, we still need the full sorted list.
  // This is a trade-off for having that feature.
  const sortedPosts = getAllPosts();
  const postIndex = sortedPosts.findIndex((p) => p.slug === slug);
  const prevPost = postIndex > 0 ? sortedPosts[postIndex - 1] : null;
  const nextPost = postIndex < sortedPosts.length - 1 ? sortedPosts[postIndex + 1] : null;

  if (!post) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': post.title,
    'description': post.description,
    'image': `https://webnfc.org${post.image}`,
    'author': {
      '@type': 'Person',
      'name': post.author,
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'WebNfc',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://webnfc.org/logo.png'
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