import React from 'react';
import { useTranslation } from 'react-i18next';
import { IHoEmojiSad } from '../assets/icons';

const BaseNoResults: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="py-[20px] text-center text-skin-link md:py-5">
      <IHoEmojiSad className="mx-auto" />
      <div className="mt-2 text-base">{t('noResultsFound')}</div>
    </div>
  );
};

export default BaseNoResults;
