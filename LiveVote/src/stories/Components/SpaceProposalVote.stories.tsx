// SpaceProposalVote.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { SpaceProposalVote } from '../../components';
import '../../assets/css/main.scss';
import { Choice, Proposal } from '../../utils/interfaces';

const sampleProposal: Proposal = {
  id: '1',
  title: 'Sample Proposal',
  state: 'active',
  scores_state: 'active',
  voting: {
    type: 'single-choice',
  },
  choices: [
    { id: '0', name: 'Choice 1' },
    { id: '1', name: 'Choice 2' },
    { id: '2', name: 'Choice 3' },
  ],
};

const defaultChoice: Choice = { i: 0, name: 'Choice 1' };

const meta: Meta<typeof SpaceProposalVote> = {
  title: 'Components/SpaceProposalVote',
  component: SpaceProposalVote,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    proposal: { control: 'object' },
    modelValue: { control: 'object' },
    onUpdateModelValue: { action: 'onUpdateModelValue' },
    onClickVote: { action: 'onClickVote' },
  },
  args: {
    proposal: sampleProposal,
    modelValue: defaultChoice,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story demonstrating all features
export const Default: Story = {};

// Story where the user is editing their vote
export const EditingVote: Story = {
  args: {
    modelValue: { i: 1, name: 'Choice 2' },
  },
};

// Story where the user has not voted yet
export const NotVotedYet: Story = {
  args: {
    modelValue: null,
  },
};

// Story where the voting is locked
export const LockedVoting: Story = {
  args: {
    proposal: {
      ...sampleProposal,
      state: 'locked',
      scores_state: 'final',
    },
  },
};
