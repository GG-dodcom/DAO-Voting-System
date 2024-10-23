/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { createPortal } from 'react-dom';
import { ModalMessage } from '.';
import { t } from 'i18next';

interface Props {
  items: any[];
}

const TheModalNotification: React.FC<Props> = ({ items }) => {
  if (!items || items.length === 0) {
    return null; // Return null if there are no items to display
  }

  return createPortal(
    <>
      {items
        .filter((item) => item && item.id && item.description) // Ensure item is defined and has necessary properties
        .map((item) => (
          <div key={item.id}>
            {t(`modalNotifications.${item.description}`) && (
              <ModalMessage
                open={true}
                title={t(`modalNotifications.${item.description}.title`)}
                level={item.type}
                onClose={item.remove}
              >
                <span>
                  {t(`modalNotifications.${item.description}.message`)}
                </span>
              </ModalMessage>
            )}
          </div>
        ))}
    </>,
    document.getElementById('modal') as HTMLElement
  );
};

export default TheModalNotification;
