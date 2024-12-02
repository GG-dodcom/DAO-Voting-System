import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ModalMessage } from '../../components';
import '../../assets/css/main.scss';

const meta: Meta<typeof ModalMessage> = {
  title: 'Components/ModalMessage',
  component: ModalMessage,
  parameters: {
    layout: 'centered', // Center the component on the screen
  },
  argTypes: {
    open: {
      control: 'boolean', // Toggle to show/hide modal
    },
    title: {
      control: 'text', // Allows custom title input
    },
    level: {
      control: {
        type: 'select', // Dropdown for selecting message level
        options: ['info', 'warning', 'warning-red'], // Available message levels
      },
    },
    message: {
      control: 'text', // Allows custom message content input
    },
    onClose: { action: 'closed' }, // Action handler for close button
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Template for rendering the modal message component
const Template: Story = (args) => {
  const [isOpen, setIsOpen] = useState(args.open);

  const handleClose = () => {
    setIsOpen(false); // Close modal on button click
    args.onClose(); // Trigger onClose action
  };

  return (
    <ModalMessage
      {...args}
      open={isOpen}
      onClose={handleClose} // Handle closing the modal
    />
  );
};

// Default modal message story
export const Default = Template.bind({});
Default.args = {
  open: true,
  title: 'Information',
  level: 'info',
  message: 'This is an informational message.',
};

// Warning level modal message story
export const Warning = Template.bind({});
Warning.args = {
  open: true,
  title: 'Warning',
  level: 'warning',
  message: 'This is a warning message. Please take caution.',
};

// Red warning level modal message story
export const WarningRed = Template.bind({});
WarningRed.args = {
  open: true,
  title: 'Critical Warning',
  level: 'warning-red',
  message: 'This is a critical warning. Immediate action is required!',
};

// Modal message with dynamic content and closing
export const ClosableModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <ModalMessage
      open={isOpen}
      title="Closable Modal"
      level="info"
      message="This modal can be closed by clicking the continue button."
      onClose={() => setIsOpen(false)}
    />
  );
};
