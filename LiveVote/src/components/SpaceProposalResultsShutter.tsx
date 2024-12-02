import Tippy from '@tippyjs/react';
import { t } from 'i18next';
import React from 'react';
import { IHoEyeOff } from '../assets/icons';

interface Props {
  className?: string;
}

const SpaceProposalResultsShutter: React.FC<Props> = ({ className }) => {
  return (
    <div>
      <div className={`flex items-center  ${className}`}>
        <Tippy content={t('privacy')}>
          <span>
            <IHoEyeOff className="w-[80px]" />
          </span>
        </Tippy>
      </div>
    </div>
  );
};

export default SpaceProposalResultsShutter;
