import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSpinner } from '../../components';
import '../../assets/css/main.scss';

const meta = {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="p-4">
      <h1 className="text-lg font-semibold">Loading Spinner Example</h1>
      <LoadingSpinner fillWhite small />
      <LoadingSpinner big />
    </div>
  ),
};
