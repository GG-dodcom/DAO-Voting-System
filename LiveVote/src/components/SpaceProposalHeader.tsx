/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Proposal } from "../utils/interfaces";
import {
	BaseAvatar,
	BaseButtonIcon,
	BaseMenu,
	BaseMessageBlock,
	QRCodeScanner,
	TuneModal,
	TuneModalTitle,
} from ".";
import {
	IHoDocumentDuplicate,
	IHoDotsHorizontal,
	IHoPencil,
	IHoTrash,
	ISScanqr,
} from "../assets/icons";
import { t } from "i18next";
import { useRestfulAPI } from "../hooks";
import API_PATHS from "../utils/queries";
import { useFlashNotification } from "../context";
import { useNavigate } from "react-router-dom";
import { useFormSpaceProposal } from "../hooks/useFormSpaceProposal";
import { useAppKitAccount } from "@reown/appkit/react";

interface Props {
	proposal: Proposal;
	isAdmin: boolean;
}

const SpaceProposalHeader: React.FC<Props> = ({ proposal, isAdmin }) => {
	const navigate = useNavigate();
	const { notify } = useFlashNotification();
	const { resetForm } = useFormSpaceProposal();
	const { postQuery, fetchQuery, queryLoading } = useRestfulAPI();
	const { address, isConnected } = useAppKitAccount();

	const [isOpenQrModal, setOpenQrModal] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);

	const threeDotItems = () => {
		const items: { text: string; action: string }[] = [];
		if (proposal.state === "pending")
			items.push({ text: t("edit"), action: "edit" });
		items.push({ text: t("duplicate"), action: "duplicate" });
		items.push({ text: "Delete", action: "delete" });

		return items;
	};

	const openQrModal = () => {
		if (isConnected) setOpenQrModal(!isOpenQrModal);
		else notify(["red", "Please connect wallet before redeem token."]);
	};

	const closeQrModal = () => {
		setOpenQrModal(false);
	};

	const checkTokenRedeem = async (scanned: string) => {
		if (!scanned) return;
		setIsProcessing(true);

		const validate: any = await fetchQuery(API_PATHS.validQrStatus, {
			qrcode: scanned,
		});

		const redeemToken: any = await fetchQuery(API_PATHS.redeemToken, {
			roomId: proposal.proposalId,
			userAddress: address,
		});

		//TODO: check is scanned text able to get token or not
		const isRedeemable: any = await fetchQuery(API_PATHS.updateQrStatus, {
			roomId: proposal.proposalId,
			userAddress: address,
			qrcode: scanned,
		});

		if (isRedeemable.success) {
			notify(["green", isRedeemable.message]);
		} else {
			notify(["red", isRedeemable.message]);
		}
		closeQrModal();
	};

	const deleteProposal = async () => {
		const result: any = await postQuery(API_PATHS.deleteProposal, {
			id: proposal.proposalId,
		});
		console.log("Result", result);
		if (result.id) {
			notify(["green", t("notify.proposalDeleted")]); // Replace with your localization function
			navigate("/");
		}
	};

	const handleSelect = async (e: string) => {
		if (!proposal) return;
		if (e === "delete") deleteProposal();
		if (e === "duplicate" || e === "edit") {
			resetForm();
			navigate(`/spaceCreate`, {
				state: {
					key: proposal.proposalId,
					editing: e === "edit" ? "true" : undefined,
				},
			});
		}
	};

	return (
		<div className="mb-4 flex">
			<div className="flex items-center space-x-1">
				<div className="flex items-center">
					<BaseAvatar
						src={`http://localhost:8080/${proposal.avatar}`}
						size={"48"}
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
				{!isAdmin && (
					<BaseButtonIcon onClick={openQrModal} className="ml-3">
						<ISScanqr className="h-[46px] w-[46px]" />
					</BaseButtonIcon>
				)}

				{/*  {isAdmin ? (
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
        )}  */}
			</div>

			<TuneModal open={isOpenQrModal} onClose={closeQrModal}>
				<div className="mx-3">
					<TuneModalTitle className="mt-3 mx-1">
						{t("scanQrLabel.")}
					</TuneModalTitle>

					<div className="space-y-3 text-skin-link">
						<BaseMessageBlock level={"info"}>
							<span>{t("scanQrMessage")}</span>
						</BaseMessageBlock>
					</div>

					<div className="h-[229.5px] mb-3 mt-3 flex gap-x-[12px]">
						<QRCodeScanner
							onScanned={(scanned: string) => {
								if (!isProcessing) checkTokenRedeem(scanned);
							}}
						/>
					</div>
				</div>
			</TuneModal>
		</div>
	);
};

export default SpaceProposalHeader;
