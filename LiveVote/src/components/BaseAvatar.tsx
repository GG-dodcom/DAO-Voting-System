import React, { useEffect, useRef } from 'react';

interface BaseAvatarProps {
  src: string; // URL of the avatar image
  size?: string; // Size of the avatar, optional
  previewFile?: File; // Optional: a local file for preview
}

const BaseAvatar: React.FC<BaseAvatarProps> = ({
  src,
  size = '22',
  previewFile,
}) => {
  const avatarImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // Preview can be used to show a local image instantly (f.e after uploading an image)
    if (avatarImageRef.current && previewFile) {
      avatarImageRef.current.src = URL.createObjectURL(previewFile);
    }

    // This removes the preview image if it's a blob and the previewFile is blank
    if (avatarImageRef.current?.src.startsWith('blob') && !previewFile) {
      avatarImageRef.current.src = '';
    }

    // Clean up function to revoke the object URL
    return () => {
      if (avatarImageRef.current?.src.startsWith('blob')) {
        URL.revokeObjectURL(avatarImageRef.current.src);
      }
    };
  }, [previewFile]);

  return (
    <div>
      {/* Show local preview image if previewFile is defined */}
      {previewFile ? (
        <img
          ref={avatarImageRef}
          className="rounded-full bg-skin-border object-cover"
          style={{
            width: `${Number(size)}px`,
            height: `${Number(size)}px`,
            minWidth: `${Number(size)}px`,
          }}
          alt="avatar"
        />
      ) : (
        // else show image from src
        src && (
          <img
            src={src}
            className="rounded-full bg-skin-border object-cover"
            style={{
              width: `${Number(size)}px`,
              height: `${Number(size)}px`,
              minWidth: `${Number(size)}px`,
            }}
            alt="avatar"
          />
        )
      )}
      {/* Placeholder when neither src nor previewFile is provided */}
      {!src && !previewFile && (
        <div
          className="rounded-full bg-skin-border"
          style={{
            width: `${Number(size)}px`,
            height: `${Number(size)}px`,
            minWidth: `${Number(size)}px`,
          }}
        />
      )}
    </div>
  );
};

export default BaseAvatar;
