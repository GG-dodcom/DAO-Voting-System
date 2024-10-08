import type { Meta, StoryObj } from '@storybook/react';
import { TuneButton } from '../../../components';
import '../../../assets/css/main.scss';

const meta = {
  title: 'Components/Tune/TuneButton',
  component: TuneButton,
} satisfies Meta<typeof TuneButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TuneButton>Click Me</TuneButton>,
};
