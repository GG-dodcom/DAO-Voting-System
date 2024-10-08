import type { Meta, StoryObj } from '@storybook/react';
import { AvatarSpace } from '../../components';
import '../../assets/css/main.scss';
import { useState } from 'react';

const meta = {
  title: 'Components/AvatarSpace',
  component: AvatarSpace,
} satisfies Meta<typeof AvatarSpace>;

export default meta;
type Story = StoryObj<typeof meta>;

const AvatarSpaceExample: React.FC = () => {
  const [space, setSpace] = useState({
    id: 'example-id',
    avatar: 'example-avatar-url', // Replace this with a valid avatar URL
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate setting a new avatar (you can modify this logic as needed)
      const reader = new FileReader();
      reader.onload = () => {
        setSpace({
          ...space,
          avatar: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="App">
      <h1>Avatar Space Example</h1>
      <AvatarSpace space={space} size="40" />
      <input type="file" onChange={handleChange} />
    </div>
  );
};

export const Default: Story = {
  render: () => <AvatarSpaceExample />,
};
