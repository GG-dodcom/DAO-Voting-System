import React from 'react';

interface Props {
  value: number | number[];
  max: number;
}

const SpaceProposalResultsProgressBar: React.FC<Props> = ({ value, max }) => {
  // If value is an array, use it as-is, otherwise wrap it in an array
  const bars = Array.isArray(value) ? value : [value];

  return (
    <div className="relative flex h-2 overflow-hidden rounded-full">
      {/* Background bar */}
      <div className="absolute z-5 h-full w-full bg-[color:var(--border-color)]" />

      {/* Foreground bars */}
      {bars
        .filter((bar) => bar !== 0) // Filter out zero bars
        .map((bar, i) => (
          <div
            key={i}
            style={{ width: `${((100 / max) * bar).toFixed(3)}%` }}
            className={`z-10 h-full bg-skin-primary 
              ${i === 1 ? 'opacity-80' : ''}
              ${i === 2 ? 'opacity-60' : ''}
              ${i === 3 ? 'opacity-40' : ''}
              ${i >= 4 ? 'opacity-20' : ''}`}
          />
        ))}
    </div>
  );
};

export default SpaceProposalResultsProgressBar;
