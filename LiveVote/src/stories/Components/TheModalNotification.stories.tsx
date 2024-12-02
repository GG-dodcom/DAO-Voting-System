import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useModalNotification } from '../../hooks'; // Assuming the hook is in hooks folder
import { TheModalNotification } from '../../components'; // Assuming TheModalNotification component is already implemented
import '../../assets/css/main.scss';

// Storybook default export
export default {
  title: 'Components/TheModalNotification',
  component: TheModalNotification,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <>
        {/* Add the modal container to the DOM */}
        <div id="modal"></div>
        <Story />
      </>
    ),
  ],
} as Meta;

export const Custom: React.FC = () => {
  const { notifyModal, items } = useModalNotification();

  return (
    <div>
      <h1>Notification Modal Demo</h1>

      {/* Buttons to trigger different notifications */}
      <button
        onClick={() => {
          notifyModal('info', 'wrong timestamp');
        }}
        className="btn-info"
      >
        Trigger Info Modal
      </button>

      <button
        onClick={() =>
          notifyModal('warning', 'space with ticket requires voting validation')
        }
        className="btn-warning"
      >
        Trigger Warning Modal
      </button>

      <button
        onClick={() =>
          notifyModal('warning-red', 'space missing proposal validation')
        }
        className="btn-danger"
      >
        Trigger Error Modal
      </button>

      {/* The modal notification component */}
      <TheModalNotification items={items} />
    </div>
  );
};
