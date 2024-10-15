import React, { useEffect } from 'react';
import { Proposal } from '../utils/interfaces';
import BaseLink from './BaseLink';
import { AvatarSpace, BaseAvatar } from '.';

interface Props {
  proposal: Proposal;
  isAdmin: boolean;
  isModerator: boolean;
}

const SpaceProposalHeader: React.FC<Props> = ({
  proposal,
  isAdmin,
  isModerator,
}) => {
  // const history = useHistory();
  // const { send, isSending } = useClient();
  // const { removeSpaceProposal } = useProposals();
  // const { notify } = useFlashNotification();
  // const { web3Account } = useWeb3();
  // const { resetForm } = useFormSpaceProposal();
  // const { profiles, loadProfiles } = useProfiles();

  // const isCreator = proposal?.author === web3Account.value;

  // const threeDotItems = () => {
  //   const items: { text: string; action: string }[] = [];
  //   if (isCreator && proposal.state === 'pending')
  //     items.push({ text: 'Edit', action: 'edit' });
  //   items.push({ text: 'Duplicate', action: 'duplicate' });

  //   if ((isAdmin || isModerator) && !proposal.flagged) {
  //     items.push({ text: 'Flag', action: 'flag' });
  //   } else {
  //     items.push({ text: 'Report', action: 'report' });
  //   }
  //   if (isAdmin || isModerator || isCreator)
  //     items.push({ text: 'Delete', action: 'delete' });

  //   return items;
  // };

  // const deleteProposal = async () => {
  //   const result = await send(space, 'delete-proposal', { proposal });
  //   console.log('Result', result);
  //   if (result.id) {
  //     removeSpaceProposal(proposal.id);
  //     notify(['green', 'Proposal deleted']); // Replace with your localization function
  //     history.push('/spaceProposals'); // Adjust to your routing structure
  //   }
  // };

  // const handleSelect = async (e: string) => {
  //   if (!proposal) return;
  //   switch (e) {
  //     case 'delete':
  //       deleteProposal();
  //       break;
  //     case 'report':
  //       window.open('https://tally.so/r/mDBEGb', '_blank');
  //       break;
  //     case 'flag':
  //       await send(space, 'flag-proposal', { proposal });
  //       break;
  //     case 'duplicate':
  //     case 'edit':
  //       resetForm();
  //       history.push({
  //         pathname: '/spaceCreate', // Adjust to your routing structure
  //         state: {
  //           key: proposal.space.id,
  //           sourceProposal: proposal.id,
  //           editing: e === 'edit',
  //         },
  //       });
  //       break;
  //     default:
  //       break;
  //   }
  // };

  return (
    <div>
      <h1
        className="break-words text-xl leading-8 sm:leading-[44px] sm:text-2xl"
        data-testid="proposal-page-title"
      >
        {proposal.title}
      </h1>

      <div className="mb-4 flex">
        <div className="flex items-center space-x-1">
          <div className="flex items-center">
            <BaseAvatar
              src={typeof proposal.avatar === 'string' ? proposal.avatar : ''}
              size={'20'}
            />
            <span className="ml-1 group-hover:text-skin-link">
              {proposal.title}
            </span>
          </div>
        </div>
        <div className="flex grow items-center space-x-3">
          {/* {isAdmin ? (
            <></>
          ) : (
            // <BaseMenu
            //   className="!ml-auto pl-3"
            //   items={threeDotItems()}
            //   onSelect={handleSelect}
            // >
            //   {({ item }) => (
            //     <div className="flex items-center gap-2">
            //       {item.action === 'edit' && <i className="icon-pencil" />}
            //       {item.action === 'duplicate' && (
            //         <i className="icon-document-duplicate" />
            //       )}
            //       {(item.action === 'report' || item.action === 'flag') && (
            //         <i className="icon-flag" />
            //       )}
            //       {item.action === 'delete' && <i className="icon-trash" />}
            //       {item.text}
            //     </div>
            //   )}
            //   <BaseButtonIcon loading={isSending} className="!p-0">
            //   <i className="icon-dots-horizontal" />
            // </BaseButtonIcon>
            // </BaseMenu>
            <></>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default SpaceProposalHeader;
