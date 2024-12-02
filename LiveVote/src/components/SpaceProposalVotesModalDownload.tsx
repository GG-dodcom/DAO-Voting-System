import React, { useMemo } from 'react';
import camelCase from 'lodash/camelCase';
import { BaseModal, TuneButton } from '.';
import { t } from 'i18next';
import { IHoClock, IHoExclamation } from '../assets/icons';

// Define Props
interface Props {
  open: boolean;
  errorCode: null | Error;
  onClose: () => void;
}

const SpaceProposalVotesModalDownload: React.FC<Props> = ({
  open,
  errorCode,
  onClose,
}) => {
  // Memoize the error message key prefix calculation
  const errorMessageKeyPrefix = useMemo(() => {
    const knownErrors = ['PENDING_GENERATION', 'UNSUPPORTED_ENV'];

    return `proposal.downloadCsvVotes.postDownloadModal.message.${camelCase(
      knownErrors.includes(errorCode?.message || '')
        ? errorCode?.message
        : 'UNKNOWN_ERROR'
    )}`;
  }, [errorCode]);

  return (
    <BaseModal open={open} onClose={onClose}>
      {{
        header: (
          <div className="flex flex-row items-center justify-center">
            <h3>{t('proposal.downloadCsvVotes.postDownloadModal.title')}</h3>
          </div>
        ),
        children: (
          <div className="m-4 text-center">
            {errorCode?.message === 'PENDING_GENERATION' ? (
              <IHoClock className="mx-auto my-4 text-center text-[3em]" />
            ) : (
              <IHoExclamation className="mx-auto my-4 text-center text-[3em] text-red" />
            )}
            <h3>{t(`${errorMessageKeyPrefix}.title`)}</h3>
            <p className="mt-3 italic">
              {t(`${errorMessageKeyPrefix}.description`)}
            </p>
          </div>
        ),
        footer: (
          <TuneButton className="w-full" primary onClick={onClose}>
            {t('close')}
          </TuneButton>
        ),
      }}
    </BaseModal>
  );
};

export default SpaceProposalVotesModalDownload;
