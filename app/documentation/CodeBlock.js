'use client';

import { useEffect, useRef, useCallback } from 'react';
import styles from './documentation.module.css';

export default function CodeBlock({ children }) {
    const contentRef = useRef(null);
    const initialized = useRef(false);

    const setupCopyButtons = useCallback(() => {
        if (!contentRef.current) return;

        const codeBlocks = contentRef.current.querySelectorAll('pre > code.language-js');

        codeBlocks.forEach(codeBlock => {
            const preElement = codeBlock.parentElement;
            // Prevent re-adding the button if the component re-renders
            if (preElement.parentElement.classList.contains(styles.codeBlockWrapper)) {
                return;
            }

            const wrapper = document.createElement('div');
            wrapper.className = styles.codeBlockWrapper;

            preElement.parentNode.insertBefore(wrapper, preElement);
            wrapper.appendChild(preElement);

            const button = document.createElement('button');
            button.className = styles.copyButton;
            button.textContent = 'Copy';
            wrapper.insertBefore(button, preElement);

            button.addEventListener('click', () => {
                navigator.clipboard.writeText(codeBlock.innerText).then(() => {
                    button.textContent = '✅';
                    setTimeout(() => {
                        button.textContent = 'Copy';
                    }, 2000);
                });
            });
        });
    }, []);

    useEffect(() => {
        // Run only once on component mount
        if (!initialized.current) {
            setupCopyButtons();
            initialized.current = true;
        }
    }, [setupCopyButtons]);

    return <div ref={contentRef}>{children}</div>;
}