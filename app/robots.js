import { MetadataRoute } from 'next';

/**
 * @returns {MetadataRoute.Robots}
 */
export default function robots() {
    const baseUrl = 'https://webnfc.org';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/cart',
                    '/checkout',
                ],
            },
            // Allow Google's AI crawler
            {
                userAgent: 'Google-Extended',
                allow: '/',
            },
            // Allow OpenAI's crawler
            {
                userAgent: 'GPTBot',
                allow: '/',
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}