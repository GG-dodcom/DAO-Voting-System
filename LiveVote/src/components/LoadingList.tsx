import React from 'react';

const LoadingList: React.FC = () => {
  return (
    <div>
      <div
        className="lazy-loading mb-2 rounded-md"
        style={{ width: '80%', height: '20px' }}
      />
      <div
        className="lazy-loading rounded-md"
        style={{ width: '50%', height: '20px' }}
      />
    </div>
  );
};

export default LoadingList;
