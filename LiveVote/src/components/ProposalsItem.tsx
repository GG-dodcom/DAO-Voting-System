/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import { useFlaggedMessageStatus } from '../hooks/useFlaggedMessageStatus';
import { Proposal } from '../utils/interfaces';
import removeMd from 'remove-markdown';
import {
  BaseAvatar,
  BaseLink,
  LabelProposalState,
  MessageWarningFlagged,
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
  hideSpaceAvatar?: boolean;
}

const ProposalsItem: React.FC<Props> = ({
  proposal,
  voted,
  to,
  hideSpaceAvatar = false,
}) => {
  const { isMessageVisible, setMessageVisibility } = useFlaggedMessageStatus(
    proposal.id
  );

  const body = useMemo(() => removeMd(proposal.body), [proposal.body]);

  return (
    <div>
      <div className="block p-3 text-skin-text sm:p-4">
        <div>
          {isMessageVisible ? (
            <MessageWarningFlagged
              type="proposal"
              onForceShow={() => setMessageVisibility(false)}
            />
          ) : (
            <>
              <div className="flex h-[26px] items-start justify-between">
                <div className="flex items-center gap-1">
                  {!hideSpaceAvatar && (
                    <>
                      <BaseLink
                        hide-external-icon={true}
                        link={`/proposal/${proposal.id}`}
                        className="text-skin-text"
                      >
                        <div className="flex items-center">
                          <BaseAvatar
                            size={'45'}
                            src={
                              typeof proposal.avatar === 'string'
                                ? proposal.avatar
                                : ''
                            }
                          />
                          {/* <img
                            src="https://ibb.co/ZK6MHBm"
                            alt="Description of the image"
                          /> */}
                          {/* <AvatarSpace
                            space={{
                              id: proposal.id,
                              avatar:
                                typeof proposal.avatar === 'string'
                                  ? proposal.avatar
                                  : undefined,
                            }}
                            size={'20'}
                          /> */}
                          <span className="ml-1 text-skin-link">
                            {proposal.title}
                          </span>
                        </div>
                      </BaseLink>
                    </>
                  )}
                </div>
                <LabelProposalState state={proposal.state || ''} />
              </div>

              <Link to={to as any} className="cursor-pointer">
                <ProposalsItemTitle proposal={proposal} voted={voted} />

                {body && <ProposalsItemBody>{body}</ProposalsItemBody>}

                {proposal.scores_total &&
                  proposal.scores_state === 'final' &&
                  proposal.scores_total > 0 && (
                    <ProposalsItemResults proposal={proposal} />
                  )}
              </Link>

              <ProposalsItemFooter proposal={proposal} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProposalsItem;
