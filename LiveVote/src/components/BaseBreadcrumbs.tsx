import React from 'react';
import { Link } from 'react-router-dom';
import { IHoChevronRight } from '../assets/icons';

interface Page {
  id?: string;
  name: string;
  to: string;
  current: boolean;
}

interface Props {
  pages: Page[];
  className: string;
}

const BaseBreadcrumbs: React.FC<Props> = ({ pages, className }) => {
  return (
    <div
      className={`flex items-center overflow-x-scroll no-scrollbar ${className}`}
    >
      {pages.map((page, i) => (
        <div key={i} className="flex items-center">
          {!page.current ? (
            <Link to={page.to} className="flex items-center">
              <span className="text-skin-link truncate max-w-[180px]">
                {page.name}
              </span>
            </Link>
          ) : (
            <div className="flex cursor-default items-center">
              <span
                className={`text-skin-link opacity-40 truncate max-w-[180px] ${
                  page.id === 'proposal-title' ? '!max-w-[320px]' : ''
                }`}
              >
                {page.name}
              </span>
            </div>
          )}
          {i < pages.length - 1 && (
            <div className="mx-1 flex h-[20px] w-[20px] items-center justify-center">
              <IHoChevronRight className="shrink-0 text-xs text-skin-text" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BaseBreadcrumbs;
