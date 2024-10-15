/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  AvatarOverlayEdit,
  AvatarUser,
  BaseAvatar,
  InputUploadAvatar,
} from '.';
import { IHoPencil } from '../assets/icons';

interface AvatarEditProps {
  form: any;
  setForm: any;
  setFormDraft?: any;
  address: string;
  properties: string;
  size?: string;
}

const AvatarEdit: React.FC<AvatarEditProps> = ({
  form,
  setForm,
  setFormDraft,
  properties,
  address,
  size = '80',
}) => {
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
    } else {
      // Traverse the keys to reach the right property
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          // Determine if we are saving to an object
          if (typeof current[key] !== 'object') {
            current[key] = {}; // Ensure it's an object if it doesn't exist
          }
          current[key].file = file; // Set the file
          current[key].url = url; // Set the URL (assuming you get it back from your upload logic)
        } else {
          current[key] = current[key] || {}; // Ensure nested objects exist
          current = current[key]; // Move deeper into the object
        }
      });
    }

    setForm(newForm); // Update the form state
    setFormDraft(newForm);
  };

  return (
    <div className="flex justify-center">
      <InputUploadAvatar
        onImageUploaded={handleImageUploaded}
        onImageRemove={() => {
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
        }}
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
            <AvatarOverlayEdit loading={uploading} />
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
