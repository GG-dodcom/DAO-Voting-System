// src/components/LayoutComponent.tsx

import React, { ReactNode } from 'react';
import BaseContainer from './BaseContainer'; // Adjust the import path as needed

interface Props {
  slim?: boolean;
  reverse?: boolean;
  children?: ReactNode;
  sidebarLeft?: ReactNode;
  contentRight?: ReactNode;
  contentLeft?: ReactNode;
  sidebarRight?: ReactNode;
  className?: string;
}

const TheLayout: React.FC<Props> = ({
  slim = true,
  reverse = false,
  children,
  sidebarLeft,
  contentRight,
  contentLeft,
  sidebarRight,
  className,
}) => {
  return (
    <BaseContainer slim={slim} className={className}>
      {children}
      {sidebarLeft && (
        <div id="sidebar-left" className="float-left w-full lg:w-1/4">
          {sidebarLeft}
        </div>
      )}
      {contentRight && (
        <div
          id="content-right"
          className="relative float-right w-full pl-0 lg:w-3/4 lg:pl-5"
        >
          {contentRight}
        </div>
      )}
      <div
        className={`lg:flex ${
          reverse ? 'flex flex-col-reverse lg:flex-row' : ''
        }`}
      >
        {contentLeft && (
          <div id="content-left" className="relative w-full lg:w-8/12 lg:pr-5">
            {contentLeft}
          </div>
        )}
        {sidebarRight && (
          <div id="sidebar-right" className="w-full lg:w-4/12 lg:min-w-[321px]">
            {sidebarRight}
          </div>
        )}
      </div>
    </BaseContainer>
  );
};

export default TheLayout;
