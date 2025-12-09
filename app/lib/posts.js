import fs from 'fs';
import path from 'path';

let postsCache;

export function getAllPosts() {
    if (postsCache) {
        return postsCache;
    }

    const postsDirectory = path.join(process.cwd(), 'app/blog/posts');
    const filenames = fs.readdirSync(postsDirectory);

    const posts = filenames.map(filename => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContents);
    }).sort((a, b) => new Date(b.date) - new Date(a.date));

    postsCache = posts;
    return posts;
}

export const getLatestPosts = (count = 3) => getAllPosts().slice(0, count);

export const getPostBySlug = (slug) => getAllPosts().find(post => post.slug === slug) || null;