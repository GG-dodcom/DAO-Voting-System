/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TheFlashNotification } from '../../components';
import '../../assets/css/main.scss';
import { useFlashNotification } from '../../context';

// Create a decorator to mock the useFlashNotification hook
const withMockedFlashNotification = (mockedHook: any) => (StoryFn: any) => {
  (useFlashNotification as any) = mockedHook; // Mocking the hook implementation
  return <StoryFn />;
};

// Mock hook for default notifications
const mockUseFlashNotification = () => ({
  items: [
    {
      id: '1',
      type: 'red',
      message: 'Error! Something went wrong.',
      remove: () => alert('Error notification removed'),
    },
    {
      id: '2',
      type: 'green',
      message: 'Success! Your operation was completed.',
      remove: () => alert('Success notification removed'),
    },
  ],
});

export default {
  title: 'Components/TheFlashNotification',
  component: TheFlashNotification,
  decorators: [withMockedFlashNotification(mockUseFlashNotification)],
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: StoryObj = () => {
  return <TheFlashNotification />;
};

export const Default = Template.bind({});

// Add a variation with no notifications
export const EmptyState = Template.bind({});
EmptyState.decorators = [
  withMockedFlashNotification(() => ({
    items: [], // No notifications
  })),
];
