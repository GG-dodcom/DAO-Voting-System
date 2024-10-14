import React from 'react';
import { BaseModal, BaseModalSelectItem } from '.';
import { t } from 'i18next';

interface Props {
  open: boolean;
  selected: string;
  allowAny: boolean;
  onClose: () => void;
  onChangeSelected: (id: string | undefined) => void;
}

const types = [
  'single-choice',
  'approval',
  'quadratic',
  'ranked-choice',
  'weighted',
  'basic',
];

const ModalVotingType: React.FC<Props> = ({
  open,
  selected,
  allowAny,
  onClose,
  onChangeSelected,
}) => {
  const select = (id: string | undefined) => {
    onChangeSelected(id);
    onClose();
  };

  return (
    <BaseModal open={open} onClose={onClose}>
      {{
        header: <h3>{t('voting.selectVoting')}</h3>,
        children: (
          <div className="mx-0 my-4 flex flex-col space-y-3 md:mx-4">
            {allowAny && (
              <button onClick={() => select(undefined)}>
                <BaseModalSelectItem
                  selected={!selected}
                  title={t('settings.anyType')}
                />
              </button>
            )}
            {types.map((type, key) => (
              <button key={key} onClick={() => select(type)}>
                <BaseModalSelectItem
                  selected={type === selected}
                  title={t(`voting.${type}.label`)}
                  description={t(`voting.${type}.description`)}
                />
              </button>
            ))}
          </div>
        ),
      }}
    </BaseModal>
  );
};

export default ModalVotingType;
