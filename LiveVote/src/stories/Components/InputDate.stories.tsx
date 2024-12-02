import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { InputDate } from '../../components/';
import '../../assets/css/main.scss';
import { t } from 'i18next';

export default {
  title: 'Components/InputDate',
  component: InputDate,
  argTypes: {
    title: {
      control: 'text',
      description: 'Title displayed above the date input',
    },
    information: {
      control: 'text',
      description: 'Additional information displayed below the title',
    },
    dateString: {
      control: 'text',
      description: 'Formatted date string to display',
    },
    date: {
      control: { type: 'number' },
      description: 'Date as a Unix timestamp',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, disables the date selector',
    },
    type: {
      control: { type: 'select', options: ['start', 'end'] },
      description: 'Type of date selection (start or end)',
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip content when hovering over the button',
    },
    onInputDate: {
      action: 'date selected',
      description: 'Callback function when a new date is selected',
    },
  },
} as Meta;

const Template: StoryObj<React.ComponentProps<typeof InputDate>> = (args) => {
  const [selectedDate, setSelectedDate] = useState(args.date);

  return (
    <InputDate
      {...args}
      date={selectedDate}
      onInputDate={(date: number) => {
        setSelectedDate(date);
        args.onInputDate(date);
      }}
    />
  );
};

export const DefaultInputDate = Template.bind({});
DefaultInputDate.args = {
  title: 'Select a Date',
  information: 'Please select a start or end date for your event.',
  dateString: 'Select a date...',
  date: Math.floor(Date.now() / 1000), // Current timestamp
  disabled: false,
  type: 'start', // Default to 'start' type
  tooltip: 'Click to select a date',
};

export const DisabledInputDate = Template.bind({});
DisabledInputDate.args = {
  ...DefaultInputDate.args,
  title: 'Select a Date (Disabled)',
  date: Math.floor(Date.now() / 1000),
  disabled: true,
  tooltip: 'This date selector is disabled',
};

export const EndDateInputDate = Template.bind({});
EndDateInputDate.args = {
  ...DefaultInputDate.args,
  title: 'Select End Date',
  type: 'end', // Change to 'end' type
};

export const WithCustomDateString = Template.bind({});
WithCustomDateString.args = {
  ...DefaultInputDate.args,
  title: 'Custom Date Selector',
  dateString: new Date(Date.now()).toLocaleDateString(), // Example custom date string
  date: Date.now() / 1000, // Convert to Unix timestamp
};

export const Custom: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<number>(Date.now() / 1000); // Current timestamp in seconds

  const handleInputDate = (date: number) => {
    setSelectedDate(date);
    console.log('Selected Date:', new Date(date * 1000).toLocaleString()); // Log the selected date
  };

  return (
    <div className="app p-4">
      <h1 className="text-center text-2xl font-bold">Date Selector Example</h1>
      <InputDate
        title={t('select.date')} // Use i18next for localization
        information={t('select.dateInfo')}
        dateString={new Date(selectedDate * 1000).toLocaleDateString()} // Format the date string
        date={selectedDate}
        tooltip={t('select.dateTooltip')}
        onInputDate={handleInputDate}
      />
      {selectedDate && (
        <div className="text-center mt-4">
          <h2 className="text-lg">
            Currently Selected Date:{' '}
            {new Date(selectedDate * 1000).toLocaleString()}
          </h2>
        </div>
      )}
    </div>
  );
};
