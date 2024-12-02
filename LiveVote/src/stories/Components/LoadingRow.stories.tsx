import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { LoadingRow } from '../../components'; // Adjust the path if necessary

// Meta configuration for Storybook
const meta = {
  title: 'Components/LoadingRow',
  component: LoadingRow,
  argTypes: {
    block: { control: 'boolean' },
  },
} satisfies Meta<typeof LoadingRow>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = (args) => {
  return (
    <div style={{ width: '300px' }}>
      <LoadingRow {...args} />
    </div>
  );
};

// Default story - LoadingRow without block
export const Default = Template.bind({});
Default.args = {
  block: false,
};

// Block story - LoadingRow with block prop enabled
export const Block = Template.bind({});
Block.args = {
  block: true,
};
