'use client';

import { useEffect } from 'react';
import styles from './documentation.module.css';

export default function CodeBlock({ children }) {
    useEffect(() => {
        const codeBlocks = document.querySelectorAll('pre > code.language-js');

        codeBlocks.forEach(codeBlock => {
            const preElement = codeBlock.parentElement;
            if (preElement.querySelector(`.${styles.copyButton}`)) {
                return; // Button already exists
            }

            const wrapper = document.createElement('div');
            wrapper.className = styles.codeBlockWrapper;
            preElement.parentNode.insertBefore(wrapper, preElement);
            wrapper.appendChild(preElement);

            const button = document.createElement('button');
            button.className = styles.copyButton;
            button.textContent = 'Copy';
            wrapper.appendChild(button);

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

    return <>{children}</>;
}