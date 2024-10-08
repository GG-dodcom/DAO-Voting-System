import React from 'react';
import { IHoQuestionMarkCircle } from '../assets/icons/index';

import Tippy from '@tippyjs/react';

interface IconInformationTooltipProps {
  information?: string;
}

const IconInformationTooltip: React.FC<IconInformationTooltipProps> = ({
  information,
}) => {
  return (
    <>
      {information && (
        <Tippy content={information}>
          <span className="text-xs hover:text-skin-link cursor-pointer">
            <IHoQuestionMarkCircle />
          </span>
        </Tippy>
      )}
    </>
  );
};

export default IconInformationTooltip;
