/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, useState } from 'react';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from '@floating-ui/react';
import type { Placement } from '@floating-ui/react';
import { TuneButton } from '.';
import { IHoChevronDown } from '../assets/icons';

type Item = {
  text: string;
  action: string;
  extras?: any;
};

interface Props {
  items: Item[];
  selected?: string;
  placement?: Placement;
  onSelect: (action: string) => void; // Event handler for selection
  children?: {
    button?: React.ReactNode; // Use ReactNode for flexible rendering
    item?: (item: Item) => React.ReactNode; // Function to render each item
  };
  className?: string;
}

const BaseMenu: React.FC<Props> = ({
  items,
  selected = '',
  placement = 'bottom-end',
  onSelect,
  children,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Floating UI setup for positioning
  const { refs, floatingStyles } = useFloating({
    placement,
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  return (
    <Menu as="div" className={`inline-block h-full text-left ${className}`}>
      {/* Menu Button */}
      <MenuButton
        as="div"
        ref={refs.setReference}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {children?.button ? (
          children?.button
        ) : (
          <TuneButton className="flex items-center">
            {selected}
            <IHoChevronDown
              className="-mr-1 ml-1 text-xs text-skin-link"
              aria-hidden="true"
            />
          </TuneButton>
        )}
      </MenuButton>

      {/* Menu Items */}
      <Transition
        as={Fragment}
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          ref={refs.setFloating}
          style={floatingStyles}
          className="absolute z-50 overflow-hidden rounded-2xl border bg-skin-header-bg shadow-lg outline-none"
        >
          <div className="no-scrollbar max-h-[300px] overflow-auto">
            {items.map((item) => (
              <MenuItem key={item.text}>
                {({ active }) => (
                  <div
                    className={`cursor-pointer whitespace-nowrap px-3 py-2 ${
                      active
                        ? 'bg-skin-border text-skin-link'
                        : 'bg-skin-header-bg text-skin-text'
                    }`}
                    onClick={() => {
                      onSelect(item.action);
                      setIsOpen(false); // Close menu on selection
                    }}
                  >
                    {children?.item ? children?.item(item) : item.text}
                  </div>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default BaseMenu;
