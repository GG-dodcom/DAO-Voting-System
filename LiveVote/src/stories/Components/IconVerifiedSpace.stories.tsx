import type { Meta, StoryObj } from '@storybook/react';
import { IconVerifiedSpace } from '../../components';
import '../../assets/css/main.scss';

const meta = {
  title: 'Components/IconVerifiedSpace',
  component: IconVerifiedSpace,
} satisfies Meta<typeof IconVerifiedSpace>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Verified Space Icon</h1>
      <IconVerifiedSpace size="40" turbo={false} />
      <p className="mt-2">Hover over the icon for tooltip information.</p>
    </div>
  ),
};

export const TurboMode: Story = {
  render: () => (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Verified Space Icon in Turbo Mode</h1>
      <IconVerifiedSpace size="40" turbo={true} />
      <p className="mt-2">Hover over the icon for tooltip information.</p>
    </div>
  ),
};
