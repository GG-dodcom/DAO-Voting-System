import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { shorten } from '@/helpers/utils';
import { useInfiniteScroll } from '@vueuse/core'; // You may need to find an alternative for React.

import {
  BaseContainer,
  ExploreSkeletonLoading,
  BaseNoResults,
  BaseBlock,
  LoadingSpinner,
} from '../components';

import { useSpaces } from '@/hooks/useSpaces'; // Assume you have this hook

const ExploreSpaces: React.FC = () => {
  const location = useLocation();
  const {
    loadSpacesHome,
    loadMoreSpacesHome,
    loadingSpacesHome,
    spacesHome,
    spacesHomeMetrics,
  } = useSpaces();

  const [queryInput, setQueryInput] = useState({
    search: new URLSearchParams(location.search).get('q') || '',
    category: undefined,
  });

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
      <BaseContainer className="mb-4 flex flex-col flex-wrap items-center xs:flex-row md:flex-nowrap">
        <div className="mt-2 whitespace-nowrap text-right text-skin-text xs:ml-auto xs:mt-0">
          {spacesHomeMetrics.total && (
            <span>{`${spacesHomeMetrics.total} results`}</span>
          )}
        </div>
      </BaseContainer>

      <BaseContainer slim>
        {loadingSpacesHome ? (
          <ExploreSkeletonLoading isSpaces />
        ) : spaces.length < 1 ? (
          <BaseNoResults useBlock />
        ) : (
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {spaces.map((space) => (
              <div key={space.id}>
                <a href={`/spaceProposals/${space.id}`}>
                  <BaseBlock
                    className="mb-0 flex items-center justify-center text-center transition-all hover:border-skin-text"
                    style={{ height: '266px' }}
                  >
                    <div className="relative mb-2 inline-block">
                      <AvatarSpace
                        space={space}
                        symbolIndex="space"
                        size="82"
                        className="mb-1"
                      />
                    </div>
                    <div className="flex items-center justify-center gap-1 truncate">
                      <h3 className="mb-0 mt-0 !h-[32px] overflow-hidden pb-0 text-[22px]">
                        {shorten(space.name, 16)}
                      </h3>
                      {space.verified && (
                        <IconVerifiedSpace
                          turbo={space.turbo}
                          className="pt-[1px]"
                        />
                      )}
                    </div>
                    <div className="mb-[12px] text-skin-text">
                      {`${space.followersCount} members`}
                    </div>
                  </BaseBlock>
                </a>
              </div>
            ))}
          </div>
        )}
        {!loadingSpacesHome &&
          spacesHomeMetrics.total > spaces.length &&
          spaces.length >= 12 && (
            <div className="px-3 text-center md:px-0">
              <button className="mt-4 w-full btn" onClick={handleClickMore}>
                Load More
              </button>
            </div>
          )}
        {loadingMoreSpacesHome && (
          <div className="mt-4 flex h-[46px]">
            <LoadingSpinner className="mx-auto" big />
          </div>
        )}
      </BaseContainer>
    </div>
  );
};

export default ExploreSpaces;
