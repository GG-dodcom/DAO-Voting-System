/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/react';
import { AvatarEdit } from '../../components';
import '../../assets/css/main.scss';
import { useState } from 'react';

const meta = {
  title: 'Components/AvatarEdit',
  component: AvatarEdit,
} satisfies Meta<typeof AvatarEdit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: React.FC = () => {
  const [profile, setProfile] = useState<any>({
    name: 'John Doe',
    about: 'A brief bio about John.',
    avatar: '',
  });
  return (
    <div className="app">
      <h1 className="text-2xl text-center my-4">Edit Avatar Example</h1>

      <div className="flex flex-col items-center justify-center space-y-6">
        {/* AvatarEdit Component */}
        <AvatarEdit address="0x12345..." profile={profile} />

        {/* Display Profile Information */}
        <div className="profile-info text-center">
          <h2 className="text-xl">{profile.name}</h2>
          <p>{profile.about}</p>
          {profile.avatar && (
            <img
              src={profile.avatar}
              alt="Profile Avatar"
              className="w-20 h-20 rounded-full"
            />
          )}
        </div>
        <p>
          Note: image will not change, cause it need to send the image to
          backend, then backend return a url, the `InputUploadAvatar` will open
          url
        </p>
      </div>
    </div>
  );
};
