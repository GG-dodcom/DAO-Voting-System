// SpaceProposalContent.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { SpaceProposalContent } from '../../components';
import '../../assets/css/main.scss';
import { Proposal } from '../../utils/interfaces';

const meta: Meta<typeof SpaceProposalContent> = {
  title: 'Components/SpaceProposalContent',
  component: SpaceProposalContent,
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample proposal content with a short and long body
const shortProposal: Proposal = {
  title: 'Short Proposal',
  body: 'This is a short proposal body.',
};

const longProposal: Proposal = {
  title: 'Long Proposal',
  body: `
  # Long Proposal Body
  This is a very long markdown body that should trigger the "View more" / "View less" functionality.
  
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac efficitur nibh. Integer pretium nisi ac sem hendrerit, ut faucibus sapien egestas. Suspendisse auctor metus eu mi viverra, ac feugiat risus lacinia. Curabitur vehicula leo sed efficitur tempus. Etiam facilisis enim ut est tempus feugiat. Sed et varius neque. Praesent eget eros in turpis efficitur cursus et id nisi. Cras nec lorem eros. Curabitur euismod bibendum libero in interdum. Quisque ut mauris eu risus ornare feugiat. Morbi commodo volutpat nunc, sed porttitor risus. In condimentum purus sit amet mauris laoreet, sit amet iaculis enim dapibus.
  
  Morbi eu eros non ipsum fermentum pulvinar. Nam vel vehicula metus. Donec id mauris eget quam venenatis fermentum ac sit amet mauris. Fusce eu nisl lacus. Praesent sed vehicula sem, a pretium lacus. Suspendisse tempor dapibus quam, eu scelerisque sem malesuada a. Nulla facilisi. In id laoreet nisi. Phasellus condimentum ac nunc a viverra. Vestibulum vehicula augue vel orci vulputate facilisis.
  
  Duis sed libero venenatis, finibus ipsum non, faucibus odio. Ut sit amet lectus erat. Etiam consectetur efficitur libero, sit amet fermentum lorem suscipit at. Integer pellentesque leo sit amet facilisis gravida. Phasellus pretium dapibus odio nec fringilla. Nam varius, dui ac rutrum vehicula, nisl arcu tincidunt elit, et dignissim metus lacus id ante. Mauris facilisis turpis non gravida sodales. Etiam fringilla ipsum ac lacus viverra, ac pharetra turpis placerat.
  
  Pellentesque viverra turpis sed tellus fermentum faucibus. In congue pharetra nisi, id congue justo dictum sed. Aliquam erat volutpat. Proin elementum metus at enim scelerisque vehicula. Sed laoreet justo nec elit efficitur ultricies. Sed sit amet sapien in justo sollicitudin luctus et id felis.
  `.repeat(5), // Repeated multiple times to create a long body
};

// Template function for SpaceProposalContent stories
const Template: Story = (args) => <SpaceProposalContent {...args} />;

// Default story with a short proposal body
export const ShortProposal = Template.bind({});
ShortProposal.args = {
  proposal: shortProposal,
};

// Story with a long proposal body
export const LongProposal = Template.bind({});
LongProposal.args = {
  proposal: longProposal,
};

// Story to showcase truncating and expanding long content
export const TruncatedLongProposal = Template.bind({});
TruncatedLongProposal.args = {
  proposal: longProposal,
};

// Additional story for custom behavior (if any needed)
export const CustomBehavior = Template.bind({});
CustomBehavior.args = {
  proposal: longProposal,
};
