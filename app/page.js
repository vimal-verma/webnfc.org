import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import posts from './blog.json';

export const metadata = {
  title: "WebNfc | Learn, Build, and Use Web NFC Technology",
  description: "Your ultimate resource for Web NFC. Explore our free online tools to read and write NFC tags, generate vCards, and learn everything about Near Field Communication.",
  keywords: ['Web NFC', 'NFC Tool', 'Learn NFC', 'NFC Reader', 'NFC Writer', 'NFC Guide', 'Near Field Communication', 'NFC business card', 'vCard Generator', 'UPI QR Generator'],
  openGraph: {
    title: 'WebNfc | Learn, Build, and Use Web NFC Technology',
    description: 'The ultimate resource for learning and using Web NFC technology directly in your browser.',
    url: 'https://webnfc.org',
    siteName: 'WebNfc',
    images: '/og-image.png', // A dedicated Open Graph image (1200x630px) is recommended
    type: 'website',
  },
};

const faqs = [
  {
    question: 'What is Web NFC?',
    answer: 'Web NFC is a browser API that allows web applications to read from and write to NFC (Near Field Communication) tags. This means you can interact with physical NFC tags directly from a website, without needing a native mobile app.',
  },
  {
    question: 'Which browsers support Web NFC?',
    answer: 'Currently, Web NFC is primarily supported by Chrome on Android (version 89 or newer). It is not available on iOS (iPhone/iPad) or desktop browsers like Safari, Firefox, or Edge.',
  },
  {
    question: 'What can I do with your NFC tools?',
    answer: 'Our free tools allow you to read the contents of any standard NFC tag, write data like text or URLs, create and write digital contact cards (vCards), and generate UPI payment QR codes and NFC tags.',
  },
  {
    question: 'Is it free to use your tools?',
    answer: 'Yes, all our Web NFC tools—the reader, writer, vCard generator, and UPI QR generator—are completely free to use directly in your browser. No sign-up is required.',
  },
];

export default function Home() {

  const latestPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'WebNfc',
    'url': 'https://webnfc.org',
    'logo': 'https://webnfc.org/logo.png',
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'customer service',
      'email': 'support@webnfc.org'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  return (
    <div className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Explore the World of Web NFC</h1>
          <p className={styles.subtitle}>
            Your ultimate resource for learning, experimenting, and building with Near Field Communication technology, directly in your browser.
          </p>
          <div className={styles.ctaContainer}>
            <Link href="/nfc-tool" className={styles.primary}>
              Explore NFC Tools
            </Link>
            <Link href="/blog" className={styles.secondary}>
              Read The Blog
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.whyChooseUsSection}>
        <h2 className={styles.sectionTitle}>Powerful NFC Tools, Free for Everyone</h2>
        <p className={styles.sectionSubtitle}>Unlock the potential of NFC with our suite of browser-based utilities.</p>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📖</div>
            <h3>NFC Reader</h3>
            <p>Instantly scan and inspect the data on any NFC tag, including vCards, URLs, and text records, right from your browser.</p>
            <Link href="/read-nfc" className={styles.secondary}>Read a Tag</Link>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>✍️</div>
            <h3>NFC Writer</h3>
            <p>Program your NFC tags with custom data. Write URLs, plain text, or create a digital contact card with a few simple clicks.</p>
            <Link href="/write-nfc" className={styles.secondary}>Write a Tag</Link>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📇</div>
            <h3>vCard Generator</h3>
            <p>Create a professional digital business card (.vcf), generate a shareable link, and download a QR code for free.</p>
            <Link href="/vcard" className={styles.secondary}>Create a vCard</Link>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💳</div>
            <h3>UPI QR Generator</h3>
            <p>Generate a UPI QR code for easy payments and even write the payment link directly to an NFC tag for tap-to-pay functionality.</p>
            <Link href="/upi" className={styles.secondary}>Create UPI QR</Link>
          </div>
        </div>
      </section>

      <section className={styles.whyChooseUsSection}>
        <h2 className={styles.sectionTitle}>What is Web NFC?</h2>
        <p className={styles.sectionSubtitle}>Bridging the gap between the web and the physical world.</p>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌐</div>
            <h3>Browser-Native</h3>
            <p>Web NFC allows websites to communicate directly with NFC tags, eliminating the need for a separate mobile application.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>👆</div>
            <h3>Simple Interactions</h3>
            <p>With a simple tap, users can read information from a tag or write new data to it, creating seamless user experiences.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}></div>
            <h3>Endless Possibilities</h3>
            <p>From digital business cards and smart posters to inventory management, Web NFC opens up a world of interactive applications.</p>
          </div>
        </div>
      </section>

      <section className={styles.latestPostsSection}>
        <h2 className={styles.sectionTitle}>Latest from the Blog</h2>
        <p className={styles.sectionSubtitle}>
          Stay updated with the latest in NFC technology and networking tips.
        </p>
        <div className={styles.postsGrid}>
          {latestPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className={styles.postCard}>
              <div className={styles.postImage}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.postContent}>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.postExcerpt}>{post.excerpt}</p>
                <div className={styles.postMeta}>
                  <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/blog" className={styles.secondary}>
          View All Posts
        </Link>
      </section>

      <section className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <details key={index} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>{faq.question}</summary>
              <p className={styles.faqAnswer}>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
