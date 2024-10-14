import React from 'react';
import classNames from 'classnames';
import { BasePill } from '.';
import { IHoCheck } from '../assets/icons';

// Define the component props
interface Props {
  selected?: boolean;
  title: string;
  tag?: string;
  description?: string;
  disabled?: boolean;
}

const BaseModalSelectItem: React.FC<Props> = ({
  selected = false,
  title,
  tag,
  description,
  disabled = false,
}) => {
  return (
    <div
      className={classNames(
        'transition-colors hover:border-skin-text cursor-pointer',
        {
          '!border-skin-link': selected,
          'hover:!border-skin-border hover:!cursor-not-allowed': disabled,
        }
      )}
    >
      <div className="relative inset-y-0 flex items-center">
        <div
          className={classNames('w-full text-left', { 'pr-[44px]': selected })}
        >
          <div className="mb-2 flex items-center gap-2">
            <h3
              className={classNames('mb-0 truncate', {
                'mt-0': description,
                'text-skin-text': disabled,
              })}
            >
              {title}
            </h3>
            {tag && <BasePill>{tag}</BasePill>}
          </div>
          {description && (
            <span className="break-all text-skin-text">{description}</span>
          )}
        </div>
        {selected && <IHoCheck className="absolute right-0 text-md" />}
      </div>
    </div>
  );
};

export default BaseModalSelectItem;
