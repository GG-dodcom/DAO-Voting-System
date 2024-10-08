import type { Meta, StoryObj } from '@storybook/react';
import { TheNavbar } from '../../components';
import { MemoryRouter } from 'react-router-dom';
import '../../assets/css/main.scss';

const meta = {
  title: 'Components/TheNavbar',
  component: TheNavbar,
  decorators: [
    (Story) => (
      <MemoryRouter>
        {/* Wrap your component with MemoryRouter */}
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof TheNavbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TheNavbar />,
};
