'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function AboutPage() {
    const teamMembers = [
        {
            name: 'Vimal Kumar',
            title: 'Founder & CEO',
            image: '/logo.png',
        },
        {
            name: 'Abhishek Kumar',
            title: 'Head of Technology',
            image: '/logo.png',
        },
        {
            name: 'Chintu Yadav',
            title: 'Sales & Marketing Lead',
            image: '/logo.png',
        },
    ];
    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <h1 className={styles.title}>About NFCBuzz</h1>
                <p className={styles.subtitle}>
                    We&apos;re on a mission to make networking smarter, faster, and more memorable.
                </p>
            </section>

            <section className={styles.storySection}>
                <div className={styles.storyContent}>
                    <h2>Our Story</h2>
                    <p>
                        NFCBuzz was born from a simple idea: in an increasingly digital world, our physical interactions should be just as seamless. We grew tired of outdated paper business cards that get lost or thrown away. We envisioned a future where sharing your identity is as easy as a simple tap.
                    </p>
                    <p>
                        Today, we provide high-quality, customizable NFC-powered cards that help professionals, creatives, and businesses make an instant and lasting impression. Our powerful online designer and commitment to quality ensure that your card is not just a tool, but a statement.
                    </p>
                </div>
                <div className={styles.storyImage}>
                    <Image
                        src="/logo.png"
                        alt="Team working on NFC cards"
                        width={500}
                        height={400}
                        className={styles.image}
                    />
                </div>
            </section>

            <section className={styles.teamSection}>
                <h2 className={styles.sectionTitle}>Meet the Team</h2>
                <p className={styles.sectionSubtitle}>The minds behind the magic.</p>
                <div className={styles.teamGrid}>
                    {teamMembers.map((member, index) => (
                        <div key={index} className={styles.teamMemberCard}>
                            <div className={styles.teamMemberImage}>
                                <Image
                                    src={member.image}
                                    alt={`Portrait of ${member.name}`}
                                    width={150}
                                    height={150}
                                    className={styles.image}
                                />
                            </div>
                            <h3 className={styles.teamMemberName}>{member.name}</h3>
                            <p className={styles.teamMemberTitle}>{member.title}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.locationSection}>
                <h2 className={styles.sectionTitle}>Our Office</h2>
                <div className={styles.locationGrid}>
                    <div className={styles.addressInfo}>
                        <h3>Visit Us</h3>
                        <p>Come say hello at our headquarters.</p>
                        <address>
                            ward no-6, laraua, Makhdumpur<br />
                            Jehanabad, Bihar, 804422<br />
                            India
                        </address>
                    </div>
                </div>
                <div className={styles.locationMap}>
                    <div></div>
                </div>
            </section>

            <section className={styles.ctaSection}>
                <h2>Ready to Make an Impression?</h2>
                <p>Design your custom NFC card today and step into the future of networking.</p>
                <Link href="/design" className={styles.ctaButton}>
                    Start Designing
                </Link>
            </section>
        </div>
    );
}