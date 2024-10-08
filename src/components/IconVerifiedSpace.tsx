import React from 'react';
import { BaseIcon } from './';
import Tippy from '@tippyjs/react'; // You can use 'react-tippy' for tooltips
import { useTranslation } from 'react-i18next';

interface IconVerifiedSpaceProps {
  size?: string;
  turbo: boolean;
}

const IconVerifiedSpace: React.FC<IconVerifiedSpaceProps> = ({
  size = '20',
  turbo = false,
}) => {
  const { t } = useTranslation();

  return (
    <div className="cursor-help">
      <Tippy content={t('verifiedSpace')} placement="right">
        <div className={`${turbo ? 'text-[#ffb503]' : ''}`}>
          <BaseIcon name="check" size={size} />
        </div>
      </Tippy>
    </div>
  );
};

export default IconVerifiedSpace;
