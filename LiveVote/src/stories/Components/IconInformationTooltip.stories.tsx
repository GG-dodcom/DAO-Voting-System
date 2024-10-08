import type { Meta, StoryObj } from '@storybook/react';
import { IconInformationTooltip } from '../../components';
import '../../assets/css/main.scss';

const meta = {
  title: 'Components/IconInformationTooltip',
  component: IconInformationTooltip,
} satisfies Meta<typeof IconInformationTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <IconInformationTooltip information="information" />,
};
