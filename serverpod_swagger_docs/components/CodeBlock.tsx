import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockProps {
  language: string;
  code: string;
  showLineNumbers?: boolean;
  fileName?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  language,
  code,
  showLineNumbers = true,
  fileName,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden my-4 border border-white/5 glass-light group">
      {fileName && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
          <span className="text-xs font-mono text-gray-500">{fileName}</span>
          <button
            onClick={handleCopy}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors opacity-0 group-hover:opacity-100"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      {!fileName && (
        <div className="flex justify-end px-4 py-1">
          <button
            onClick={handleCopy}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors opacity-0 group-hover:opacity-100"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={showLineNumbers}
        wrapLines={true}
        customStyle={{
          margin: 0,
          background: 'transparent',
          fontSize: '0.85rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
