import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ProposalsItemResults } from '../../components'; // Adjust the import path if necessary

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

// Mock data for proposal
const mockProposal: Proposal = {
  id: '1',
  title: 'Sample Proposal',
  description: 'This is a description of the sample proposal.',
  choices: [{ name: 'Option A' }, { name: 'Option B' }, { name: 'Option C' }],
  scores: [3000, 5000, 2000],
  scores_total: 10000,
  symbol: ' VOTE',
};

// Define meta information for Storybook
const meta: Meta<typeof ProposalsItemResults> = {
  title: 'Components/ProposalsItemResults',
  component: ProposalsItemResults,
  argTypes: {
    proposal: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story<{ proposal: Proposal }> = (args) => (
  <ProposalsItemResults {...args} />
);

// Default story showing a standard proposal with choices
export const Default = Template.bind({});
Default.args = {
  proposal: mockProposal,
};

// Story with a single choice
export const SingleChoice = Template.bind({});
SingleChoice.args = {
  proposal: {
    ...mockProposal,
    choices: [{ name: 'Only Choice' }],
    scores: [10000],
    scores_total: 10000,
  },
};

// Story with multiple choices and a winner
export const MultipleChoicesWithWinner = Template.bind({});
MultipleChoicesWithWinner.args = {
  proposal: {
    ...mockProposal,
    choices: [
      { name: 'Choice 1' },
      { name: 'Choice 2' },
      { name: 'Choice 3' },
      { name: 'Choice 4' },
    ],
    scores: [1500, 2500, 1000, 5000],
    scores_total: 10000,
  },
};

// Story with no description (demonstrating how the component handles empty descriptions)
export const NoDescription = Template.bind({});
NoDescription.args = {
  proposal: {
    ...mockProposal,
    description: '',
  },
};
