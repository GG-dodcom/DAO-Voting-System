import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ModalVotingType } from '../../components';
import '../../assets/css/main.scss';

// Meta information for Storybook
const meta: Meta<typeof ModalVotingType> = {
  title: 'Components/ModalVotingType',
  component: ModalVotingType,
  argTypes: {
    open: { control: 'boolean' },
    selected: { control: 'text' },
    allowAny: { control: 'boolean' },
    onClose: { action: 'onClose' },
    onChangeSelected: { action: 'onChangeSelected' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Template for rendering the component
const Template: Story<typeof ModalVotingType> = (args) => (
  <ModalVotingType {...args} />
);

// Default story
export const Default = Template.bind({});
Default.args = {
  open: true,
  selected: 'single-choice',
  allowAny: false,
};

// AllowAny story
export const AllowAny = Template.bind({});
AllowAny.args = {
  open: true,
  selected: 'approval',
  allowAny: true,
};

// Closed modal story
export const Closed = Template.bind({});
Closed.args = {
  open: false,
  selected: '',
  allowAny: false,
};

// Custom selected story
export const CustomSelected = Template.bind({});
CustomSelected.args = {
  open: true,
  selected: 'ranked-choice',
  allowAny: false,
};
