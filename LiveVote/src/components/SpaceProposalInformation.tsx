/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Proposal } from '../utils/interfaces';
import { BaseButtonIcon, TuneBlock, TuneBlockHeader } from '.';
import { t } from 'i18next';
import Tippy from '@tippyjs/react';
import { useIntl } from '../hooks/useIntl';
import { IHoDownloadFolder } from '../assets/icons';
import API_PATHS from '../utils/queries';
import { useRestfulAPI } from '../hooks';
import { downloadQRCodes } from '../utils/utils';

interface Props {
  proposal: Proposal;
}

const SpaceProposalInformation: React.FC<Props> = ({ proposal }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const { formatRelativeTime } = useIntl();
  const { fetchQuery } = useRestfulAPI();

  const [downloadLoading, setDownloadLoading] = useState(false);

  const downloadQRFolder = async () => {
    setDownloadLoading(true);
    // const response: any = await fetchQuery(API_PATHS.fetchTokenQR);
    // (response.tokenQR;

    //TODO: modify
    const tokenQr = [
      'QRToken1',
      'QRToken2',
      'QRToken3',
      'QRToken4',
      'QRToken5',
    ];

    await downloadQRCodes(tokenQr); // Wait for the download process to complete

    setDownloadLoading(false);
  };

  return (
    <TuneBlock header={<TuneBlockHeader title={t('information')} />}>
      <div className="space-y-1">
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

        {isAdmin && (
          <div className="flex justify-between items-center">
            <b>{t('proposal.tokenRedeemQR')}</b>
            <span className="flex items-center text-skin-link">
              {`${proposal.num_ofqr} Redeemable`}
              <Tippy content={t('proposal.downloadQR')}>
                <span>
                  <BaseButtonIcon
                    onClick={downloadQRFolder}
                    loading={downloadLoading}
                  >
                    <IHoDownloadFolder />
                  </BaseButtonIcon>
                </span>
              </Tippy>
            </span>
          </div>
        )}
      </div>
    </TuneBlock>
  );
};

export default SpaceProposalInformation;
