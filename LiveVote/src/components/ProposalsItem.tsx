/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import { Proposal } from '../utils/interfaces';
import removeMd from 'remove-markdown';
import {
  BaseAvatar,
  LabelProposalState,
  ProposalsItemBody,
  ProposalsItemFooter,
  ProposalsItemResults,
  ProposalsItemTitle,
} from '.';
import { Link } from 'react-router-dom';

interface Props {
  proposal: Proposal;
  voted: boolean;
  to: Record<string, unknown>;
}

const ProposalsItem: React.FC<Props> = ({ proposal, voted, to }) => {
  const body = useMemo(() => removeMd(proposal.body), [proposal.body]);

  return (
    <div>
      <div className="block p-3 text-skin-text sm:p-4">
        <div>
          <Link to={to as any} className="cursor-pointer">
            {/* <ProposalsItemTitle proposal={proposal} voted={voted} /> */}

            <div className="flex items-start justify-between items-center">
              <div className="flex items-center gap-1">
                <BaseAvatar
                  size={'50'}
                  src={`http://localhost:8080/${proposal.avatar}`}
                />
                <ProposalsItemTitle
                  proposal={proposal}
                  voted={voted}
                  className="ml-1"
                />
              </div>
              <LabelProposalState state={proposal.state} />
            </div>

            {body && <ProposalsItemBody>{body}</ProposalsItemBody>}

            {/* {proposal.scores_total &&
              proposal.scores_state === 'final' &&
              proposal.scores_total > 0 && (
                <ProposalsItemResults proposal={proposal} />
              )} */}
          </Link>

          <ProposalsItemFooter proposal={proposal} />
        </div>
      </div>
    </div>
  );
};

export default ProposalsItem;
