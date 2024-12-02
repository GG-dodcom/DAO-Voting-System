import React from 'react';
import { LoadingList } from '..';
import classNames from 'classnames';

interface Props {
  slim?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
}

const TuneBlock: React.FC<Props> = ({
  slim = false,
  loading = false,
  children,
  header,
  className,
}) => {
  return (
    <div
      className={`border-skin-border bg-skin-block-bg rounded-2xl border ${className}`}
    >
      {header}
      <div className={classNames('p-3', { '!p-0': slim })}>
        {loading ? <LoadingList /> : children}
      </div>
    </div>
  );
};

export default TuneBlock;
