import React from 'react';
import { sha256 } from 'js-sha256';
import { BaseAvatar } from './';

interface AvatarSpaceProps {
  space: {
    id: string;
    avatar?: string;
  };
  size?: string;
  previewFile?: File;
}

const AvatarSpace: React.FC<AvatarSpaceProps> = ({
  space,
  size = '20',
  previewFile,
}) => {
  const avatarHash = React.useMemo(() => {
    if (!space?.avatar) return '';
    const hash = sha256(space.avatar).slice(0, 16);
    return `&cb=${hash}`;
  }, [space?.avatar]);

  const avatarSrc = `https://cdn.stamp.fyi/space/${space.id}?s=${
    Number(size) * 2
  }${avatarHash}`;

  return (
    <div>
      <BaseAvatar previewFile={previewFile} size={size} src={avatarSrc} />
    </div>
  );
};

export default AvatarSpace;
