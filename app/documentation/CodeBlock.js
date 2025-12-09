'use client';

import { useEffect, useRef } from 'react';
import styles from './documentation.module.css';

export default function CodeBlock({ children }) {
    const contentRef = useRef(null);

    useEffect(() => {
        if (!contentRef.current) return;

        const codeBlocks = contentRef.current.querySelectorAll('pre > code.language-js');

        codeBlocks.forEach(codeBlock => {
            const preElement = codeBlock.parentElement;
            // Check if the wrapper already exists
            if (preElement.parentElement.classList.contains(styles.codeBlockWrapper)) {
                return; // Button already exists
            }

            const wrapper = document.createElement('div');
            wrapper.className = styles.codeBlockWrapper;

            // Move the <pre> element inside the new wrapper
            preElement.parentNode.insertBefore(wrapper, preElement);
            wrapper.appendChild(preElement);

            const button = document.createElement('button');
            button.className = styles.copyButton;
            button.textContent = 'Copy';
            wrapper.insertBefore(button, preElement); // Add button inside wrapper, before <pre>

            button.addEventListener('click', () => {
                navigator.clipboard.writeText(codeBlock.innerText).then(() => {
                    button.textContent = '✅';
                    setTimeout(() => {
                        button.textContent = 'Copy';
                    }, 2000);
                });
            });
        });
    }, [children]);

    return <div ref={contentRef}>{children}</div>;
}