import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ProposalsItemBody } from '../../components';
import '../../assets/css/main.scss';

// Define the meta information for Storybook
const meta: Meta = {
  title: 'Components/ProposalsItemBody',
  component: ProposalsItemBody,
  argTypes: {
    children: { control: 'text' }, // Allow changing the children text in Storybook
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story<{ children: React.ReactNode }> = (args) => (
  <ProposalsItemBody {...args} />
);

// Default story - showing normal text
export const Default = Template.bind({});
Default.args = {
  children: 'This is a sample proposal item body text.',
};

// Story with longer text to demonstrate line clamping
export const LongText = Template.bind({});
LongText.args = {
  children:
    'This is a sample proposal item body text that is deliberately made longer to demonstrate the line clamping feature of the ProposalsItemBody component. It will be truncated after two lines.',
};

// Story with short text
export const ShortText = Template.bind({});
ShortText.args = {
  children: 'Short text.',
};
