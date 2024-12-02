import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { BaseButtonRound } from '../../components';
import '../../assets/css/main.scss';

export default {
  title: 'Components/BaseButtonRound',
  component: BaseButtonRound,
  argTypes: {
    isDisabled: {
      control: { type: 'boolean' },
      description: 'Disables the button when true',
    },
    size: {
      control: { type: 'text' },
      description: 'Sets the size of the button (width and height)',
    },
    children: {
      control: { type: 'text' },
      description: 'The content to be displayed inside the button',
    },
  },
} as Meta;

const Template: StoryObj<React.ComponentProps<typeof BaseButtonRound>> = (
  args
) => <BaseButtonRound {...args} />;

export const DefaultButton = Template.bind({});
DefaultButton.args = {
  children: 'Click',
  size: '46px',
};

export const DisabledButton = Template.bind({});
DisabledButton.args = {
  children: 'Disabled',
  isDisabled: true,
  size: '46px',
};

export const LargeButton = Template.bind({});
LargeButton.args = {
  children: 'Large',
  size: '100px',
};

export const SmallButton = Template.bind({});
SmallButton.args = {
  children: 'Small',
  size: '30px',
};
