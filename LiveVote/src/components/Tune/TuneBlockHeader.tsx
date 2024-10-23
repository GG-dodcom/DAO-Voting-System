import React from 'react';
import { BaseCounter, IconInformationTooltip } from '..';

interface Props {
  title?: string;
  subTitle?: string;
  counter?: number;
  information?: string;
  children?: React.ReactNode;
}

const TuneBlockHeader: React.FC<Props> = ({
  title,
  subTitle,
  counter,
  information,
  children,
}) => {
  return (
    <div className="flex justify-between p-3 pb-0">
      <h4>
        <div className="leading-5 flex items-center">
          <span className="text-skin-heading">{title}</span>
          <div className="mx-1">
            <BaseCounter counter={counter} />
          </div>
        </div>
        <div className="text-skin-text font-normal leading-5 mt-1">
          {subTitle}
        </div>
      </h4>
      <div className="flex items-center relative">
        <div className="absolute right-0 top-0 flex">
          {children ? (
            children
          ) : (
            <div className="ml-1 !text-base text-skin-text">
              <IconInformationTooltip information={information} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TuneBlockHeader;
