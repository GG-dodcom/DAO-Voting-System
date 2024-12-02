import React from 'react';
import { useTranslation } from 'react-i18next';
import { BaseModal, TuneButton } from '.';

interface Props {
  open: boolean;
  title?: string;
  showCancel?: boolean;
  disabled?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
}

const ModalConfirmAction: React.FC<Props> = ({
  open,
  title,
  showCancel = false,
  disabled = false,
  onClose,
  onConfirm,
  children,
}) => {
  const { t } = useTranslation();

  return (
    <BaseModal open={open} onClose={onClose}>
      <div className="flex flex-row items-center justify-center">
        <h3>{title ? title : t('confirmAction')}</h3>
      </div>

      {children}

      <div className="flex gap-3">
        {showCancel && (
          <TuneButton className="w-full" onClick={onClose}>
            {t('cancel')}
          </TuneButton>
        )}
        <TuneButton
          className="w-full"
          primary
          disabled={disabled}
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {t('confirm')}
        </TuneButton>
      </div>
    </BaseModal>
  );
};

export default ModalConfirmAction;
