// ProposalsItem.stories.tsx

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ProposalsItem } from '../../components';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import '../../assets/css/main.scss';
import { Proposal } from '../../utils/interfaces';

const mockProposal: Proposal = {
  id: '1',
  title: 'Proposal for Art Exhibition',
  body: 'This proposal outlines the details for the upcoming art exhibition, which aims to showcase local artists.',
  avatar: 'https://ibb.co/ZK6MHBm',
  choices: [
    { id: 'choice1', name: 'Artist A', avatar: null },
    { id: 'choice2', name: 'Artist B', avatar: null },
    { id: 'choice3', name: 'Artist C', avatar: null },
  ],
  symbol: 'ART',
  state: 'active',
  voting: {
    start: Date.now(),
    end: Date.now() + 7 * 24 * 60 * 60 * 1000, // one week later
    type: 'single-choice',
    votes_num: 100,
  },
  create: Date.now(),
  scores: [50, 30, 20],
  scores_state: 'final',
  scores_total: 100,
};

// Storybook configuration
export default {
  title: 'Components/ProposalsItem',
  component: ProposalsItem,
  argTypes: {
    to: { control: 'object' },
    voted: { control: 'boolean' },
    hideSpaceAvatar: { control: 'boolean' },
  },
} as Meta<typeof ProposalsItem>;

// Template with Router
const Template: StoryObj<typeof ProposalsItem> = (args) => (
  <Router>
    <ProposalsItem {...args} />
  </Router>
);

export const Default = Template.bind({});
Default.args = {
  proposal: mockProposal,
  voted: false,
  to: { pathname: '/some-path' },
  hideSpaceAvatar: false,
};

// Voted story
export const Voted = Template.bind({});
Voted.args = {
  proposal: mockProposal,
  voted: true,
  to: { pathname: '/some-path' },
  hideSpaceAvatar: false,
};

// Warning message story
export const WarningMessage = Template.bind({});
WarningMessage.args = {
  proposal: { ...mockProposal, id: '2' }, // Different ID for warning message
  voted: false,
  to: { pathname: '/some-path' },
  hideSpaceAvatar: false,
};

// Hide avatar story
export const HideAvatar = Template.bind({});
HideAvatar.args = {
  proposal: mockProposal,
  voted: false,
  to: { pathname: '/some-path' },
  hideSpaceAvatar: true,
};

// Custom story
export const Custom: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <ProposalsItem
          proposal={mockProposal}
          voted={false}
          to={{ pathname: `/proposal/${mockProposal.id}` }}
          hideSpaceAvatar={false}
        />
      </Router>
    </div>
  );
};
