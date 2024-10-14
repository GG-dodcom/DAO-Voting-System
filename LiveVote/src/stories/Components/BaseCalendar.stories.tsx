import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { BaseCalendar } from '../../components';
import '../../assets/css/main.scss';

export default {
  title: 'Components/BaseCalendar',
  component: BaseCalendar,
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'The selected date in the format YYYY-MM-DD',
    },
    onChange: {
      action: 'changed',
      description: 'Callback function called when the date is changed',
    },
  },
} as Meta;

const Template: StoryObj<React.ComponentProps<typeof BaseCalendar>> = (
  args
) => <BaseCalendar {...args} />;

const currentDate = new Date();

const year = currentDate.getFullYear(); // Gets the full year (e.g., 2024)
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1. Pads with '0' if needed.
const day = String(currentDate.getDate()).padStart(2, '0'); // Pads the day with '0' if needed.

const formattedDate = `${year}-${month}-${day}`;

export const DefaultCalendar = Template.bind({});
DefaultCalendar.args = {
  value: '', // No initial date selected
};

export const SelectedDateCalendar = Template.bind({});
SelectedDateCalendar.args = {
  value: formattedDate, // Example initial date selected
};

export const DisabledDaysCalendar = Template.bind({});
DisabledDaysCalendar.args = {
  value: formattedDate,
};

export const Custom: React.FC = () => {
  // Set an initial date in 'YYYY-MM-DD' format
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const handleDateChange = (newDate: string) => {
    console.log('Selected Date:', newDate); // Log the selected date or handle it as needed
    setSelectedDate(newDate);
  };

  return (
    <div className="app">
      <h1 className="text-center text-2xl font-bold">Base Calendar</h1>
      <BaseCalendar value={selectedDate} onChange={handleDateChange} />
    </div>
  );
};
