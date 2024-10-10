/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useState } from 'react';
import { shorten } from '../utils/utils';
import { usePerformances } from '../hooks/usePerformances'; // Assume you have this hook
import { useTranslation } from 'react-i18next';
import { useIntersection } from 'react-use';

import {
  BaseContainer,
  ExploreSkeletonLoading,
  BaseNoResults,
  BaseBlock,
  LoadingSpinner,
  AvatarSpace,
  TuneButton,
} from '.';

const ExploreSpaces: React.FC = () => {
  const { t } = useTranslation();
  const {
    loadPerformancesHome,
    loadMorePerformancesHome,
    performancesHome,
    performancesHomeTotal,
    loadingPerformancesHome,
    loadingMorePerformancesHome,
    enablePerformancesHomeScroll,
    setEnablePerformancesHomeScroll,
  } = usePerformances();

  const handleClickMore = () => {
    loadMorePerformancesHome();
    setEnablePerformancesHomeScroll(true);
  };

  useEffect(() => {
    loadPerformancesHome(); // Call loadSpaces when the component mounts
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className="relative">
      <div className="mb-4 flex flex-col flex-wrap items-center xs:flex-row md:flex-nowrap">
        <BaseContainer>
          {performancesHomeTotal && (
            <div className="mt-2 whitespace-nowrap text-right text-skin-text xs:ml-auto xs:mt-0">
              {t('spaceCount', {
                count: performancesHomeTotal,
              })}
            </div>
          )}
        </BaseContainer>
      </div>

      <BaseContainer slim>
        {loadingPerformancesHome ? (
          <ExploreSkeletonLoading />
        ) : performancesHome.length < 1 ? (
          <BaseNoResults />
        ) : (
          // <InfiniteScroll
          //   dataLength={performancesHome.length} // This is important field to render the next data
          //   next={() => loadMoreSpacesHome()} // Function that fetches more data
          //   hasMore={enablePerformancesHomeScroll} // Define when there are more items
          //   loader={
          //     <div className="mt-4 flex h-[46px]">
          //       <div className="mx-auto">
          //         <LoadingSpinner big />
          //       </div>
          //     </div>
          //   }
          //   scrollThreshold={0.9} // Optional: scroll threshold
          // >
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {performancesHome.map((performancesHome) => (
              <div key={performancesHome.id}>
                {/* TODO: */}
                <a href={`/performanceTeams/${performancesHome.id}`}>
                  <div
                    className="mb-0 flex items-center justify-center text-center transition-all hover:border-skin-text"
                    style={{ height: '266px' }}
                  >
                    <BaseBlock>
                      <div className="relative mb-2 inline-block">
                        <div className="mb-1">
                          <AvatarSpace space={performancesHome} size="82" />
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-1 truncate">
                        <h3 className="mb-0 mt-0 !h-[32px] overflow-hidden pb-0 text-[22px]">
                          {shorten(performancesHome.name, 16)}
                        </h3>
                      </div>
                      <div className="mb-[12px] text-skin-text">
                        {t('members', {
                          count: performancesHome.teamsCount,
                        })}
                      </div>
                    </BaseBlock>
                  </div>
                </a>
              </div>
            ))}
          </div>
          // </InfiniteScroll>
        )}
        {!enablePerformancesHomeScroll &&
          performancesHomeTotal > performancesHome.length &&
          performancesHome.length >= 12 && (
            <div className="px-3 text-center md:px-0">
              <TuneButton onClick={handleClickMore} className="mt-4 w-full">
                {t('homeLoadmore')}
              </TuneButton>
            </div>
          )}
        {loadingMorePerformancesHome && (
          <div className="mt-4 flex h-[46px]">
            <div className="mx-auto">
              <LoadingSpinner big />
            </div>
          </div>
        )}
      </BaseContainer>
    </div>
  );
};

export default ExploreSpaces;
