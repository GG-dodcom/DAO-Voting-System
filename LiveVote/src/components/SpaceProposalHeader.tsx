/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Proposal } from '../utils/interfaces';
import { BaseAvatar, BaseButtonIcon, BaseMenu } from '.';
import {
  IHoDocumentDuplicate,
  IHoDotsHorizontal,
  IHoPencil,
  IHoTrash,
} from '../assets/icons';
import { t } from 'i18next';
import { useRestfulAPI } from '../hooks';
import API_PATHS from '../utils/queries';
import { useFlashNotification } from '../context';
import { useNavigate } from 'react-router-dom';
import { useFormSpaceProposal } from '../hooks/useFormSpaceProposal';

interface Props {
  proposal: Proposal;
  isAdmin: boolean;
}

const SpaceProposalHeader: React.FC<Props> = ({ proposal, isAdmin }) => {
  const navigate = useNavigate();
  const { notify } = useFlashNotification();
  const { resetForm } = useFormSpaceProposal();
  const { postQuery, queryLoading } = useRestfulAPI();

  const threeDotItems = () => {
    const items: { text: string; action: string }[] = [];
    if (proposal.state === 'pending')
      items.push({ text: t('edit'), action: 'edit' });
    items.push({ text: t('duplicate'), action: 'duplicate' });
    items.push({ text: 'Delete', action: 'delete' });

    return items;
  };

  const deleteProposal = async () => {
    const result: any = await postQuery(API_PATHS.deleteProposal, {
      id: proposal.id,
    });
    console.log('Result', result);
    if (result.id) {
      notify(['green', t('notify.proposalDeleted')]); // Replace with your localization function
      navigate('/');
    }
  };

  const handleSelect = async (e: string) => {
    if (!proposal) return;
    if (e === 'delete') deleteProposal();
    if (e === 'duplicate' || e === 'edit') {
      resetForm();
      navigate(`/spaceCreate`, {
        state: {
          key: proposal.id,
          editing: e === 'edit' ? 'true' : undefined,
        },
      });
    }
  };

  return (
    <div className="mb-4 flex">
      <div className="flex items-center space-x-1">
        <div className="flex items-center">
          <BaseAvatar
            src={typeof proposal.avatar === 'string' ? proposal.avatar : ''}
            size={'48'}
          />
          <h1
            className="ml-1 group-hover:text-skin-link break-words text-xl leading-8 sm:leading-[44px] sm:text-2xl"
            data-testid="proposal-page-title"
          >
            {proposal.title}
          </h1>
        </div>
      </div>
      <div className="flex grow items-center space-x-3">
        {isAdmin ? (
          <BaseMenu
            className="!ml-auto pl-3"
            items={threeDotItems()}
            onSelect={handleSelect}
          >
            {{
              button: (
                <BaseButtonIcon loading={queryLoading} className="!p-0">
                  <IHoDotsHorizontal />
                </BaseButtonIcon>
              ),
              item: (item) => (
                <div className="flex items-center gap-2">
                  {item.action === 'edit' && <IHoPencil />}
                  {item.action === 'duplicate' && <IHoDocumentDuplicate />}
                  {item.action === 'delete' && <IHoTrash />}
                  {item.text}
                </div>
              ),
            }}
          </BaseMenu>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SpaceProposalHeader;
