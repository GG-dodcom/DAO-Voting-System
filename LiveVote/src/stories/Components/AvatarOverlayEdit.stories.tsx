import type { Meta, StoryObj } from '@storybook/react';
import { AvatarOverlayEdit } from '../../components';
import '../../assets/css/main.scss';
import { useState } from 'react';

// Define meta information for Storybook
const meta = {
  title: 'Components/AvatarOverlayEdit',
  component: AvatarOverlayEdit,
  argTypes: {
    loading: { control: 'boolean' },
    avatar: { control: 'text' },
    isViewOnly: { control: 'boolean' },
  },
} satisfies Meta<typeof AvatarOverlayEdit>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - Non-loading, no avatar, not view-only
export const Default: Story = {
  args: {
    loading: false,
    avatar:
      'https://cdn.stamp.fyi/avatar/eth:$%7Baddress%7D?s=$%7BNumber(size)',
    isViewOnly: false,
  },
};

// Loading state story - Display loading spinner
export const Loading: Story = {
  args: {
    loading: true,
    avatar:
      'https://cdn.stamp.fyi/avatar/eth:$%7Baddress%7D?s=$%7BNumber(size)',
    isViewOnly: false,
  },
};

// Avatar present, with edit overlay
export const WithAvatar: Story = {
  args: {
    loading: false,
    avatar:
      'https://cdn.stamp.fyi/avatar/eth:$%7Baddress%7D?s=$%7BNumber(size)', // Replace with an actual avatar URL if available
    isViewOnly: false,
  },
};

// View-only state, no interaction allowed
export const ViewOnly: Story = {
  args: {
    loading: false,
    avatar:
      'https://cdn.stamp.fyi/avatar/eth:$%7Baddress%7D?s=$%7BNumber(size)',
    isViewOnly: true,
  },
};

// Loading state with view-only (should not allow any interaction)
export const LoadingViewOnly: Story = {
  args: {
    loading: true,
    avatar: 'https://via.placeholder.com/150',
    isViewOnly: true,
  },
};

export const Custom: React.FC = () => {
  // State for avatar URL
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [isViewOnly, setIsViewOnly] = useState(false);

  // Simulate file upload with a mock delay
  const handleAvatarUpload = () => {
    setLoading(true);
    setTimeout(() => {
      // Mock uploaded avatar image
      setAvatar(
        'https://cdn.stamp.fyi/avatar/eth:$%7Baddress%7D?s=$%7BNumber(size)'
      ); // You can replace with your own URL
      setLoading(false);
    }, 2000); // Simulate a 2 second delay for the upload
  };

  return (
    <div className="app">
      <h1>Avatar Overlay Edit Example</h1>
      <div
        className="avatar-container"
        style={{ position: 'relative', width: '150px', height: '150px' }}
      >
        {/* Avatar image */}
        {avatar && (
          <img
            src={avatar}
            alt="Avatar"
            className="rounded-full w-full h-full"
          />
        )}

        {/* AvatarOverlayEdit component */}
        <AvatarOverlayEdit
          loading={loading}
          avatar={avatar}
          isViewOnly={isViewOnly}
        />
      </div>

      {/* Button to simulate uploading */}
      <button onClick={handleAvatarUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Avatar'}
      </button>

      {/* Toggle for view-only mode */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={isViewOnly}
            onChange={(e) => setIsViewOnly(e.target.checked)}
          />
          View Only Mode
        </label>
      </div>
    </div>
  );
};
