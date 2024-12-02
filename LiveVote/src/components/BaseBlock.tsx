/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Tippy from '@tippyjs/react';
import {
  BaseButtonIcon,
  BaseCounter,
  IconInformationTooltip,
  LoadingList,
  LoadingSpinner,
} from './index';
import { IHoChevronUp } from '../assets/icons/index';

interface BaseBlockProps {
  title?: string;
  counter?: number;
  slim?: boolean;
  loading?: boolean;
  hideBottomBorder?: boolean;
  label?: string;
  labelTooltip?: string;
  information?: string;
  isCollapsable?: boolean;
  showMoreButton?: boolean;
  showMoreButtonLabel?: string;
  loadingMore?: boolean;
  onShowMore?: () => void;
  button?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  style?: any;
}

const BaseBlock: React.FC<BaseBlockProps> = ({
  title,
  counter,
  slim,
  loading,
  hideBottomBorder,
  label,
  labelTooltip,
  information,
  isCollapsable,
  showMoreButton,
  showMoreButtonLabel,
  loadingMore,
  onShowMore,
  button,
  children,
  className,
  style,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    if (isCollapsable) {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div
      className={`border-y border-skin-border bg-skin-block-bg text-base md:rounded-xl md:border ${className}`}
      style={style}
    >
      {title && (
        <div
          className={`group flex h-[57px] justify-between rounded-t-none border-b border-skin-border px-4 pb-[12px] pt-3 md:rounded-t-lg ${
            hideBottomBorder || (isCollapsable && isCollapsed)
              ? 'border-b-0'
              : ''
          } ${isCollapsable ? 'cursor-pointer' : ''}`}
          onClick={handleToggleCollapse}
        >
          <h4 className="flex items-center">
            <div>{title}</div>
            {information && (
              <div className="ml-1 text-sm text-skin-text">
                <IconInformationTooltip information={information} />
              </div>
            )}
            {counter !== undefined && (
              <div className="ml-1 inline-block">
                <BaseCounter counter={counter} />
              </div>
            )}
          </h4>
          <div className="flex items-center">
            {label && (
              <Tippy content={labelTooltip || ''}>
                <div
                  className={`text-xs text-skin-link ${
                    labelTooltip ? 'cursor-help' : ''
                  }`}
                >
                  {label}
                </div>
              </Tippy>
            )}
          </div>
          {button}
          {isCollapsable && (
            <div className="pr-0 group-hover:text-skin-link">
              <BaseButtonIcon>
                <IHoChevronUp className={isCollapsed ? 'rotate-180' : ''} />
              </BaseButtonIcon>
            </div>
          )}
        </div>
      )}
      {loading && (
        <div className="block px-4 py-4">
          <LoadingList />
        </div>
      )}
      {!loading && (!isCollapsed || !isCollapsable) && (
        <div
          className={`${!slim ? 'p-4' : ''} leading-5 sm:leading-6 break-words`}
        >
          {children}
          {showMoreButton && (
            <div className="block rounded-b-none border-t px-4 py-3 text-center md:rounded-b-md">
              {loadingMore ? (
                <LoadingSpinner />
              ) : (
                <button onClick={onShowMore}>
                  {showMoreButtonLabel || 'See More'}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BaseBlock;
