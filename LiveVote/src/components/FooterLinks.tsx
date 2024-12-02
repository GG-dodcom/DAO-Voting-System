import React from 'react';

interface FooterLinksProps {
  children: React.ReactNode; // Use React's children prop to hold nested elements
}

const FooterLinks: React.FC<FooterLinksProps> = ({ children }) => {
  return <div className="space-y-[12px]">{children}</div>;
};

export default FooterLinks;
