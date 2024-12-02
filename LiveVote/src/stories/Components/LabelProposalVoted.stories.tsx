import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { LabelProposalVoted } from '../../components'; // Adjust the path if necessary
import '../../assets/css/main.scss';

// Define meta information for Storybook
const meta: Meta<typeof LabelProposalVoted> = {
  title: 'Components/LabelProposalVoted',
  component: LabelProposalVoted,
};

export default meta;
type Story = StoryObj<typeof meta>;

// Template for rendering the component
const Template: Story = () => <LabelProposalVoted />;

// Default story showing the label proposal voted
export const Default = Template.bind({});
Default.args = {};
