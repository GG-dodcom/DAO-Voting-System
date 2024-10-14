import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { SpaceCreateVotingDateStart } from '../../components';
import '../../assets/css/main.scss';

export default {
  title: 'Components/SpaceCreateVotingDateStart',
  component: SpaceCreateVotingDateStart,
  argTypes: {
    delay: {
      control: { type: 'number' },
      description: 'Delay before voting starts, disables date input if set',
    },
    isEditing: {
      control: 'boolean',
      description: 'If true, disables date input for editing mode',
    },
    date: {
      control: { type: 'number' },
      description: 'Selected start date as a Unix timestamp',
    },
    onSelect: {
      action: 'date selected',
      description: 'Callback function triggered when a new date is selected',
    },
  },
} as Meta;

const Template: StoryObj<
  React.ComponentProps<typeof SpaceCreateVotingDateStart>
> = (args) => {
  const [selectedDate, setSelectedDate] = useState(args.date);

  return (
    <SpaceCreateVotingDateStart
      {...args}
      date={selectedDate}
      onSelect={(newDate: number) => {
        setSelectedDate(newDate);
        args.onSelect(newDate);
      }}
    />
  );
};

// Default story showing the component with no delay or editing
export const Default = Template.bind({});
Default.args = {
  date: Math.floor(Date.now() / 1000), // Current timestamp in seconds
  delay: 0, // No delay
  isEditing: false, // Editing is disabled
};

// Story with a delay, disabling the input
export const WithDelay = Template.bind({});
WithDelay.args = {
  ...Default.args,
  delay: 60 * 60 * 24, // 1-day delay
};

// Story with editing mode enabled, making the input disabled
export const EditingMode = Template.bind({});
EditingMode.args = {
  ...Default.args,
  isEditing: true, // Editing mode is enabled
};

// Story with a pre-selected custom date
export const CustomDate = Template.bind({});
CustomDate.args = {
  ...Default.args,
  date: new Date('2024-10-15T12:47:00').getTime() / 1000, // Custom date in Unix timestamp
};

export const Custom: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<number>(Date.now() / 1000); // Initial date in Unix timestamp (seconds)
  const [delay, setDelay] = useState<number | null>(null); // No delay by default
  const [isEditing, setIsEditing] = useState<boolean>(false); // Editing status

  // Callback function for date selection
  const handleDateSelect = (newDate: number) => {
    setSelectedDate(newDate); // Update the selected date
    console.log('Selected Date:', new Date(newDate * 1000).toLocaleString()); // For debug/logging
  };

  return (
    <div className="app-container">
      <h1>Voting Date Selection</h1>

      <SpaceCreateVotingDateStart
        delay={delay}
        isEditing={isEditing}
        date={selectedDate}
        onSelect={handleDateSelect}
      />

      {/* Optional: Toggle delay and edit state for testing */}
      <div className="controls">
        <button onClick={() => setDelay(delay === null ? 3600 : null)}>
          Toggle Delay
        </button>
        <button onClick={() => setIsEditing(!isEditing)}>Toggle Editing</button>
      </div>
    </div>
  );
};
