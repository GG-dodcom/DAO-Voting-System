// SpaceProposalResultsProgressBar.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import {
  SpaceProposalResultsProgressBar,
  SpaceProposalVoteSingleChoice,
} from '../../components';
import '../../assets/css/main.scss';
import { useState } from 'react';

const meta: Meta<typeof SpaceProposalResultsProgressBar> = {
  title: 'Components/SpaceProposalResultsProgressBar',
  component: SpaceProposalResultsProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'object' }, // Use 'object' for arrays or objects
    max: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story for a single progress bar
export const SingleProgressBar: Story = {
  args: {
    value: 40, // Example: 40% of the max value
    max: 100,
  },
};

// Story for multiple progress bars
export const MultipleProgressBars: Story = {
  args: {
    value: [40, 30, 20], // Example: multiple bars with different values
    max: 100,
  },
};

// Story with a different max value
export const CustomMaxValue: Story = {
  args: {
    value: [70, 50, 30],
    max: 150, // Adjust the max value for more flexibility
  },
};

// Story demonstrating how the component handles zero values
export const ZeroValue: Story = {
  args: {
    value: [0, 30, 60], // Including a zero value to demonstrate filtering
    max: 100,
  },
};

// Story with all progress bars filled
export const FullProgressBars: Story = {
  args: {
    value: [100, 80, 60, 40, 20], // All progress bars filled to various degrees
    max: 100,
  },
};

export const Custom: React.FC = () => {
  // Sample proposal data
  const proposal = {
    id: '1',
    title: 'Proposal for Art Exhibition',
    body: 'This is a detailed proposal for the upcoming art exhibition.',
    avatar: 'blob:https://ibb.co/ZK6MHBm',
    choices: [
      { id: 'choice1', name: 'Artist A', avatar: 'image/2.jpg' },
      { id: 'choice2', name: 'Artist B', avatar: 'image/1.jpg' },
      { id: 'choice3', name: 'Artist C', avatar: 'image/3.jpg' },
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

  // State for user selection and editing mode
  const [userChoice, setUserChoice] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(true);

  // Handler when the user selects a choice
  const handleSelectChoice = (choice: number | null) => {
    setUserChoice(choice);
  };

  return (
    <div>
      <h1 className="text-center text-2xl mb-4">{proposal.title}</h1>

      {/* Voting component */}
      <SpaceProposalVoteSingleChoice
        proposal={proposal}
        userChoice={userChoice}
        isEditing={isEditing}
        onSelectChoice={handleSelectChoice}
      />

      {/* Progress bar showing voting results */}
      <div className="mt-8">
        <h2 className="text-center mb-4">Voting Results</h2>
        <SpaceProposalResultsProgressBar value={proposal.scores} max={100} />
      </div>
    </div>
  );
};
