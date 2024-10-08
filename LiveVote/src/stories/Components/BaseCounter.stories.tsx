import type { Meta, StoryObj } from '@storybook/react';
import { BaseCounter } from '../../components';
import '../../assets/css/main.scss';

const meta = {
  title: 'Components/BaseCounter',
  component: BaseCounter,
} satisfies Meta<typeof BaseCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <BaseCounter counter={5} />,
};
