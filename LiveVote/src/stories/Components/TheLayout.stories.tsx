import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TheLayout } from '../../components';
import '../../assets/css/main.scss';

// Define meta information for Storybook
const meta: Meta<typeof TheLayout> = {
  title: 'Components/TheLayout',
  component: TheLayout,
  argTypes: {
    slim: {
      control: 'boolean',
    },
    reverse: {
      control: 'boolean',
    },
    sidebarLeft: { control: 'text' },
    contentLeft: { control: 'text' },
    contentRight: { control: 'text' },
    sidebarRight: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Template for rendering the component
const Template: Story<{
  slim: boolean;
  reverse: boolean;
  sidebarLeft: React.ReactNode;
  contentLeft: React.ReactNode;
  contentRight: React.ReactNode;
  sidebarRight: React.ReactNode;
}> = (args) => <TheLayout {...args}>{args.children}</TheLayout>;

// Default story with basic layout configuration
export const Default = Template.bind({});
Default.args = {
  slim: true,
  reverse: false,
  sidebarLeft: <div className="p-4 bg-gray-200">Sidebar Left</div>,
  contentLeft: <div className="p-4 bg-blue-200">Content Left</div>,
  contentRight: <div className="p-4 bg-green-200">Content Right</div>,
  sidebarRight: <div className="p-4 bg-red-200">Sidebar Right</div>,
  children: <div className="p-4 bg-yellow-200">Main Content</div>,
};

// Story showing a slim layout with reversed content
export const SlimReversed = Template.bind({});
SlimReversed.args = {
  slim: true,
  reverse: true,
  sidebarLeft: <div className="p-4 bg-gray-200">Sidebar Left</div>,
  contentLeft: <div className="p-4 bg-blue-200">Content Left</div>,
  contentRight: <div className="p-4 bg-green-200">Content Right</div>,
  sidebarRight: <div className="p-4 bg-red-200">Sidebar Right</div>,
  children: <div className="p-4 bg-yellow-200">Main Content</div>,
};

// Story showing a non-slim layout
export const FullWidth = Template.bind({});
FullWidth.args = {
  slim: false,
  reverse: false,
  sidebarLeft: <div className="p-4 bg-gray-200">Sidebar Left</div>,
  contentLeft: <div className="p-4 bg-blue-200">Content Left</div>,
  contentRight: <div className="p-4 bg-green-200">Content Right</div>,
  sidebarRight: <div className="p-4 bg-red-200">Sidebar Right</div>,
  children: <div className="p-4 bg-yellow-200">Main Content</div>,
};
