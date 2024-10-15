import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ExploreProposal } from '../../components';
import '../../assets/css/main.scss';

// Mock translation hook
const mockTranslation = {
  t: (key: string, options?: any) => {
    const translations = {
      spaceCount: `Total: ${options?.count || 0} spaces`,
      members: `${options?.count || 0} members`,
      homeLoadmore: 'Load more',
    };
    return translations[key];
  },
};

// Mock performance data
const mockPerformances = [
  { id: '1', name: 'Performance 1', teamsCount: 10, avatar: null },
  { id: '2', name: 'Performance 2', teamsCount: 8, avatar: null },
  { id: '3', name: 'Performance 3', teamsCount: 12, avatar: null },
];

// Storybook configuration
export default {
  title: 'Components/ExploreProposal',
  component: ExploreProposal,
  decorators: [
    (Story) => (
      <div>
        {/* Mock Translation Provider */}
        <Story />
      </div>
    ),
  ],
} as Meta<typeof ExploreProposal>;

// Default Story with mock data
const Template: StoryObj<typeof ExploreProposal> = (args) => (
  <ExploreProposal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  loadPerformancesHome: () => {},
  performancesHome: mockPerformances,
  performancesHomeTotal: 3,
  loadingPerformancesHome: false,
  loadingMorePerformancesHome: false,
  enablePerformancesHomeScroll: false,
};

// Story with loading state
export const LoadingState = Template.bind({});
LoadingState.args = {
  loadPerformancesHome: () => {},
  performancesHome: [],
  performancesHomeTotal: 0,
  loadingPerformancesHome: true,
  loadingMorePerformancesHome: false,
  enablePerformancesHomeScroll: false,
};

// Story with no performances
export const NoPerformances = Template.bind({});
NoPerformances.args = {
  loadPerformancesHome: () => {},
  performancesHome: [],
  performancesHomeTotal: 0,
  loadingPerformancesHome: false,
  loadingMorePerformancesHome: false,
  enablePerformancesHomeScroll: false,
};

// Story with load more option
export const LoadMorePerformances = Template.bind({});
LoadMorePerformances.args = {
  loadPerformancesHome: () => {},
  performancesHome: mockPerformances,
  performancesHomeTotal: 20,
  loadingPerformancesHome: false,
  loadingMorePerformancesHome: false,
  enablePerformancesHomeScroll: true,
};
