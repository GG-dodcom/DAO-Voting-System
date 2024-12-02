import type { Meta, StoryObj } from '@storybook/react';
import { BaseModal } from '../../components';
import '../../assets/css/main.scss';
import { useState } from 'react';

const meta = {
  title: 'Components/BaseModal',
  component: BaseModal,
} satisfies Meta<typeof BaseModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Base Modal Example</h1>
        <button
          onClick={handleOpen}
          className="mt-4 rounded bg-blue-500 text-white p-2"
        >
          Open Modal
        </button>
        <BaseModal open={open} onClose={handleClose}>
          <h2 className="text-lg font-semibold">Modal Title</h2>
          <p>This is a simple modal body.</p>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleClose}
              className="rounded bg-red-500 text-white p-2"
            >
              Close
            </button>
          </div>
        </BaseModal>
      </div>
    );
  },
};

export const WithHeaderAndFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Modal with Header and Footer</h1>
        <button
          onClick={handleOpen}
          className="mt-4 rounded bg-blue-500 text-white p-2"
        >
          Open Modal
        </button>
        <BaseModal
          open={open}
          onClose={handleClose}
          header={<span className="text-xl">Modal Header</span>}
          footer={<span>Modal Footer Content</span>}
        >
          <p>This modal has a header and footer.</p>
        </BaseModal>
      </div>
    );
  },
};

export const WithoutCloseButton: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Modal Without Close Button</h1>
        <button
          onClick={handleOpen}
          className="mt-4 rounded bg-blue-500 text-white p-2"
        >
          Open Modal
        </button>
        <BaseModal open={open} onClose={handleClose} hideClose>
          <h2 className="text-lg font-semibold">Modal Title</h2>
          <p>This modal does not have a close button.</p>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleClose}
              className="rounded bg-red-500 text-white p-2"
            >
              Close
            </button>
          </div>
        </BaseModal>
      </div>
    );
  },
};
