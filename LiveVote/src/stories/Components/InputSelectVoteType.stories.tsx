import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { InputSelectVoteType } from '../../components/';
import '../../assets/css/main.scss';

// Meta information for Storybook
const meta: Meta<typeof InputSelectVoteType> = {
  title: 'Components/InputSelectVoteType',
  component: InputSelectVoteType,
  argTypes: {
    type: { control: 'text' },
    hint: { control: 'text' },
    allowAny: { control: 'boolean' },
    disabled: { control: 'boolean' },
    isDisabledSettings: { control: 'boolean' },
    onChangeType: { action: 'onChangeType' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Template for rendering the component
const Template: Story<typeof InputSelectVoteType> = (args) => (
  <InputSelectVoteType {...args} />
);

// Default story
export const Default = Template.bind({});
Default.args = {
  type: 'single-choice',
  hint: 'Select the voting type',
  allowAny: false,
  disabled: false,
  isDisabledSettings: false,
};

// Disabled settings story
export const DisabledSettings = Template.bind({});
DisabledSettings.args = {
  type: 'approval',
  hint: 'This setting is disabled',
  allowAny: false,
  disabled: false,
  isDisabledSettings: true,
};

// No Type Selected story
export const NoTypeSelected = Template.bind({});
NoTypeSelected.args = {
  type: '',
  hint: 'No voting type selected',
  allowAny: true,
  disabled: false,
  isDisabledSettings: false,
};

// Disabled story
export const Disabled = Template.bind({});
Disabled.args = {
  type: 'ranked-choice',
  hint: 'This input is disabled',
  allowAny: false,
  disabled: true,
  isDisabledSettings: false,
};
