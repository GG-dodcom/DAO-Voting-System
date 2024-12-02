import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ModalSelectDate } from '../../components';
import '../../assets/css/main.scss';

export default {
  title: 'Components/ModalSelectDate',
  component: ModalSelectDate,
  argTypes: {
    open: {
      control: { type: 'boolean' },
      description: 'Controls whether the modal is open or closed',
    },
    value: {
      control: { type: 'number' },
      description: 'Timestamp value to initialize the modal with',
    },
    type: {
      control: { type: 'select', options: ['start', 'end'] },
      description: 'Type of the date being selected (start or end)',
    },
    onChange: {
      action: 'changed',
      description: 'Callback function to handle date selection',
    },
    onClose: {
      action: 'closed',
      description: 'Callback function to handle modal close',
    },
  },
} as Meta;

const Template: StoryObj<React.ComponentProps<typeof ModalSelectDate>> = (
  args
) => {
  const [isOpen, setIsOpen] = useState(args.open);

  const handleClose = () => {
    setIsOpen(false);
    args.onClose();
  };

  return <ModalSelectDate {...args} open={isOpen} onClose={handleClose} />;
};

export const DefaultModal = Template.bind({});
DefaultModal.args = {
  open: true, // Modal starts open
  value: undefined, // No initial value
  type: 'start', // Default type is 'start'
};

export const StartDateModal = Template.bind({});
StartDateModal.args = {
  open: true,
  value: Math.floor(new Date().getTime() / 1000), // Current timestamp
  type: 'start',
};

export const EndDateModal = Template.bind({});
EndDateModal.args = {
  open: true,
  value: Math.floor(new Date().getTime() / 1000) + 3600, // Current timestamp + 1 hour
  type: 'end',
};

export const Custom: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | undefined>(
    undefined
  );

  const handleDateChange = (value: number) => {
    setSelectedDate(value);
    console.log('Selected Date:', new Date(value * 1000).toLocaleString()); // Log or use the selected date
  };

  return (
    <div className="app">
      <h1 className="text-center text-2xl font-bold">Select a Date</h1>
      <div className="text-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setModalOpen(true)}
        >
          Open Date Selector
        </button>
      </div>

      <ModalSelectDate
        open={isModalOpen}
        value={selectedDate}
        onChange={handleDateChange}
        onClose={() => setModalOpen(false)}
      />

      {selectedDate && (
        <div className="text-center mt-4">
          <h2 className="text-lg">
            Selected Date: {new Date(selectedDate * 1000).toLocaleString()}
          </h2>
        </div>
      )}
    </div>
  );
};
