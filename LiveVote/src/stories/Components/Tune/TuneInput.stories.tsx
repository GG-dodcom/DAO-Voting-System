import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TuneInput } from '../../../components';
import '../../../assets/css/main.scss';

// Define meta information for Storybook
const meta: Meta<typeof TuneInput> = {
  title: 'Components/Tune/TuneInput',
  component: TuneInput,
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    loading: { control: 'boolean' },
    error: { control: 'text' },
    block: { control: 'boolean' },
    type: { control: { type: 'select', options: ['text', 'number'] } },
    modelValue: { control: 'text' },
    autofocus: { control: 'boolean' },
    placeholder: { control: 'text' },
    maxLength: { control: 'number' },
    readOnly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    alwaysShowError: { control: 'boolean' },
    onUpdateModelValue: { action: 'updated' },
    before: { control: 'text' },
    after: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Template for rendering the component
const Template: Story<Props> = (args) => <TuneInput {...args} />;

// Default story with standard input configuration
export const Default = Template.bind({});
Default.args = {
  label: 'Input Label',
  hint: 'This is a hint for the input.',
  modelValue: '',
  placeholder: 'Enter text...',
  before: <span>$</span>, // Example of before element
  after: <span>kg</span>, // Example of after element
};

// Story showing loading state
export const Loading = Template.bind({});
Loading.args = {
  label: 'Loading Input',
  loading: true,
  modelValue: '',
  placeholder: 'Loading...',
};

// Story showing an error state
export const ErrorState = Template.bind({});
ErrorState.args = {
  label: 'Error Input',
  error: 'This field is required.',
  modelValue: '',
  placeholder: 'Enter something...',
};

// Story showing a disabled input
export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Input',
  disabled: true,
  modelValue: 'Cannot edit this',
  placeholder: 'Disabled input',
};

// Story showing a read-only input
export const ReadOnly = Template.bind({});
ReadOnly.args = {
  label: 'Read-Only Input',
  readOnly: true,
  modelValue: 'This is read-only',
  placeholder: 'Read only input',
};

// Story showing an input with a maximum length
export const MaxLength = Template.bind({});
MaxLength.args = {
  label: 'Max Length Input',
  maxLength: 10,
  modelValue: '',
  placeholder: 'Max 10 characters',
};

// Story showing an input with autofocus
export const AutoFocus = Template.bind({});
AutoFocus.args = {
  label: 'Autofocus Input',
  autofocus: true,
  modelValue: '',
  placeholder: 'This will autofocus on load',
};
