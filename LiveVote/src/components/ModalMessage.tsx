import React from 'react';
import { BaseMessageBlock, BaseModal, TuneButton } from '.';
import { t } from 'i18next';

interface Props {
  open: boolean;
  title: string;
  level: 'info' | 'warning' | 'warning-red';
  onClose: () => void;
  children: React.ReactNode;
}

const ModalMessage: React.FC<Props> = ({
  open,
  title,
  level,
  onClose,
  children,
}) => {
  return (
    <BaseModal open={open} onClose={onClose}>
      {{
        header: (
          <div className="flex flex-row items-center justify-center">
            <h3>{title}</h3>
          </div>
        ),
        children: (
          <BaseMessageBlock level={level} className="m-4 whitespace-pre-line">
            {children}
          </BaseMessageBlock>
        ),
        footer: (
          <TuneButton className="w-full" primary onClick={onClose}>
            {t('continue')}
          </TuneButton>
        ),
      }}
    </BaseModal>
  );
};

export default ModalMessage;
