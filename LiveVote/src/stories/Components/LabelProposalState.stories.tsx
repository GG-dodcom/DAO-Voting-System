import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { LabelProposalState } from '../../components';
import '../../assets/css/main.scss';

// Define meta information for Storybook
const meta: Meta<typeof LabelProposalState> = {
  title: 'Components/LabelProposalState',
  component: LabelProposalState,
  argTypes: {
    state: {
      control: {
        type: 'select',
        options: ['active', 'closed', 'pending'], // Include all possible states
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Template for rendering the component
const Template: Story<{ state: string }> = (args) => (
  <LabelProposalState {...args} />
);

// Default story showing the label with an 'active' state
export const Active = Template.bind({});
Active.args = {
  state: 'active',
};

// Story showing the label with a 'closed' state
export const Closed = Template.bind({});
Closed.args = {
  state: 'closed',
};

// Story showing the label with a 'pending' state
export const Pending = Template.bind({});
Pending.args = {
  state: 'pending',
};
