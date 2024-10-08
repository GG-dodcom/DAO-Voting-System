import React from 'react';
import { BaseLink } from './index';

interface FooterLinksItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  link: any;
  hideExternalIcon?: boolean;
  children: React.ReactNode;
}

const FooterLinksItem: React.FC<FooterLinksItemProps> = ({
  link,
  children,
}) => {
  return (
    <div className="flex items-center justify-center text-skin-text hover:text-skin-link md:justify-start">
      <BaseLink link={link} hideExternalIcon={true}>
        {children}
      </BaseLink>
    </div>
  );
};

export default FooterLinksItem;
