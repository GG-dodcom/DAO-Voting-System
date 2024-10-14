import { Meta, StoryObj } from '@storybook/react';
import { MessageWarningFlagged } from '../../components';
import '../../assets/css/main.scss';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from '../../utils/i18n';

// Meta configuration for Storybook
const meta = {
  title: 'Components/MessageWarningFlagged',
  component: MessageWarningFlagged,
  argTypes: {
    type: { control: { type: 'select', options: ['proposal', 'space'] } },
    responsive: { control: 'boolean' },
    onForceShow: { action: 'forced' }, // This will log the action when button is clicked
  },
} satisfies Meta<typeof MessageWarningFlagged>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = (args) => {
  return <MessageWarningFlagged {...args} />;
};

// Default story - Proposal type, not responsive
export const Default = Template.bind({});
Default.args = {
  type: 'proposal',
  responsive: false,
  onForceShow: () => console.log('Force show action triggered!'),
};

// Responsive story - Space type, responsive
export const Responsive = Template.bind({});
Responsive.args = {
  type: 'space',
  responsive: true,
  onForceShow: () => console.log('Force show action triggered!'),
};

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        warningFlaggedProposal: 'Warning: This proposal has been flagged.',
        warningFlaggedSpace: 'Warning: This space has been flagged.',
        warningFlaggedActionShow: 'Show Details',
      },
    },
    // You can add more languages here
  },
  lng: 'en', // Set default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export const Custom: React.FC = () => {
  const handleForceShow = () => {
    console.log('Force show action triggered!');
    // Implement the logic to handle showing details
  };

  return (
    <I18nextProvider i18n={i18n}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Message Warning Example</h1>
        <MessageWarningFlagged
          type="proposal" // or "space" based on your needs
          responsive={true} // set to true or false as needed
          onForceShow={handleForceShow}
        />
      </div>
    </I18nextProvider>
  );
};
