import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { UiInput } from '../../components';
import '../../assets/css/main.scss';

export default {
  title: 'Components/UiInput',
  component: UiInput,
  argTypes: {
    error: {
      control: { type: 'text' },
    },
    number: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    maxlength: {
      control: { type: 'number' },
    },
    focusOnMount: {
      control: { type: 'boolean' },
    },
    readonly: {
      control: { type: 'boolean' },
    },
  },
} as Meta;

const Template: StoryObj<React.ComponentProps<typeof UiInput>> = (args) => (
  <UiInput {...args} />
);

export const DefaultInput = Template.bind({});
DefaultInput.args = {
  value: '',
  placeholder: 'Enter text',
  onChange: (value) => console.log('Input changed:', value),
  onBlur: () => console.log('Input blurred'),
  children: {
    label: 'Label:',
    info: <span>Info</span>,
  },
};

export const InputWithError = Template.bind({});
InputWithError.args = {
  value: '',
  placeholder: 'Enter text',
  error: 'This is an error message.',
  onChange: (value) => console.log('Input changed:', value),
  onBlur: () => console.log('Input blurred'),
  children: {
    label: 'Label:',
    info: <span>Info</span>,
  },
};

export const DisabledInput = Template.bind({});
DisabledInput.args = {
  value: '',
  placeholder: 'Enter text',
  disabled: true,
  onChange: (value) => console.log('Input changed:', value),
  onBlur: () => console.log('Input blurred'),
  children: {
    label: 'Label:',
    info: <span>Info</span>,
  },
};

export const InputWithQuickFix = Template.bind({});
InputWithQuickFix.args = {
  value: '',
  placeholder: 'Enter text',
  error: 'Fixable error',
  quickFix: () => console.log('Quick fix applied'),
  onChange: (value) => console.log('Input changed:', value),
  onBlur: () => console.log('Input blurred'),
  children: {
    label: 'Label:',
    info: <span>Info</span>,
  },
};

export const NumberInput = Template.bind({});
NumberInput.args = {
  value: 0,
  placeholder: 'Enter number',
  number: true,
  onChange: (value) => console.log('Input changed:', value),
  onBlur: () => console.log('Input blurred'),
  children: {
    label: 'Label:',
    info: <span>Info</span>,
  },
};

export const Custom: React.FC = () => {
  const [inputValue, setInputValue] = useState<string | number>('');
  const [inputError, setInputError] = useState<string | boolean>(false);

  const handleInputChange = (value: string | number | undefined) => {
    setInputValue(value || '');

    // Basic validation example
    if (typeof value === 'string' && value.length < 3) {
      setInputError('Input must be at least 3 characters');
    } else {
      setInputError(false);
    }
  };

  const handleInputBlur = () => {
    console.log('Input blurred');
  };

  const quickFix = () => {
    setInputValue('QuickFixValue');
    setInputError(false);
  };

  return (
    <div className="App">
      <h1 className="text-2xl font-bold mb-4">Custom Input Example</h1>
      <UiInput
        value={inputValue}
        placeholder="Enter text..."
        error={inputError}
        number={false} // Change to true if you want to allow numbers only
        maxlength={50}
        focusOnMount={true} // Auto-focus input on mount
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        quickFix={quickFix} // Enable Quick Fix
      >
        {{
          label: <span>Label: </span>,
          info: <span>Info Text</span>,
        }}
      </UiInput>
    </div>
  );
};
