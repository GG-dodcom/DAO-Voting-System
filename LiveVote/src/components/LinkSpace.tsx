import React from 'react';
import domains from '@/../snapshot-spaces/spaces/domains.json';
import BaseLink from '.';
import { useApp } from '@/hooks/useApp';

interface SpaceLinkProps {
  spaceId: string;
  children: React.ReactNode;
}

const SpaceLink: React.FC<SpaceLinkProps> = ({ spaceId, children }) => {
  const { domain } = useApp();

  const getSpaceLink = () => {
    // Check if proposal space id is a value in the domains.json file
    if (domain && Object.values(domains).includes(spaceId)) {
      // If so, find the key that matches the value
      const key = Object.keys(domains).find((key) => domains[key] === spaceId);
      return `https://${key}`;
    }

    if (domain) return `https://snapshot.org/#/${spaceId}`;

    return {
      name: 'spaceProposals',
      params: { key: spaceId },
    };
  };

  const spaceLink = getSpaceLink();

  return (
    <BaseLink link={spaceLink} hideExternalIcon>
      {children}
    </BaseLink>
  );
};

export default SpaceLink;
