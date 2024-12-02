import React, { useState } from 'react';
import { ModalVotingType, TuneButtonSelect } from '.';
import { t } from 'i18next';

interface Props {
  type?: string;
  hint?: string;
  allowAny?: boolean;
  disabled?: boolean;
  isDisabledSettings?: boolean;
  onChangeType: (newType: string | undefined) => void;
}

const InputSelectVoteType: React.FC<Props> = ({
  type = '',
  hint = '',
  allowAny = false,
  disabled = false,
  isDisabledSettings = false,
  onChangeType,
}) => {
  const [modalVotingTypeOpen, setModalVotingTypeOpen] = useState(false);

  const handleSelect = () => {
    if (!disabled && !isDisabledSettings) {
      setModalVotingTypeOpen(true);
    }
  };

  return (
    <>
      <TuneButtonSelect
        label={t(`settings.type.label`)}
        hint={hint}
        modelValue={type ? t(`voting.${type}.label`) : t('settings.anyType')}
        disabled={disabled || isDisabledSettings}
        tooltip={disabled ? t('create.typeEnforced') : null}
        onSelect={handleSelect}
      />

      {modalVotingTypeOpen && (
        <ModalVotingType
          selected={type}
          open={modalVotingTypeOpen}
          allowAny={allowAny}
          onChangeSelected={(newType) => onChangeType(newType)}
          onClose={() => setModalVotingTypeOpen(false)}
        />
      )}
    </>
  );
};

export default InputSelectVoteType;
