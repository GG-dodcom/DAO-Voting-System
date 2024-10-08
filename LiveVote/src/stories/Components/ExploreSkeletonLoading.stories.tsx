import type { Meta, StoryObj } from '@storybook/react';
import { ExploreSkeletonLoading } from '../../components';
import '../../assets/css/main.scss';

const meta = {
  title: 'Components/ExploreSkeletonLoading',
  component: ExploreSkeletonLoading,
} satisfies Meta<typeof ExploreSkeletonLoading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="p-4">
      <h1 className="text-2xl font-bold">ExploreSkeletonLoading...</h1>
      <ExploreSkeletonLoading />
    </div>
  ),
};
