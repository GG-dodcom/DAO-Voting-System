import React from 'react';
import { useTranslation } from 'react-i18next';

interface MessageWarningFlaggedProps {
  type: string;
  responsive?: boolean;
  onForceShow: () => void;
}

const MessageWarningFlagged: React.FC<MessageWarningFlaggedProps> = ({
  type,
  responsive = false,
  onForceShow,
}) => {
  const { t } = useTranslation();

  const warningText =
    type === 'proposal'
      ? t('warningFlaggedProposal')
      : t('warningFlaggedSpace');

  return (
    <div
      className={`flex justify-between py-3 pl-4 ${
        responsive
          ? 'rounded-none border-y md:rounded-xl md:border'
          : 'rounded-xl border'
      }`}
    >
      <div className="flex items-center">{warningText}</div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            onForceShow();
          }}
        >
          <div className="px-4 py-3 hover:text-skin-link">
            {t('warningFlaggedActionShow')}
          </div>
        </button>
      </div>
    </div>
  );
};

export default MessageWarningFlagged;
