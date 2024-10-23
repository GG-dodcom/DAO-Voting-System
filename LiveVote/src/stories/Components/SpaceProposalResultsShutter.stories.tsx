// SpaceProposalResultsShutter.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { SpaceProposalResultsShutter } from '../../components';
import '../../assets/css/main.scss';

const meta: Meta<typeof SpaceProposalResultsShutter> = {
  title: 'Components/SpaceProposalResultsShutter',
  component: SpaceProposalResultsShutter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story demonstrating the default behavior of the shutter component
export const Default: Story = {};

// Story showcasing the tooltip feature
export const WithTooltip: Story = {
  decorators: [
    (Story) => (
      <div>
        <h3 className="mb-4">Hover over the icon to see the tooltip</h3>
        <Story />
      </div>
    ),
  ],
};

// Story showcasing the external link feature
export const WithExternalLink: Story = {
  decorators: [
    (Story) => (
      <div>
        <p className="mb-4">Click the shutter icon to open an external link.</p>
        <Story />
      </div>
    ),
  ],
};

export const Custom: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Proposal Results</h1>
      {/* Using the SpaceProposalResultsShutter component */}
      <SpaceProposalResultsShutter />
    </div>
  );
};
