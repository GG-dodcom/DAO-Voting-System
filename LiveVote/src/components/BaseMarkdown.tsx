import React, { useState, useEffect, useRef } from 'react';
import { Remarkable } from 'remarkable';
import { linkify } from 'remarkable/linkify';
import ModalLinkPreview from './ModalLinkPreview';
import './../assets/css/markdown.scss';

interface Props {
  body: string;
}

const MarkdownComponent: React.FC<Props> = ({ body }) => {
  const [showModal, setShowModal] = useState(false);
  const [clickedUrl, setClickedUrl] = useState('');
  const markdownRef = useRef<HTMLDivElement>(null);

  const remarkable = new Remarkable({
    html: false,
    breaks: true,
    typographer: false,
    linkTarget: '_blank',
  }).use(linkify);

  const markdown = (() => {
    let processedBody = body;

    // if body contains a link that contain `_` , replace it with `\_` to escape it
    processedBody = processedBody.replace(/(http.*?)(?=_)/g, '$1\\');
    return remarkable.render(processedBody);
  })();

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    url: string
  ) => {
    e.preventDefault();
    setClickedUrl(url);

    setShowModal(true);
  };

  const handleConfirm = () => {
    window.open(clickedUrl, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    if (markdownRef.current) {
      const body = markdownRef.current;
      body.querySelectorAll('pre>code').forEach((code) => {
        const parent = code.parentElement;
        if (parent) parent.classList.add('rounded-lg');
        const copyButton = document.createElement('a');
        const icon = document.createElement('i');
        icon.classList.add('copy', 'text-skin-text', 'iconcopy', 'iconfont');
        copyButton.appendChild(icon);
        copyButton.addEventListener('click', () => {
          if (parent) navigator.clipboard.writeText(parent.innerText.trim());
        });
        code.appendChild(copyButton);
      });

      body.querySelectorAll('a[href]').forEach((link) => {
        link.addEventListener('click', (e) => {
          handleLinkClick(
            e as unknown as React.MouseEvent<HTMLAnchorElement>,
            link.getAttribute('href') || ''
          );
        });
      });
    }
  }, []);

  return (
    <>
      <div
        ref={markdownRef}
        className="markdown-body break-words"
        dangerouslySetInnerHTML={{ __html: markdown }}
      />
      {showModal && (
        <ModalLinkPreview
          open={showModal}
          clickedUrl={clickedUrl}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
};

export default MarkdownComponent;
