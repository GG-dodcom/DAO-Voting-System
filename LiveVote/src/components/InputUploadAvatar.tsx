import React, { useState, useRef, useEffect } from 'react';
import { useFlashNotification, useImageUpload } from '../hooks';

interface InputUploadAvatarProps {
  isViewOnly?: boolean;
  onImageUploaded: (data: { file: File; url: string }) => void;
  onImageRemove?: () => void;
  children: (props: {
    uploading: boolean;
    previewFile: File | undefined;
  }) => React.ReactNode;
}

const InputUploadAvatar: React.FC<InputUploadAvatarProps> = ({
  isViewOnly,
  onImageUploaded,
  onImageRemove,
  children,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [previewFile, setPreviewFile] = useState<File | undefined>(undefined);

  const { upload, isUploadingImage, imageUploadError } = useImageUpload();
  const { notify } = useFlashNotification();

  const openFilePicker = () => {
    if (isViewOnly) return;
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadSuccess(false);
    const file = e.target.files?.[0];
    if (file) {
      setPreviewFile(file);
      upload(file, (image: { url: string }) => {
        setUploadSuccess(true);
        onImageUploaded({ file, url: image.url });
      });
    }
  };

  useEffect(() => {
    if (imageUploadError) {
      notify(['red', imageUploadError]);
    }
  }, [imageUploadError, notify]);

  return (
    <div onClick={openFilePicker}>
      {children({
        uploading: isUploadingImage,
        previewFile: uploadSuccess ? previewFile : undefined,
      })}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        style={{ display: 'none' }}
        onChange={onFileChange}
      />
    </div>
  );
};

export default InputUploadAvatar;
