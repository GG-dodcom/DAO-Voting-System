import React from 'react';

interface ProposalsItemBodyProps {
  children: React.ReactNode;
}

const ProposalsItemBody: React.FC<ProposalsItemBodyProps> = ({ children }) => {
  return (
    <p className="line-clamp-2 break-words text-md font-semibold">{children}</p>
  );
};

export default ProposalsItemBody;
