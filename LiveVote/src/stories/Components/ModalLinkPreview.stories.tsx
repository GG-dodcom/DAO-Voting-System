import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ModalLinkPreview } from '../../components';
import '../../assets/css/main.scss';

// Meta information for Storybook
const meta: Meta<typeof ModalLinkPreview> = {
  title: 'Components/ModalLinkPreview',
  component: ModalLinkPreview,
  argTypes: {
    open: { control: 'boolean' },
    clickedUrl: { control: 'text' },
    onClose: { action: 'onClose' },
    onConfirm: { action: 'onConfirm' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Template for rendering the component
const Template: Story<typeof ModalLinkPreview> = (args) => (
  <ModalLinkPreview {...args} />
);

// Default story
export const Default = Template.bind({});
Default.args = {
  open: true,
  clickedUrl: 'https://example.com',
};

// Story with a longer URL
export const LongUrl = Template.bind({});
LongUrl.args = {
  open: true,
  clickedUrl:
    'https://example.com/very/long/url/that/goes/on/and/on/and/might/wrap/around',
};

// Closed modal story
export const Closed = Template.bind({});
Closed.args = {
  open: false,
  clickedUrl: 'https://example.com',
};

// Fully customized story
export const Customized = Template.bind({});
Customized.args = {
  open: true,
  clickedUrl: 'https://custom-url.com/preview',
};

// Component with no actions
export const NoActions = Template.bind({});
NoActions.args = {
  open: true,
  clickedUrl: 'https://no-actions-url.com',
  onClose: undefined,
  onConfirm: undefined,
};
