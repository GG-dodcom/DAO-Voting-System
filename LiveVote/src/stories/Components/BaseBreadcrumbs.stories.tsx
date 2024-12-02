// BaseBreadcrumbs.stories.tsx

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { BaseBreadcrumbs } from '../../components';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import '../../assets/css/main.scss';

const mockPages = [
  { id: '1', name: 'Home', to: '/', current: false },
  { id: '2', name: 'About', to: '/about', current: false },
  { id: '3', name: 'Services', to: '/services', current: false },
  { id: '4', name: 'Contact', to: '/contact', current: true },
];

// Storybook configuration
export default {
  title: 'Components/BaseBreadcrumbs',
  component: BaseBreadcrumbs,
} as Meta<typeof BaseBreadcrumbs>;

// Wrapper for stories to provide routing context
const RouterDecorator = (Story: any) => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
);

// Default story with multiple pages
const Template: StoryObj<typeof BaseBreadcrumbs> = (args) => (
  <BaseBreadcrumbs {...args} />
);

export const Default = Template.bind({});
Default.args = {
  pages: mockPages,
};
Default.decorators = [RouterDecorator]; // Add the decorator

// Story with no pages
export const Empty = Template.bind({});
Empty.args = {
  pages: [],
};
Empty.decorators = [RouterDecorator]; // Add the decorator

// Story with a single page as current
export const SinglePageCurrent = Template.bind({});
SinglePageCurrent.args = {
  pages: [{ id: '1', name: 'Home', to: '/', current: true }],
};
SinglePageCurrent.decorators = [RouterDecorator]; // Add the decorator

// Story with multiple pages and the last one as current
export const MultiplePagesCurrentLast = Template.bind({});
MultiplePagesCurrentLast.args = {
  pages: [
    { id: '1', name: 'Home', to: '/', current: false },
    { id: '2', name: 'Services', to: '/services', current: false },
    { id: '3', name: 'Contact', to: '/contact', current: true },
  ],
};
MultiplePagesCurrentLast.decorators = [RouterDecorator]; // Add the decorator
