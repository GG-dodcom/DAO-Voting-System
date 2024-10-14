// src/hooks/useFormSpaceProposal.ts
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { clone } from '@snapshot-labs/snapshot.js/src/utils';
import schemas from '../schemas';
import { validateForm } from './validation';

export interface ProposalForm {
  name: string;
  body: string;
  choices: { key: number; text: string; avatar: string }[];
  start: number;
  end: number;
  type: string;
  votes_num: number;
  avatar: string;
}

const EMPTY_PROPOSAL: ProposalForm = {
  name: '',
  body: '',
  choices: [
    { key: 0, text: '', avatar: '' },
    { key: 1, text: '', avatar: '' },
  ],
  start: parseInt((Date.now() / 1e3).toFixed()),
  end: 0,
  type: 'single-choice',
  votes_num: 0,
  avatar: '',
};

const EMPTY_PROPOSAL_DRAFT = {
  name: '',
  body: '',
  choices: [
    { key: 0, text: '', avatar: '' },
    { key: 1, text: '', avatar: '' },
  ],
  isBodySet: false,
  avatar: '',
};

export function useFormSpaceProposal(spaceType = 'default') {
  const [form, setForm] = useState<ProposalForm>(clone(EMPTY_PROPOSAL));
  const [formDraft, setFormDraft] = useLocalStorage<{
    name: string;
    body: string;
    choices: { key: number; text: string; avatar: string }[];
    isBodySet: boolean;
    avatar: '';
  }>(`proposal.draft`, clone(EMPTY_PROPOSAL_DRAFT));

  const [userSelectedDateStart, setUserSelectedDateStart] = useState(false);
  const [userSelectedDateEnd, setUserSelectedDateEnd] = useState(false);

  const resetForm = () => {
    setForm(clone(EMPTY_PROPOSAL));
    setFormDraft(clone(EMPTY_PROPOSAL_DRAFT));
    setUserSelectedDateEnd(false);
    setUserSelectedDateStart(false);
  };

  // Set form state based on formDraft
  const setFormFromDraft = () => {
    if (formDraft) {
      setForm({
        name: formDraft.name,
        body: formDraft.body,
        choices: formDraft.choices || EMPTY_PROPOSAL.choices,
        start: EMPTY_PROPOSAL.start,
        end: EMPTY_PROPOSAL.end,
        type: EMPTY_PROPOSAL.type,
        votes_num: EMPTY_PROPOSAL.votes_num,
      });
    }
  };

  const validationErrors = validateForm(schemas.proposal, form, {
    spaceType,
  });

  const isValid = Object.keys(validationErrors).length === 0;

  useEffect(() => {
    if (formDraft) {
      // Set the form to the current draft when it changes
      setForm((prevForm) => ({
        ...prevForm,
        ...formDraft,
      }));
    }
  }, [formDraft]);

  return {
    form,
    formDraft,
    setFormFromDraft,
    userSelectedDateStart,
    setUserSelectedDateStart,
    userSelectedDateEnd,
    setUserSelectedDateEnd,
    validationErrors,
    isValid,
    resetForm,
    setForm, // Expose setForm to update the form state directly
    setFormDraft: (newDraft: typeof EMPTY_PROPOSAL_DRAFT) => {
      setFormDraft(newDraft); // Update local storage
    },
  };
}
