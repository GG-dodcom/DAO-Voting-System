import React, { useEffect, useState } from 'react';
import { Proposal } from '../utils/interfaces';
import {
  BaseButtonIcon,
  SpaceProposalVotesModalDownload,
  TuneBlock,
  TuneBlockHeader,
  TuneButton,
} from '.';
import { useProposalVotes } from '../hooks/useProposalVotes';
import { t } from 'i18next';
import Tippy from '@tippyjs/react';
import { IHoDownload } from '../assets/icons';

interface Props {
  proposal: Proposal;
}

const VOTES_LIMIT = 6;

const SpaceProposalVotes: React.FC<Props> = ({ proposal }) => {
  const isSmallScreen = useBreakpoints(SNAPSHOT_BREAKPOINTS).smaller('sm');
  const { profiles, votes, loadingVotes, loadVotes } = useProposalVotes(
    proposal,
    VOTES_LIMIT
  );
  const { downloadVotes, isDownloadingVotes, errorCode } = useReportDownload();

  const [modalVotesOpen, setModalVotesOpen] = useState(false);
  const [showModalDownloadMessage, setShowModalDownloadMessage] =
    useState(false);

  const voteCount = proposal.votes;

  const downloadReport = async (proposalId: string) => {
    const response = await downloadVotes(proposalId);
    if (!response) {
      setShowModalDownloadMessage(true);
    }
  };

  useEffect(() => {
    const fetchVotes = async () => {
      await loadVotes();
    };
    fetchVotes();
  }, [proposal, loadVotes]);

  return (
    <>
      {proposal.votes > 0 && (
        <TuneBlock loading={loadingVotes} header={}>
          <TuneBlockHeader title={t('votes')} counter={voteCount}>
            {proposal.state === 'closed' && (
              <Tippy content={t('proposal.downloadCsvVotes.title')} delay={100}>
                <BaseButtonIcon
                  onClick={() => downloadReport(proposal.id)}
                  loading={isDownloadingVotes}
                  className="!p-0 !pr-1"
                >
                  <IHoDownload />
                </BaseButtonIcon>
              </Tippy>
            )}
          </TuneBlockHeader>
          {votes.map((vote, i) => (
            <SpaceProposalVotesItem
              key={i}
              vote={vote}
              proposal={proposal}
              isSmall={isSmallScreen}
              data-testid={`proposal-votes-list-item-${i}`}
              className="last:pb-0"
            />
          ))}
          {proposal.votes > VOTES_LIMIT && (
            <div className="pt-3">
              <TuneButton
                className="w-full"
                onClick={() => setModalVotesOpen(true)}
              >
                View all
              </TuneButton>
            </div>
          )}
          {showModalDownloadMessage && (
            <SpaceProposalVotesModalDownload
              open={showModalDownloadMessage}
              errorCode={errorCode}
              onClose={() => setShowModalDownloadMessage(false)}
            />
          )}
          <SpaceProposalVotesModal
            proposal={proposal}
            open={modalVotesOpen}
            onClose={() => setModalVotesOpen(false)}
          />
        </TuneBlock>
      )}
    </>
  );
};

export default SpaceProposalVotes;
