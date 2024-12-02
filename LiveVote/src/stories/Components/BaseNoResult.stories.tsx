import type { Meta, StoryObj } from '@storybook/react';
import { BaseNoResults } from '../../components';
import '../../assets/css/main.scss';

const meta = {
  title: 'Components/BaseNoResults',
  component: BaseNoResults,
} satisfies Meta<typeof BaseNoResults>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Search Results</h1>
      <BaseNoResults />
    </div>
  ),
};
