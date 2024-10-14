import React, { useState } from 'react';
import { AvatarOverlayEdit, AvatarUser, InputUploadAvatar } from '.';
import { IHoPencil } from '../assets/icons';

interface Profile {
  name?: string;
  about?: string;
  avatar?: File | null;
}

interface AvatarEditProps {
  address: string;
  profile?: Profile;
  size?: string;
}

/* After import image the image is not change, cause the image need
  backend to return a url link to open */
const AvatarEdit: React.FC<AvatarEditProps> = ({ address, size = '80' }) => {
  const [form, setForm] = useState<Profile>({
    avatar: '',
  });

  return (
    <div className="flex justify-center">
      <InputUploadAvatar
        onImageUploaded={(url: string) => setForm({ ...form, avatar: url })}
        onImageRemove={() => setForm({ ...form, avatar: '' })}
      >
        {({
          uploading,
          previewFile,
        }: {
          uploading: boolean;
          previewFile: File | undefined;
        }) => (
          <div className="relative">
            <AvatarUser
              address={address}
              previewFile={previewFile}
              size={size}
            />
            <AvatarOverlayEdit loading={uploading} avatar={form.avatar} />
            <div className="absolute bottom-[2px] right-0 rounded-full bg-skin-heading p-1">
              <IHoPencil className="text-[12px] text-skin-bg" />
            </div>
          </div>
        )}
      </InputUploadAvatar>
    </div>
  );
};
export default AvatarEdit;
