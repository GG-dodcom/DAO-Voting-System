import React from 'react';
import { Proposal } from '../utils/interfaces';
import { TuneBlock, TuneBlockHeader } from '.';
import { t } from 'i18next';
import Tippy from '@tippyjs/react';
import { useIntl } from '../hooks/useIntl';

interface Props {
  proposal: Proposal;
}

const SpaceProposalInformation: React.FC<Props> = ({ proposal }) => {
  const { formatRelativeTime } = useIntl();

  return (
    <TuneBlock header={<TuneBlockHeader title={t('information')} />}>
      <div className="space-y-1">
        <div>
          <b>{t('eligibleVoters')}</b>
          <span className="float-right text-skin-link">
            {`${proposal.voting.votes_num} person(s)`}
          </span>
        </div>

        <div>
          <b>{t('proposal.votingSystem')}</b>
          <span className="float-right text-skin-link">
            {t(`voting.${proposal.voting.type}.label`)}
          </span>
        </div>

        <div>
          <b>{t('proposal.startDate')}</b>
          <Tippy content={formatRelativeTime(proposal.voting.start)}>
            <span className="float-right text-skin-link">
              {new Date(proposal.voting.start * 1e3).toLocaleDateString(
                'en-US',
                {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                }
              )}
            </span>
          </Tippy>
        </div>

        <div>
          <b>{t('proposal.endDate')}</b>
          <Tippy content={formatRelativeTime(proposal.voting.end)}>
            <span className="float-right text-skin-link">
              {new Date(proposal.voting.end * 1e3).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </Tippy>
        </div>
      </div>
    </TuneBlock>
  );
};

export default SpaceProposalInformation;
