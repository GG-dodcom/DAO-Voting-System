import type { Meta, StoryObj } from '@storybook/react';
import { BaseButtonIcon } from '../../components';
import '../../assets/css/main.scss';

const meta = {
  title: 'Components/BaseButtonIcon',
  component: BaseButtonIcon,
} satisfies Meta<typeof BaseButtonIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <BaseButtonIcon loading={false}>Click Me</BaseButtonIcon>

      <BaseButtonIcon loading={true}>Click Me</BaseButtonIcon>

      <BaseButtonIcon isDisabled={true}>Click Me</BaseButtonIcon>
    </div>
  ),
};
