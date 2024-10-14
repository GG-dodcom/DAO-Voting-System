import Tippy from '@tippyjs/react';
import React from 'react';
import { IHoQuestionMarkCircle } from '../../assets/icons';

interface TuneIconHintProps {
  hint?: string;
}

const TuneIconHint: React.FC<TuneIconHintProps> = ({ hint }) => {
  return (
    <>
      {!!hint && (
        <Tippy content={hint}>
          <span className="tune-icon-hint">
            <IHoQuestionMarkCircle />
          </span>
        </Tippy>
      )}
    </>
  );
};

export default TuneIconHint;
