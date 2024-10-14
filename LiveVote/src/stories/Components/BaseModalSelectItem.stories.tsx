import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { BaseModalSelectItem } from '../../components';
import '../../assets/css/main.scss';

// Define meta information for Storybook
const meta: Meta<typeof BaseModalSelectItem> = {
  title: 'Components/BaseModalSelectItem',
  component: BaseModalSelectItem,
  argTypes: {
    selected: { control: 'boolean' },
    title: { control: 'text' },
    tag: { control: 'text' },
    description: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Template for rendering the component
const Template: Story<typeof BaseModalSelectItem> = (args) => (
  <BaseModalSelectItem {...args} />
);

// Default story
export const Default = Template.bind({});
Default.args = {
  title: 'Default Option',
  description: 'This is a description for the default option.',
};

// Selected item story
export const Selected = Template.bind({});
Selected.args = {
  title: 'Selected Option',
  description: 'This option is currently selected.',
  selected: true,
};

// Disabled item story
export const Disabled = Template.bind({});
Disabled.args = {
  title: 'Disabled Option',
  description: 'This option is disabled and cannot be selected.',
  disabled: true,
};

// Item with tag story
export const WithTag = Template.bind({});
WithTag.args = {
  title: 'Option with Tag',
  description: 'This option includes a tag.',
  tag: 'Tag',
};

// Selected with tag story
export const SelectedWithTag = Template.bind({});
SelectedWithTag.args = {
  title: 'Selected Option with Tag',
  description: 'This option is selected and includes a tag.',
  tag: 'Tag',
  selected: true,
};
