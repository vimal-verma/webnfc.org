import { templates } from './templates';
import fs from 'fs';
import path from 'path';

function getAllPosts() {
    const postsDirectory = path.join(process.cwd(), 'app/blog/posts');
    const filenames = fs.readdirSync(postsDirectory);

    return filenames.map(filename => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContents);
    });
}

export default function sitemap() {
    const posts = getAllPosts();
    const baseUrl = 'https://webnfc.org';
    const lastModified = new Date().toISOString(); // Or a static date of last deployment

    const staticRoutes = [
        { url: `${baseUrl}/`, lastModified, changeFrequency: 'weekly', priority: 1.0 },
        { url: `${baseUrl}/upi`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/vcard`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/read-nfc`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/write-tag`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/nfc-tool`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/blog`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/about`, lastModified, changeFrequency: 'yearly', priority: 0.5 },
        { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'yearly', priority: 0.6 },
        { url: `${baseUrl}/terms`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    ];

    const blogPostRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date).toISOString(),
        changeFrequency: 'yearly',
        priority: 0.7,
    }));


    return [...staticRoutes, ...blogPostRoutes];
}