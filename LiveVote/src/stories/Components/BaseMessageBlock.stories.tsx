import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { BaseMessageBlock } from '../../components';
import '../../assets/css/main.scss';

export default {
  title: 'Components/BaseMessageBlock',
  component: BaseMessageBlock,
  parameters: {
    layout: 'centered', // Optional: Centers the component in the Storybook view
  },
  argTypes: {
    level: {
      control: {
        type: 'select',
        options: ['info', 'warning', 'warning-red'], // Dropdown for selecting level
      },
    },
    isResponsive: {
      control: {
        type: 'boolean', // Boolean switch for responsive behavior
      },
    },
    children: {
      control: {
        type: 'text', // Allows the user to input custom message content
      },
    },
  },
} as Meta;

// Default template for rendering the component
const Template: StoryObj = (args) => <BaseMessageBlock {...args} />;

// Default state of the component
export const Default = Template.bind({});
Default.args = {
  level: 'info',
  isResponsive: false,
  children: 'This is an info message.',
};

// Warning level variation
export const Warning = Template.bind({});
Warning.args = {
  level: 'warning',
  isResponsive: false,
  children: 'This is a warning message.',
};

// Warning-red level variation
export const WarningRed = Template.bind({});
WarningRed.args = {
  level: 'warning-red',
  isResponsive: false,
  children: 'This is a red warning message.',
};

// Responsive layout variation
export const ResponsiveLayout = Template.bind({});
ResponsiveLayout.args = {
  level: 'info',
  isResponsive: true,
  children: 'This message block has responsive behavior.',
};

export const Custom: React.FC = () => {
  return (
    <div>
      <BaseMessageBlock level="info" isResponsive={true}>
        This is an informational message.
      </BaseMessageBlock>
      <BaseMessageBlock level="warning-red">
        This is a red warning message.
      </BaseMessageBlock>
    </div>
  );
};
