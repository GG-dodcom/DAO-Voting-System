// TuneModal.stories.tsx
import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TuneModal } from '../../../components';
import '../../../assets/css/main.scss';

const meta: Meta<typeof TuneModal> = {
  title: 'Components/Tune/TuneModal',
  component: TuneModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    open: { control: 'boolean' },
    hideClose: { control: 'boolean' },
    size: { control: { type: 'select', options: ['big', 'medium'] } },
    onClose: { action: 'onClose' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story showing the modal open
export const Default: Story = {
  args: {
    open: true,
    hideClose: false,
    size: 'medium',
    children: 'This is a default modal.',
  },
};

// Story showing a big modal
export const BigModal: Story = {
  args: {
    open: true,
    hideClose: false,
    size: 'big',
    children: 'This is a big modal.',
  },
};

// Story showing a medium modal
export const MediumModal: Story = {
  args: {
    open: true,
    hideClose: false,
    size: 'medium',
    children: 'This is a medium modal.',
  },
};

// Story where the close button is hidden
export const HiddenCloseButton: Story = {
  args: {
    open: true,
    hideClose: true,
    size: 'medium',
    children: 'This modal hides the close button.',
  },
};

// Interactive story allowing users to toggle the modal
export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => setIsOpen(false);

    return (
      <>
        <button
          className="p-2 bg-blue-500 text-white rounded"
          onClick={() => setIsOpen(true)}
        >
          Open Modal
        </button>
        <TuneModal open={isOpen} onClose={handleClose}>
          <div className="p-4">This is an interactive modal.</div>
        </TuneModal>
      </>
    );
  },
};
