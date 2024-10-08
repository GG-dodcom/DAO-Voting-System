import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { shorten } from '@/helpers/utils';
import { useInfiniteScroll } from 'react-infinite-scroll-hook'; // You may need to find an alternative for React.

import {
  BaseContainer,
  ExploreSkeletonLoading,
  BaseNoResults,
  BaseBlock,
  LoadingSpinner,
  AvatarSpace,
  IconVerifiedSpace,
  TuneButton,
} from '.';

import { useSpaces } from '@/hooks/useSpaces'; // Assume you have this hook
import { useTranslation } from 'react-i18next';

const ExploreSpaces: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const {
    loadingPerformance,
    loadMoreSpacesHome,
    loadingSpacesHome,
    spacesHome,
    spacesHomeMetrics,
  } = useSpaces();

  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const loadSpaces = async () => {
      const loadedSpaces = await loadSpacesHome(queryInput);
      setSpaces(loadedSpaces);
    };

    loadSpaces();
  }, [queryInput, loadSpacesHome]);

  const handleClickMore = () => {
    loadMoreSpacesHome(queryInput);
  };

  // Infinite Scroll Logic
  useInfiniteScroll(
    document,
    () => {
      // You need to implement the scroll loading logic
      if (spacesHomeMetrics.total > spaces.length) {
        loadMoreSpacesHome(queryInput);
      }
    },
    { distance: 500 }
  );

  return (
    <div className="relative">
      <div className="mb-4 flex flex-col flex-wrap items-center xs:flex-row md:flex-nowrap">
        <BaseContainer>
          {spacesHomeMetrics.total && (
            <div className="mt-2 whitespace-nowrap text-right text-skin-text xs:ml-auto xs:mt-0">
              {t('spaceCount', {
                count: formatCompactNumber(spacesHomeMetrics.total),
              })}
            </div>
          )}
        </BaseContainer>
      </div>

      <BaseContainer slim>
        {loadingPerformance ? (
          <ExploreSkeletonLoading />
        ) : spaces.length < 1 ? (
          <BaseNoResults />
        ) : (
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {spaces.map((space) => (
              <div key={space.id}>
                <a href={`/spaceProposals/${space.id}`}>
                  <div
                    className="mb-0 flex items-center justify-center text-center transition-all hover:border-skin-text"
                    style={{ height: '266px' }}
                  >
                    <BaseBlock>
                      <div className="relative mb-2 inline-block">
                        <div className="mb-1">
                          <AvatarSpace space={space} size="82" />
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-1 truncate">
                        <h3 className="mb-0 mt-0 !h-[32px] overflow-hidden pb-0 text-[22px]">
                          {shorten(space.name, 16)}
                        </h3>
                        {space.verified && (
                          <div className="pt-[1px]">
                            <IconVerifiedSpace turbo={space.turbo} />
                          </div>
                        )}
                      </div>
                      <div className="mb-[12px] text-skin-text">
                        {t('members', {
                          count: formatCompactNumber(space.followersCount),
                        })}
                      </div>
                    </BaseBlock>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
        {!loadingSpacesHome &&
          spacesHomeMetrics.total > spaces.length &&
          spaces.length >= 12 && (
            <div className="px-3 text-center md:px-0">
              <div className="mt-4 w-full">
                <TuneButton onClick={handleClickMore}>
                  {t('homeLoadmore')}
                </TuneButton>
              </div>

              <button>Load More</button>
            </div>
          )}
        {loadingMoreSpacesHome && (
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
