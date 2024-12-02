import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ProposalsItemFooter } from '../../components';
import { useIntl } from '../../hooks/useIntl';
import { Proposal } from '../../utils/interfaces';

interface Proposal {
  //Performances
  id: string; //PK, UUID
  title: string;
  avatar: string;
  description: string;
  start: number;
  end: number;
  create: number; //the spaces will show new to old
  votes_num: number; //for create how many QR
  state: string;
  choices: Teams[]; //teams
  scores: number[];
  scores_total: number;
  symbol: string;
  votes: number;
  teamsCount: number;
}

interface Teams {
  name: string;
}

// Mock data for a proposal
const mockProposal: Proposal = {
  id: '1',
  title: 'Sample Proposal',
  description: 'This is a description of the sample proposal.',
  choices: [{ name: 'Option A' }, { name: 'Option B' }],
  scores: [3000, 5000],
  scores_total: 8000,
  state: 'active', // This can be 'pending', 'active', or 'closed'
  start: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
  end: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
};

// Define meta information for Storybook
const meta: Meta<typeof ProposalsItemFooter> = {
  title: 'Components/ProposalsItemFooter',
  component: ProposalsItemFooter,
  argTypes: {
    proposal: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story<{ proposal: Proposal }> = (args) => {
  const intl = useIntl(); // Using the custom useIntl hook here

  return <ProposalsItemFooter {...args} />;
};

// Default story showing a standard proposal footer
export const Default = Template.bind({});
Default.args = {
  proposal: mockProposal,
};

// Pending proposal story
export const PendingProposal = Template.bind({});
PendingProposal.args = {
  proposal: {
    ...mockProposal,
    state: 'pending',
    start: Math.floor(Date.now() / 1000) + 3600, // Starts 1 hour from now
    end: Math.floor(Date.now() / 1000) + 7200, // Ends 2 hours from now
  },
};

// Active proposal story
export const ActiveProposal = Template.bind({});
ActiveProposal.args = {
  proposal: {
    ...mockProposal,
    state: 'active',
    start: Math.floor(Date.now() / 1000) - 1800, // Started 30 mins ago
    end: Math.floor(Date.now() / 1000) + 5400, // Ends in 1.5 hours
  },
};

// Closed proposal story
export const ClosedProposal = Template.bind({});
ClosedProposal.args = {
  proposal: {
    ...mockProposal,
    state: 'closed',
    start: Math.floor(Date.now() / 1000) - 7200, // Started 2 hours ago
    end: Math.floor(Date.now() / 1000) - 3600, // Ended 1 hour ago
  },
};
