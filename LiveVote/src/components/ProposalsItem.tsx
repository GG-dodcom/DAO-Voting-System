/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo } from 'react';
import { useFlaggedMessageStatus } from '../hooks/useFlaggedMessageStatus';
import { Proposal } from '../utils/interfaces';
import removeMd from 'remove-markdown';
import {
  AvatarSpace,
  BaseLink,
  LabelProposalState,
  MessageWarningFlagged,
  ProposalsItemBody,
  ProposalsItemFooter,
  ProposalsItemResults,
  ProposalsItemTitle,
} from '.';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ProposalsItemProps {
  proposal: Proposal; //Proposal; //Profile
  voted: boolean;
  to: Record<string, unknown>;
  hideSpaceAvatar?: boolean;
}

const ProposalsItem: React.FC<ProposalsItemProps> = ({
  proposal,
  voted,
  to,
  hideSpaceAvatar = false,
}) => {
  const { t } = useTranslation();
  const { isMessageVisible, setMessageVisibility } = useFlaggedMessageStatus(
    proposal.id
  );

  const body = useMemo(
    () => removeMd(proposal.description),
    [proposal.description]
  );

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
                        link={`/proposal/${proposal.id}`}
                        hide-external-icon
                        className="text-skin-text"
                      >
                        <div className="flex items-center">
                          <AvatarSpace
                            space={{ id: proposal.id, avatar: proposal.avatar }}
                            size={'20'}
                          />
                          <span className="ml-1 text-skin-link">
                            {proposal.title}
                          </span>
                        </div>
                      </BaseLink>
                      <span>{t('proposalBy')}</span>
                    </>
                  )}
                  {/* <BaseUser
                    address={proposal.author}
                    profile={profiles[proposal.author]}
                    space={space}
                    proposal={proposal}
                    hideAvatar={!hideSpaceAvatar}
                  /> */}
                </div>
                <LabelProposalState state={proposal.state} />
              </div>

              <Link to={to as any} className="cursor-pointer">
                <ProposalsItemTitle proposal={proposal} voted={voted} />

                {body && <ProposalsItemBody>{body}</ProposalsItemBody>}

                {proposal.scores_state === 'final' &&
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
