import React from 'react';
import { useTranslation } from 'react-i18next'; // Assuming you're using i18n for translations
import { ModalConfirmAction } from '.';

interface Props {
  open: boolean;
  clickedUrl: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalLinkPreview: React.FC<Props> = ({
  open,
  clickedUrl,
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation();

  return (
    <ModalConfirmAction
      open={open}
      title="Proceed with caution!"
      showCancel
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <div
        className="p-4 text-center"
        dangerouslySetInnerHTML={{
          __html: t('linkPreview', {
            url: `<span class='text-skin-link font-semibold break-words'>${clickedUrl}</span>`,
          }),
        }}
      />
    </ModalConfirmAction>
  );
};

export default ModalLinkPreview;
