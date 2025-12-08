This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

## Contributing

Contributions are welcome! We're excited to see what you can add. Please follow these guidelines to contribute to the project.

### Adding a Blog Post

To add a new blog post, follow these steps:

1.  Create a new JSON file in the `app/blog/posts/` directory. The filename will be used as the URL slug for the post (e.g., `my-new-post.json`).
2.  The JSON file should have the following structure:

    ```json
    {
      "slug": "my-new-post",
      "title": "My New Blog Post",
      "author": "Your Name",
      "date": "YYYY-MM-DD",
      "excerpt": "A short summary of the blog post.",
      "description": "A longer description for SEO purposes.",
      "tags": ["tag1", "tag2"],
      "image": "/previews/blog/my-new-post.png",
      "content": "<p>Your content here, written in HTML.</p>"
    }
    ```

### Adding a Documentation Page

To add a new documentation page:

1.  Create a new JSON file in the `app/documentation/guides/` directory (e.g., `new-feature.json`).
2.  The content of the JSON file should be an object containing the guide's content in HTML format.
3.  Open `app/documentation/[slug]/page.js` and add a new entry to the `sections` object. The key should be the filename (without `.json`) and the value should be the title of the documentation page.

    ```javascript
    const sections = {
      introduction: 'Introduction',
      // ... other sections
      'new-feature': 'New Amazing Feature',
    }
    ```

### General Contribution Guidelines

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with a clear message.
4.  Push your branch to your fork.
5.  Create a pull request to the main repository.
