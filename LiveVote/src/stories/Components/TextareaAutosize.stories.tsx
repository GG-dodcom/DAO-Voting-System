import type { Meta, StoryObj } from '@storybook/react';
import { TextareaAutosize } from '../../components';
import '../../assets/css/main.scss';
import { useState } from 'react';

const meta = {
  title: 'Components/TextareaAutosize',
  component: TextareaAutosize,
} satisfies Meta<typeof TextareaAutosize>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');

    const handleChange = (newValue: string | number) => {
      setValue(newValue.toString());
    };

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">TextareaAutosize Component</h1>
        <TextareaAutosize
          value={value}
          onChange={handleChange}
          placeholder="Enter some text..."
        />
      </div>
    );
  },
};

export const WithMinMaxHeight: Story = {
  render: () => {
    const [value, setValue] = useState('');

    const handleChange = (newValue: string | number) => {
      setValue(newValue.toString());
    };

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">
          TextareaAutosize with Min/Max Height
        </h1>
        <TextareaAutosize
          value={value}
          onChange={handleChange}
          minHeight={100}
          maxHeight={200}
          placeholder="This textarea has minHeight 100px and maxHeight 200px."
        />
      </div>
    );
  },
};

export const WithMaxLength: Story = {
  render: () => {
    const [value, setValue] = useState('');

    const handleChange = (newValue: string | number) => {
      setValue(newValue.toString());
    };

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">TextareaAutosize with Max Length</h1>
        <TextareaAutosize
          value={value}
          onChange={handleChange}
          maxLength={50}
          placeholder="This textarea has a max length of 50 characters."
        />
      </div>
    );
  },
};

export const WithTitleAndInformation: Story = {
  render: () => {
    const [value, setValue] = useState('');

    const handleChange = (newValue: string | number) => {
      setValue(newValue.toString());
    };

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">
          TextareaAutosize with Title and Information
        </h1>
        <TextareaAutosize
          value={value}
          onChange={handleChange}
          title="Description"
          information="Please provide a detailed description."
          placeholder="Enter your description here..."
        />
      </div>
    );
  },
};

export const DisabledState: Story = {
  render: () => (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Disabled TextareaAutosize</h1>
      <TextareaAutosize value="This textarea is disabled." isDisabled={true} />
    </div>
  ),
};
