import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ProposalsItemTitle } from '../../components';
import '../../assets/css/main.scss';

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
  title: 'Sample Proposal Title',
  avatar: 'https://example.com/avatar.jpg',
  description: 'This is a description of the sample proposal.',
  start: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
  end: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
  create: Math.floor(Date.now() / 1000) - 7200, // 2 hours ago
  votes_num: 10,
  state: 'active', // This can be 'pending', 'active', or 'closed'
  choices: [{ name: 'Option A' }, { name: 'Option B' }],
  scores: [3000, 5000],
  scores_total: 8000,
  symbol: 'XYZ',
  votes: 5,
  teamsCount: 2,
};

// Define meta information for Storybook
const meta: Meta<typeof ProposalsItemTitle> = {
  title: 'Components/ProposalsItemTitle',
  component: ProposalsItemTitle,
  argTypes: {
    proposal: { control: 'object' },
    voted: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Template for rendering the component
const Template: Story<{ proposal: Proposal; voted: boolean }> = (args) => (
  <ProposalsItemTitle {...args} />
);

// Default story showing a proposal title without the voted label
export const Default = Template.bind({});
Default.args = {
  proposal: mockProposal,
  voted: false,
};

// Story showing a proposal title with the voted label
export const Voted = Template.bind({});
Voted.args = {
  proposal: mockProposal,
  voted: true,
};
