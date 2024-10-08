import type { Meta, StoryObj } from '@storybook/react';
import { TheFooter } from '../../components';
import '../../assets/css/main.scss';

const meta = {
  title: 'Components/TheFooter',
  component: TheFooter,
} satisfies Meta<typeof TheFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TheFooter />,
};
