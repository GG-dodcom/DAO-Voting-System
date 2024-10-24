import React, { useMemo, useRef } from 'react';
import { Proposal, Vote } from '../utils/interfaces';
import { shorten } from '../utils/utils';

interface Props {
  proposal: Proposal;
  vote: Vote;
  isSmall: boolean;
  onOpenReceiptModal: () => void;
}

const SpaceProposalVotesListItem: React.FC<Props> = ({
  proposal,
  vote,
  isSmall,
  onOpenReceiptModal,
}) => {
  const titles = useMemo(() => {
    return proposal.strategies.map((strategy) => strategy.params.symbol || '');
  }, [proposal.strategies]);

  const { formatCompactNumber } = useIntl();

  const balanceFormatted = useMemo(() => {
    const balance = formatCompactNumber(vote.balance);
    return balance.length >= 8 ? shorten(balance) : balance;
  }, [vote.balance, formatCompactNumber]);

  const handleOpenReceiptModal = () => {
    onOpenReceiptModal();
  };

  return (
    <div className={`py-[12px] ${isSmall ? 'py-[8px]' : ''}`}>
      <div
        className={`flex items-center gap-4 ${
          isSmall ? '' : 'justify-between'
        }`}
      >
        <div
          className={
            isSmall
              ? 'w-[136px] min-w-[136px] text-left'
              : 'w-[200px] min-w-[200px] text-left'
          }
        ></div>

        {!isSmall && (
          <SpaceProposalVotesListItemChoice proposal={proposal} vote={vote} />
        )}

        <div className="flex w-[130px] min-w-[130px] items-center justify-end whitespace-nowrap text-right text-skin-link">
          <Tippy
            content={vote.scores
              ?.map(
                (score, index) =>
                  `${formatCompactNumber(score)} ${titles[index]}`
              )
              .join(' + ')}
          >
            <span className="truncate">
              {`${balanceFormatted} ${shorten(
                proposal.symbol || 'VOTE',
                'symbol'
              )}`}
            </span>
          </Tippy>

          <BasePopover>
            <div className="flex">
              <BaseButtonIcon
                className="!p-0 ml-1"
                onClick={handleOpenReceiptModal}
              >
                <BaseIcon name="signature" />
              </BaseButtonIcon>
            </div>
            <div className="m-4 space-y-4">
              <h3 className="text-center">{'Receipt'}</h3>
              <BaseBlock slim className="p-4 text-skin-link">
                <div className="flex">
                  <span className="mr-1 flex-auto text-skin-text">
                    {'Author'}
                  </span>
                  <BaseLink
                    link={getIpfsUrl(vote.ipfs)}
                    className="text-skin-link"
                  >
                    #{vote.ipfs.slice(0, 7)}
                  </BaseLink>
                </div>
                {relayerIpfsHash.current && (
                  <div className="flex">
                    <span className="mr-1 flex-auto text-skin-text">
                      {'Relayer'}
                    </span>
                    <BaseLink
                      link={getIpfsUrl(relayerIpfsHash.current)}
                      className="text-skin-link"
                    >
                      #{relayerIpfsHash.current.slice(0, 7)}
                    </BaseLink>
                  </div>
                )}
              </BaseBlock>
              <BaseLink
                link={`https://signator.io/view?ipfs=${vote.ipfs}`}
                className="mb-2 block"
              >
                <TuneButton className="w-full" tabIndex={-1}>
                  {'Verify on Signatorio'}
                  <i className="ho-external-link mb-[2px] ml-1 inline-block text-xs" />
                </TuneButton>
              </BaseLink>
            </div>
          </BasePopover>
        </div>
      </div>

      {isSmall && (
        <SpaceProposalVotesListItemChoice
          proposal={proposal}
          vote={vote}
          className="mt-1"
        />
      )}
    </div>
  );
};

export default SpaceProposalVotesListItem;
