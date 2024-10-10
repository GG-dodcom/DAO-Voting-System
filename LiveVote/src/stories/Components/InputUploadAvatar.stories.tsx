import type { Meta, StoryObj } from '@storybook/react';
import { InputUploadAvatar } from '../../components';
import '../../assets/css/main.scss';
import { useState } from 'react';

const meta = {
  title: 'Components/InputUploadAvatar',
  component: InputUploadAvatar,
} satisfies Meta<typeof InputUploadAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [imageUrl, setImageUrl] = useState('');

    const handleImageUpload = (url: string) => {
      setImageUrl(url);
    };

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Upload Avatar</h1>
        <InputUploadAvatar onImageUploaded={handleImageUpload}>
          {({ uploading, previewFile }) => (
            <div className="border border-dashed border-gray-400 p-4 rounded-md cursor-pointer flex flex-col items-center">
              {uploading && <p>Uploading...</p>}
              {previewFile && (
                <img
                  src={URL.createObjectURL(previewFile)}
                  alt="Preview"
                  className="w-32 h-32 object-cover mb-2"
                />
              )}
              {!uploading && !previewFile && <p>Click to upload an image</p>}
            </div>
          )}
        </InputUploadAvatar>
        {imageUrl && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Uploaded Image URL:</h2>
            <p className="text-sm">{imageUrl}</p>
            <img
              src={imageUrl}
              alt="Uploaded"
              className="w-32 h-32 object-cover mt-2"
            />
          </div>
        )}
      </div>
    );
  },
};

export const ViewOnly: Story = {
  render: () => {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">View Only Avatar</h1>
        <InputUploadAvatar isViewOnly onImageUploaded={() => {}}>
          {({ uploading, previewFile }) => (
            <div className="border border-dashed border-gray-400 p-4 rounded-md cursor-not-allowed flex flex-col items-center">
              {uploading && <p>Uploading...</p>}
              {previewFile && (
                <img
                  src={URL.createObjectURL(previewFile)}
                  alt="Preview"
                  className="w-32 h-32 object-cover mb-2"
                />
              )}
              {!uploading && !previewFile && <p>Image view only</p>}
            </div>
          )}
        </InputUploadAvatar>
      </div>
    );
  },
};
