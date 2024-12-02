import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { BaseMenu, TuneButton } from '../../components';
import '../../assets/css/main.scss';
import { IHoChevronDown } from '../../assets/icons';

// Default export with story metadata
export default {
  title: 'Components/BaseMenu',
  component: BaseMenu,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

// Template for rendering the component
const Template: StoryObj = () => {
  const [selected, setSelected] = useState<string>('Select an option');

  const items = [
    { text: 'Option 1', action: 'option1' },
    { text: 'Option 2', action: 'option2' },
    { text: 'Option 3', action: 'option3' },
  ];

  const handleSelect = (action: string) => {
    setSelected(action);
    alert(`Selected: ${action}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold">Base Menu Example</h1>
      <BaseMenu
        items={items}
        selected={selected}
        onSelect={handleSelect}
        placement="bottom-end"
      ></BaseMenu>
    </div>
  );
};

// Default export for the story
export const Default = Template.bind({});

// Example for a custom button
export const CustomButton: StoryObj = () => {
  const [selected, setSelected] = useState<string>('Custom Option');

  const items = [
    { text: 'Custom Option 1', action: 'customOption1' },
    { text: 'Custom Option 2', action: 'customOption2' },
    { text: 'Custom Option 3', action: 'customOption3' },
  ];

  const handleSelect = (action: string) => {
    setSelected(action);
    alert(`Selected: ${action}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold">Custom Button Menu Example</h1>
      <BaseMenu
        items={items}
        selected={selected}
        onSelect={handleSelect}
        placement="bottom-end"
      >
        {{
          button: (
            <div>
              <TuneButton className="flex items-center">
                {selected}
                <IHoChevronDown
                  className="-mr-1 ml-1 text-xs text-skin-link"
                  aria-hidden="true"
                />
              </TuneButton>
            </div>
          ),
        }}
      </BaseMenu>
    </div>
  );
};
