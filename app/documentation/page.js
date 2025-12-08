
import './syntax.css';

export { generateMetadata } from './[slug]/page';
import DocumentationContent from './[slug]/page';

export default function DocumentationPage() {
    // This page will render the content for the 'introduction' slug by default.
    return <DocumentationContent params={{ slug: 'introduction' }} />;
}