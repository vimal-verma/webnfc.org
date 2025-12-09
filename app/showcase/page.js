'use client';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import projects from './projects.json';

export default function ShowCase() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Web NFC Project Showcase</h1>
            <p className={styles.subtitle}>
                Explore innovative projects built with Web NFC technology or submit your own!
            </p>

            <section className={styles.submissionSection}>
                <h2>Have a Project to Share?</h2>
                <p>
                    We are always looking for new and exciting projects to feature. If you&apos;ve built something with Web NFC, we&apos;d love to see it!
                </p>
                <p>
                    To add your project, please submit a pull request by editing the{' '}
                    <Link href="https://github.com/vimal-verma/webnfc.org/blob/main/app/showcase/projects.json" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                        projects.json
                    </Link>{' '}
                    file on our GitHub repository.
                </p>
            </section>

            <section className={styles.projectsGridSection}>
                <h2>Community Projects</h2>
                <div className={styles.projectsGrid}>
                    {projects.length === 0 ? (
                        <p>No projects submitted yet. Be the first to add one!</p>
                    ) : (
                        projects.map((project) => (
                            <div key={project.id} className={styles.projectCard}>
                                {project.imageUrl && (
                                    <div className={styles.projectImageWrapper}>
                                        <Image
                                            src={project.imageUrl}
                                            alt={project.name}
                                            fill={true}
                                            className={styles.projectImage}
                                        />
                                    </div>
                                )}
                                <div className={styles.projectContent}>
                                    <h3>{project.name}</h3>
                                    <p>{project.description}</p>
                                    <Link href={project.url} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                                        View Project
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}