import guide from './web-nfc-api-guide.json';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import styles from './page.module.css';
import './syntax.css';

export { generateMetadata } from './[slug]/page';
import DocumentationContent from './[slug]/page';

export default function DocumentationPage() {
    // This page will render the content for the 'introduction' slug by default.
    return <DocumentationContent params={{ slug: 'introduction' }} />;
}