import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { BaseMessage } from '../../components';
import '../../assets/css/main.scss';

export default {
  title: 'Components/BaseMessage',
  component: BaseMessage,
  argTypes: {
    level: {
      control: { type: 'select' },
      options: ['info', 'warning', 'warning-red'],
    },
  },
} as Meta;

const Template: StoryObj<React.ComponentProps<typeof BaseMessage>> = (args) => (
  <BaseMessage {...args} />
);

export const InfoMessage = Template.bind({});
InfoMessage.args = {
  level: 'info',
  children: 'This is an informational message.',
};

export const WarningMessage = Template.bind({});
WarningMessage.args = {
  level: 'warning',
  children: 'This is a warning message.',
};

export const WarningRedMessage = Template.bind({});
WarningRedMessage.args = {
  level: 'warning-red',
  children: 'This is a red warning message.',
};
