/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from 'react';
import { AvatarOverlayEdit, BaseAvatar } from '.';
import { IHoPencil } from '../assets/icons';
import { useFlashNotification } from '../context';
import { t } from 'i18next';

interface Props {
  form: any;
  setForm: any;
  properties: string;
  size?: string;
}

const AvatarEdit: React.FC<Props> = ({
  form,
  setForm,
  properties,
  size = '80',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [previewFile, setPreviewFile] = useState<File | undefined>(undefined);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const { notify } = useFlashNotification();

  const handleImageUploaded = ({ file, url }: { file: File; url: string }) => {
    // Use the properties string to set the file in the correct place
    const newForm = { ...form };
    const keys = properties.split('.'); // Split properties for nested paths
    let current = newForm;

    if (keys.includes('choices')) {
      // Extract the index from the properties string, e.g., 'choices.0.avatar'
      const choiceIndex = parseInt(keys[1], 10); // Assuming properties is like 'choices.0.avatar'

      if (newForm.choices && newForm.choices[choiceIndex]) {
        // Ensure the specific choice exists in the form
        newForm.choices[choiceIndex].avatar = {
          file, // Set the file
          url, // Set the URL
        };
      }
    } else if (properties === 'avatar') {
      // Check if properties is just 'avatar'
      current.avatar = {
        file, // Set the file directly
        url, // Set the URL directly
      };
    }

    setForm(newForm); // Update the form state
  };

  const uploadImage = async (file: File) => {
    setIsUploadingImage(true);

    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
      notify(['red', t('errors.unsupportedImageType')]);
      setIsUploadingImage(false);
      return;
    }

    if (file.size > 1024 * 1024) {
      notify(['red', t('errors.fileTooBig')]);
      setIsUploadingImage(false);
      return;
    }

    const uploadedUrl = URL.createObjectURL(file);
    setImageUploaded(file, uploadedUrl);

    setIsUploadingImage(false);
  };

  const setImageUploaded = (file: File, url: string) => {
    setUploadSuccess(true);
    handleImageUploaded({ file, url });
  };

  const handleImageRemove = () => {
    // Clear the target property in the form
    const newForm = { ...form };
    const keys = properties.split('.');
    let current = newForm;

    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        current[key] = null; // Remove the file
      } else {
        current[key] = current[key] || {};
        current = current[key];
      }
    });

    setForm(newForm); // Update the form state
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewFile(file);
      uploadImage(file);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="relative" onClick={openFilePicker}>
        <BaseAvatar
          src={
            properties.split('.').reduce((acc, key) => acc && acc[key], form)
              ?.url || ''
          }
          previewFile={uploadSuccess ? previewFile : undefined}
          size={size}
        />

        <AvatarOverlayEdit loading={isUploadingImage} />
        <div className="absolute bottom-[2px] right-0 rounded-full bg-skin-heading p-1">
          <IHoPencil className="text-[12px] text-skin-bg" />
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          style={{ display: 'none' }}
          onChange={onFileChange}
        />
      </div>
    </div>
  );
};

export default AvatarEdit;
