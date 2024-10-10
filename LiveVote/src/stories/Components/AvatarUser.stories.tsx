import type { Meta, StoryObj } from '@storybook/react';
import { AvatarUser } from '../../components';
import '../../assets/css/main.scss';

const meta = {
  title: 'Components/AvatarUser',
  component: AvatarUser,
} satisfies Meta<typeof AvatarUser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Default Avatar</h1>
      <AvatarUser address="0x1234567890abcdef1234567890abcdef12345678" />
    </div>
  ),
};

export const CustomSize: Story = {
  render: () => (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Custom Size Avatar</h1>
      <AvatarUser
        address="0x1234567890abcdef1234567890abcdef12345678"
        size="50"
      />
    </div>
  ),
};

export const WithPreviewFile: Story = {
  render: () => {
    // Simulating a preview file, you can replace this with an actual file object if needed
    const mockFile = new File([''], 'avatar.png', { type: 'image/png' });

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Avatar with Preview File</h1>
        <AvatarUser
          address="0x1234567890abcdef1234567890abcdef12345678"
          previewFile={mockFile}
        />
      </div>
    );
  },
};
