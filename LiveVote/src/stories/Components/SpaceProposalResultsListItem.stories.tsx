// SpaceProposalResultsListItem.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { SpaceProposalResultsListItem } from '../../components';
import '../../assets/css/main.scss';
import { Proposal } from '../../utils/interfaces';

const proposal: Proposal = {
  id: '1',
  body: 'Sample Proposal',
  symbol: 'VOTE',
  scores_state: 'final', // Use 'final' or other states to test locking behavior
};

const results: Results = {
  scores: [100, 200, 300],
  scoresTotal: 600,
};

const choice = { i: 1, choice: 'Option 1' };

const meta: Meta<typeof SpaceProposalResultsListItem> = {
  title: 'Components/SpaceProposalResultsListItem',
  component: SpaceProposalResultsListItem,
  parameters: {
    layout: 'centered',
  },
  decorators: [(Story) => <div className="max-w-md">{Story()}</div>],
  tags: ['autodocs'],
  args: {
    choice,
    proposal,
    results,
  },
  argTypes: {
    proposal: { control: 'object' },
    results: { control: 'object' },
    choice: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story demonstrating all features
export const Default: Story = {};

// Story with a truncated choice text to showcase tooltip
export const TruncatedText: Story = {
  args: {
    choice: {
      i: 1,
      choice: 'This is a very long choice text that will be truncated',
    },
  },
};

// Story with scores in progress (locking state)
export const LockedState: Story = {
  args: {
    proposal: { ...proposal, scores_state: 'non-final' }, // Modify scores_state to showcase locking
  },
};

// Story with maximum values
export const MaximumScores: Story = {
  args: {
    results: {
      scores: [500, 400, 1000],
      scoresTotal: 1000,
    },
  },
};
