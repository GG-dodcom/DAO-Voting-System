import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TuneBlockHeader } from '../../../components';
import '../../../assets/css/main.scss';

// Storybook configuration
export default {
  title: 'Components/Tune/TuneBlockHeader',
  component: TuneBlockHeader,
  argTypes: {
    title: { control: 'text' },
    subTitle: { control: 'text' },
    counter: { control: 'number' },
    information: { control: 'text' },
    children: { control: 'none' }, // This will allow you to add custom elements in the story
  },
} as Meta<typeof TuneBlockHeader>;

// Default story
const Template: StoryObj<typeof TuneBlockHeader> = (args) => (
  <TuneBlockHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Tune Block Title',
  subTitle: 'This is a subtitle for the tune block.',
  counter: 5,
  information: 'This is some helpful information.',
};

// Story with custom children
export const WithCustomChildren = Template.bind({});
WithCustomChildren.args = {
  title: 'Custom Header',
  subTitle: 'This block has custom children.',
  counter: 10,
  children: <div className="bg-gray-200 p-2">Custom Child Content</div>, // Example of custom content
};

// Story with no subtitle
export const WithoutSubtitle = Template.bind({});
WithoutSubtitle.args = {
  title: 'Header Without Subtitle',
  counter: 3,
  information: 'Information related to this header.',
};

// Story with only the title and counter
export const OnlyTitleAndCounter = Template.bind({});
OnlyTitleAndCounter.args = {
  title: 'Title Only',
  counter: 0,
  information: 'Information will be displayed here.',
};

// Story with tooltip information
export const WithTooltipInformation = Template.bind({});
WithTooltipInformation.args = {
  title: 'Header with Tooltip',
  subTitle: 'Hover for more info',
  counter: 2,
  information: 'This is tooltip information that provides more context.',
};
