import type { Meta, StoryObj } from '@storybook/react';
import BaseInput from '../../components/BaseInput';
import { BaseIcon, LoadingSpinner } from '../../components';
import { IHoCheck, IHoX } from '../../assets/icons';
import '../../assets/css/main.scss';
import { useState } from 'react';

const meta = {
  title: 'Components/BaseInput',
  component: BaseInput,
} satisfies Meta<typeof BaseInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');

    const handleChange = (newValue: string) => {
      setValue(newValue);
    };

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">BaseInput Component</h1>
        <BaseInput
          value={value}
          onChange={handleChange}
          placeholder="Enter text..."
        />
      </div>
    );
  },
};

export const WithTitleAndInformation: Story = {
  render: () => {
    const [value, setValue] = useState('');

    const handleChange = (newValue: string) => {
      setValue(newValue);
    };

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">
          BaseInput with Title and Information
        </h1>
        <BaseInput
          value={value}
          onChange={handleChange}
          title="Username"
          information="Enter your username here"
          placeholder="Enter your username..."
        />
      </div>
    );
  },
};

export const WithBeforeAndAfterElements: Story = {
  render: () => {
    const [value, setValue] = useState('');

    const handleChange = (newValue: string) => {
      setValue(newValue);
    };

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">
          BaseInput with Before and After Elements
        </h1>
        <BaseInput
          value={value}
          onChange={handleChange}
          before={<BaseIcon name="user" />}
          after={<BaseIcon name="check" />}
          placeholder="Enter something..."
        />
      </div>
    );
  },
};

export const WithSuccessState: Story = {
  render: () => {
    const [value, setValue] = useState('');

    const handleChange = (newValue: string) => {
      setValue(newValue);
    };

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">BaseInput with Success State</h1>
        <BaseInput
          value={value}
          onChange={handleChange}
          success={true}
          placeholder="Success input..."
        />
      </div>
    );
  },
};

export const WithLoadingState: Story = {
  render: () => {
    const [value, setValue] = useState('');

    const handleChange = (newValue: string) => {
      setValue(newValue);
    };

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">BaseInput with Loading State</h1>
        <BaseInput
          value={value}
          onChange={handleChange}
          loading={true}
          placeholder="Loading input..."
        />
      </div>
    );
  },
};

export const WithErrorState: Story = {
  render: () => {
    const [value, setValue] = useState('');

    const handleChange = (newValue: string) => {
      setValue(newValue);
    };

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">BaseInput with Error State</h1>
        <BaseInput
          value={value}
          onChange={handleChange}
          error={{ message: 'This field is required' }}
          placeholder="Error input..."
        />
      </div>
    );
  },
};

export const WithMaxLength: Story = {
  render: () => {
    const [value, setValue] = useState('');

    const handleChange = (newValue: string) => {
      setValue(newValue);
    };

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">BaseInput with Max Length</h1>
        <BaseInput
          value={value}
          onChange={handleChange}
          maxLength={10}
          placeholder="Max length 10 characters..."
        />
      </div>
    );
  },
};

export const DisabledState: Story = {
  render: () => (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Disabled BaseInput</h1>
      <BaseInput value="This input is disabled" isDisabled={true} />
    </div>
  ),
};
