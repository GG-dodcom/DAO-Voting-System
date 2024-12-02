import React from 'react';

const CARD_COUNT = 12;

const ExploreSkeletonLoading: React.FC = () => {
  return (
    <div className="grid gap-4 opacity-40 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: CARD_COUNT }, (_, i) => (
        <div
          key={i}
          className="min-h-[266px] animate-pulse bg-skin-border md:rounded-xl"
        />
      ))}
    </div>
  );
};

export default ExploreSkeletonLoading;
