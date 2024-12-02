import type { Meta, StoryObj } from '@storybook/react';
import { LabelInput } from '../../components/';
import '../../assets/css/main.scss';

const meta = {
  title: 'Components/LabelInput',
  component: LabelInput,
} satisfies Meta<typeof LabelInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="p-4">
      <h1 className="text-2xl font-bold">LabelInput Component</h1>
      <LabelInput information="This is some helpful information">
        <label className="text-lg">Input Label:</label>
      </LabelInput>
      <input type="text" className="mt-2 border p-2" placeholder="Enter text" />
    </div>
  ),
};

export const WithCustomInformation: Story = {
  render: () => (
    <div className="p-4">
      <h1 className="text-2xl font-bold">LabelInput with Custom Information</h1>
      <LabelInput information="Here’s custom information for this input.">
        <label className="text-lg">Username:</label>
      </LabelInput>
      <input
        type="text"
        className="mt-2 border p-2"
        placeholder="Enter username"
      />
    </div>
  ),
};

export const WithoutInformationTooltip: Story = {
  render: () => (
    <div className="p-4">
      <h1 className="text-2xl font-bold">
        LabelInput Without Information Tooltip
      </h1>
      <LabelInput>
        <label className="text-lg">Password:</label>
      </LabelInput>
      <input
        type="password"
        className="mt-2 border p-2"
        placeholder="Enter password"
      />
    </div>
  ),
};
