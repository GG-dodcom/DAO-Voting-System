import React from 'react';
import { BaseLoading } from '.';

interface LoadingRowProps {
  block?: boolean;
}
const LoadingRow: React.FC<LoadingRowProps> = ({ block }) => {
  return (
    <BaseLoading block={block}>
      <div className="block px-4 py-4">
        <div
          className="lazy-loading mb-2 rounded-md"
          style={{ width: '60%', height: '28px' }}
        />
        <div
          className="lazy-loading rounded-md"
          style={{ width: '50%', height: '28px' }}
        />
      </div>
    </BaseLoading>
  );
};

export default LoadingRow;
