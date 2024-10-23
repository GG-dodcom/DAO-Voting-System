/* eslint-disable react-hooks/rules-of-hooks */
// VoteModal.stories.tsx
import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ModalVote } from '../../components';
import '../../assets/css/main.scss';
import { Proposal } from '../../utils/interfaces';
import { FlashNotificationContainer } from '../../context/useFlashNotification';

const meta: Meta<typeof ModalVote> = {
  title: 'Components/ModalVote',
  component: ModalVote,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    open: { control: 'boolean' },
    proposal: { control: 'object' },
    selectedChoices: { control: 'number' },
    onClose: { action: 'onClose' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// A wrapper to include FlashNotificationProvider
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <FlashNotificationContainer>{children}</FlashNotificationContainer>;
};

// Default story showing the modal open with a sample proposal
export const Default: Story = {
  args: {
    open: true,
    proposal: {
      id: '1',
      title: 'Sample Proposal',
      choices: [
        { id: 'choice1', name: 'Option 1' },
        { id: 'choice2', name: 'Option 2' },
      ],
      symbol: 'TOKEN',
    } as Proposal,
    selectedChoices: 0,
  },
  decorators: [
    (Story) => (
      <Wrapper>
        <Story />
      </Wrapper>
    ),
  ], // Use the wrapper here
};

// Story showing the modal when voting power is 0
export const NoVotingPower: Story = {
  args: {
    open: true,
    proposal: {
      id: '2',
      title: 'No Voting Power Proposal',
      choices: [
        { id: 'choice1', name: 'Option A' },
        { id: 'choice2', name: 'Option B' },
      ],
      symbol: 'TOKEN',
    } as Proposal,
    selectedChoices: 0,
  },
  decorators: [
    (Story) => (
      <Wrapper>
        <Story />
      </Wrapper>
    ),
  ],
};

// Story with loading state for voting power
export const LoadingVotingPower: Story = {
  args: {
    open: true,
    proposal: {
      id: '3',
      title: 'Loading Voting Power Proposal',
      choices: [
        { id: 'choice1', name: 'Choice X' },
        { id: 'choice2', name: 'Choice Y' },
      ],
      symbol: 'TOKEN',
    } as Proposal,
    selectedChoices: 0,
  },
  // Simulating loading by overriding the render method
  render: (args) => {
    const [loading, setLoading] = useState(true);

    // Simulate a delay for loading voting power
    setTimeout(() => setLoading(false), 2000);

    return (
      <Wrapper>
        <ModalVote
          {...args}
          proposal={{ ...args.proposal, loading }}
          // Custom implementation for loading state
          selectedChoices={args.selectedChoices}
          onClose={() => console.log('Closed')}
        />
      </Wrapper>
    );
  },
};

// Interactive story allowing users to simulate voting
export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedChoice, setSelectedChoice] = useState(0);

    const proposal: Proposal = {
      id: '4',
      title: 'Interactive Voting Proposal',
      choices: [
        { id: 'choice1', name: 'Vote for Option 1' },
        { id: 'choice2', name: 'Vote for Option 2' },
      ],
      symbol: 'TOKEN',
    };

    return (
      <Wrapper>
        <>
          <button
            className="p-2 bg-blue-500 text-white rounded"
            onClick={() => setIsOpen(true)}
          >
            Open Vote Modal
          </button>
          <ModalVote
            open={isOpen}
            proposal={proposal}
            selectedChoices={selectedChoice}
            onClose={() => setIsOpen(false)}
          />
        </>
      </Wrapper>
    );
  },
};
