import React from 'react';

interface FooterTitleProps {
  children: React.ReactNode;
}

const FooterTitle: React.FC<FooterTitleProps> = ({ children }) => {
  return <h4 className="font-medium">{children}</h4>;
};

export default FooterTitle;
