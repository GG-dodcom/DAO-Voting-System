import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TuneButtonSelect } from '../../../components';
import '../../../assets/css/main.scss';

// Define meta information for Storybook
const meta: Meta<typeof TuneButtonSelect> = {
  title: 'Components/Tune/TuneButtonSelect',
  component: TuneButtonSelect,
  argTypes: {
    modelValue: { control: 'text' },
    label: { control: 'text' },
    hint: { control: 'text' },
    disabled: { control: 'boolean' },
    tooltip: { control: 'text' },
    className: { control: 'text' },
    onSelect: { action: 'selected' }, // Simulate action when the button is clicked
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Template for rendering the component
const Template: Story<typeof TuneButtonSelect> = (args) => (
  <TuneButtonSelect {...args} />
);

// Default story showing the component in its basic form
export const Default = Template.bind({});
Default.args = {
  label: 'Select an option',
  modelValue: 'Option 1',
  children: 'Click to select',
  onSelect: () => console.log('Option selected!'),
};

// Story showing a button with a hint and custom tooltip
export const WithHintAndTooltip = Template.bind({});
WithHintAndTooltip.args = {
  label: 'Choose an item',
  hint: 'Select one of the available options',
  tooltip: 'Click to view the dropdown options',
  children: 'Dropdown Button',
  onSelect: () => console.log('Item selected!'),
};

// Story showing a disabled button
export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Select',
  modelValue: 'Disabled option',
  disabled: true,
  children: 'Cannot select',
};
