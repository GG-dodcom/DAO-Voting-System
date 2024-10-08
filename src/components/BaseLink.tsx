import React from 'react';
import { sanitizeUrl } from '@braintree/sanitize-url';
import { Link } from 'react-router-dom';
import { IHoExternalLink } from '../assets/icons';

type LinkProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  link: Record<string, any> | string;
  hideExternalIcon?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
};

const BaseLink: React.FC<LinkProps> = ({
  link,
  hideExternalIcon = false,
  disabled = false,
  children,
}) => {
  const isExternal = typeof link === 'string';

  return isExternal ? (
    // External link
    <a
      href={sanitizeUrl(link)}
      target="_blank"
      rel="noopener noreferrer"
      className={`whitespace-nowrap ${disabled ? 'pointer-events-none' : ''}`}
    >
      {children}
      {!hideExternalIcon && (
        <IHoExternalLink className="mb-[2px] ml-1 inline-block text-xs" />
      )}
    </a>
  ) : (
    // Internal link (router link)
    <Link
      to={link}
      className={`whitespace-nowrap ${disabled ? 'pointer-events-none' : ''}`}
    >
      {children}
    </Link>
  );
};

export default BaseLink;
