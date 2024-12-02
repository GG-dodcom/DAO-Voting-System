import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { SpaceProposalVoteSingleChoice } from '../../components';
import '../../assets/css/main.scss';
import { Proposal } from '../../utils/interfaces';

// Mock data for proposals
const mockProposal: Proposal = {
  id: '1',
  title: 'Proposal for Art Exhibition',
  body: 'This proposal outlines the details for the upcoming art exhibition, which aims to showcase local artists.',
  avatar: 'image/2.jpg',
  choices: [
    {
      id: 'choice1',
      name: 'Artist A',
      avatar: 'image/1.jpg',
    },
    {
      id: 'choice2',
      name: 'Artist B',
      avatar: 'image/2.jpg',
    },
    {
      id: 'choice3',
      name: 'Artist C',
      avatar: 'image/2.jpg',
    },
  ],
  symbol: 'ART',
  state: 'active',
  voting: {
    start: 1696935680000,
    end: 1697540480000,
    type: 'single-choice',
    votes_num: 100,
  },
  create: 1696935680000,
  scores: [50, 30, 20],
  scores_state: 'final',
  scores_total: 100,
};

const handleSelectChoice = (choice: number | null) => {
  console.log('Selected choice:', choice);
};

// Storybook configuration
export default {
  title: 'Components/SpaceProposalVoteSingleChoice',
  component: SpaceProposalVoteSingleChoice,
  argTypes: {
    proposal: { control: 'object' },
    userChoice: { control: 'number' },
    isEditing: { control: 'boolean' },
    onSelectChoice: { action: 'selectedChoice' }, // Action to log choice selection
  },
} as Meta<typeof SpaceProposalVoteSingleChoice>;

// Default story
const Template: StoryObj<typeof SpaceProposalVoteSingleChoice> = (args) => (
  <SpaceProposalVoteSingleChoice {...args} />
);

export const Default = Template.bind({});
Default.args = {
  proposal: mockProposal,
  userChoice: null,
  isEditing: false,
  onSelectChoice: handleSelectChoice,
};

// Story with a user choice selected
export const WithUserChoice = Template.bind({});
WithUserChoice.args = {
  proposal: mockProposal,
  userChoice: 1, // Assuming 1 is the index for 'Choice 1'
  isEditing: false,
  onSelectChoice: handleSelectChoice,
};

// Story in editing mode
export const EditingMode = Template.bind({});
EditingMode.args = {
  proposal: mockProposal,
  userChoice: null,
  isEditing: true,
  onSelectChoice: handleSelectChoice,
};

// Story with user choice and editing mode
export const EditingWithUserChoice = Template.bind({});
EditingWithUserChoice.args = {
  proposal: mockProposal,
  userChoice: 2, // Assuming 2 is the index for 'Choice 2'
  isEditing: true,
  onSelectChoice: handleSelectChoice,
};
