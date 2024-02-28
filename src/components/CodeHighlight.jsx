"use client"
import React, { useEffect } from 'react'

// import Highlight.js and the languages you need
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github-dark.css';


hljs.registerLanguage('javascript', javascript)

export default function Highlight({ content }) {
    useEffect(() => {
        hljs.highlightAll();
    }, []);
    const code = content.props.children
    const highlightedCode = hljs.highlight(code, { language: 'javascript' }).value
    return (
        <pre
            dangerouslySetInnerHTML={{
                __html: highlightedCode,
            }}
        />
    );
};