import React from 'react';
import { BaseAvatar } from '.';

interface AvatarUserProps {
  address: string;
  size?: string;
  previewFile?: File | undefined;
}

const AvatarUser: React.FC<AvatarUserProps> = ({
  address,
  size = '22',
  previewFile,
}) => {
  return (
    <BaseAvatar
      src={`https://cdn.stamp.fyi/avatar/eth:${address}?s=${Number(size) * 2}`}
      previewFile={previewFile}
      size={size}
    />
  );
};

export default AvatarUser;
