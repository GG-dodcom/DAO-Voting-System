/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useFlashNotification } from './useFlashNotification';
import { useTranslation } from 'react-i18next';

export function useImageUpload() {
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageName, setImageName] = useState('');

  const { t } = useTranslation();
  const { notify } = useFlashNotification();

  const reset = () => {
    setIsUploadingImage(false);
    setImageUploadError('');
    setImageUrl('');
    setImageName('');
  };

  const upload = async (
    file: File | null,
    onSuccess: (image: { name: string; url: string }) => void
  ) => {
    reset();
    if (!file) return;
    setIsUploadingImage(true);

    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
      setImageUploadError(t('errors.unsupportedImageType'));
      setIsUploadingImage(false);
      return;
    }

    if (file.size > 1024 * 1024) {
      setImageUploadError(t('errors.fileTooBig'));
      setIsUploadingImage(false);
      return;
    }

    try {
      const uploadedUrl = URL.createObjectURL(file);
      setImageUrl(uploadedUrl);
      setImageName(file.name);
      onSuccess({ name: file.name, url: uploadedUrl });
    } catch (err: any) {
      notify(['red', t('notify.somethingWentWrong')]);
      setImageUploadError(err.error?.message || err.message || err);
    } finally {
      setIsUploadingImage(false);
    }
  };

  return {
    isUploadingImage,
    imageUploadError,
    image: {
      url: imageUrl,
      name: imageName,
    },
    upload,
  };
}
