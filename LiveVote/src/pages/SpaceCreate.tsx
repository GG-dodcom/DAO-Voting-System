/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import {
  TheLayout,
  ButtonBack,
  SpaceCreateContent,
  SpaceCreateVoting,
  BaseBlock,
  TuneButton,
  NavbarAccount,
} from '../components';
import { ExtendedProposal } from '../utils/interfaces';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { t } from 'i18next';
import { useFormSpaceProposal } from '../hooks/useFormSpaceProposal';
import proposal from '../schemas/proposal.json';
import { useFlashNotification, useRestfulAPI } from '../hooks';
import API_PATHS from '../utils/queries';
import { useAccount } from 'wagmi';

enum Step {
  CONTENT,
  VOTING,
}

const SpaceCreate: React.FC = () => {
  const navigate = useNavigate();

  const spaceType = 'default';
  const bodyCharactersLimit = useMemo(
    () =>
      proposal.definitions.Proposal.properties.body.maxLengthWithSpaceType[
        spaceType
      ],
    [spaceType]
  );

  const {
    form,
    setForm,
    formDraft,
    setFormDraft,
    resetForm,
    validationErrors,
    setFormFromDraft,
    userSelectedDateStart,
    userSelectedDateEnd,
    setUserSelectedDateEnd,
    setUserSelectedDateStart,
  } = useFormSpaceProposal(spaceType);
  const { isConnected } = useAccount();
  const { postQuery, queryLoading } = useRestfulAPI();
  const { notify } = useFlashNotification();

  const proposalRef = useRef<ExtendedProposal>({
    id: '',
    title: '',
    body: '',
    avatar: '',
    choices: [{ id: '', name: '' }],
    state: 'pending',
    voting: {
      start: 0,
      end: 0,
      type: '',
      votes_num: 0,
    },
    create: 0,
  });
  const [validationLoading, setValidationLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>(Step.CONTENT);
  const isEditing = false;

  type DateRange = {
    dateStart: number;
    dateEnd?: number;
  };

  const sanitizeDateRange = useCallback(
    ({ dateStart, dateEnd }: DateRange): DateRange => {
      const threeDays = 259200;
      const currentTimestamp = Math.floor(Date.now() / 1000);

      const sanitizedDateStart = Math.max(dateStart, currentTimestamp);

      if (typeof dateEnd === 'undefined') {
        return { dateStart: sanitizedDateStart };
      }

      if (userSelectedDateEnd) {
        return { dateStart: sanitizedDateStart, dateEnd };
      }

      return {
        dateStart: sanitizedDateStart,
        dateEnd: sanitizedDateStart + threeDays,
      };
    },
    [userSelectedDateEnd]
  );

  const dateStart = useMemo(() => {
    const { dateStart } = sanitizeDateRange({ dateStart: form.start });
    return dateStart;
  }, [form.start, sanitizeDateRange]);

  const dateEnd = useMemo(() => {
    const { dateEnd } = sanitizeDateRange({
      dateStart: form.start,
      dateEnd: form.end,
    });
    return dateEnd;
  }, [form.end, form.start, sanitizeDateRange]);

  const stepIsValid = useMemo(() => {
    // Validating Step.CONTENT
    if (
      currentStep === 0 &&
      form.name &&
      form.body.length <= bodyCharactersLimit &&
      !validationErrors.name &&
      !validationErrors.body
    ) {
      return true;
    }

    // Validating voting step
    if (
      currentStep === Step.VOTING &&
      dateEnd &&
      dateStart &&
      dateEnd > dateStart &&
      !form.choices.some((choice, index) => choice.text === '' && index === 0)
    ) {
      return true;
    }

    return false;
  }, [
    currentStep,
    form.name,
    form.body.length,
    form.choices,
    bodyCharactersLimit,
    validationErrors.name,
    validationErrors.body,
    dateEnd,
    dateStart,
  ]);

  const getFormattedForm = () => {
    const clonedForm = { ...form }; // Cloning the form using spread operator
    clonedForm.choices = form.choices
      .map((choice, index) => ({
        key: index, // Generate a key based on index or use a unique identifier
        text: choice.text,
      }))
      .filter((choiceText) => choiceText.text.length > 0); // Filter out empty choices

    const { dateStart: sanitizedDateStart, dateEnd: sanitizedDateEnd } =
      sanitizeDateRange({
        dateStart: dateStart,
        dateEnd: dateEnd !== null ? dateEnd : 0, // Handle null case if needed
      });

    clonedForm.start = sanitizedDateStart;
    clonedForm.end = sanitizedDateEnd !== undefined ? sanitizedDateEnd : 0; // Set to 0 or any other default value

    return clonedForm;
  };

  const handleCreate = async () => {
    const formattedForm = getFormattedForm();
    // Map the form data to proposalRef
    proposalRef.current = {
      ...proposalRef.current,
      title: formattedForm.name,
      body: formattedForm.body,
      choices: formattedForm.choices.map(
        (choice: { key: number; text: string }) => ({
          id: choice.key.toString(),
          name: choice.text,
        })
      ),
      voting: {
        start: formattedForm.start,
        end: formattedForm.end,
        type: formattedForm.type,
        votes_num: formattedForm.votes_num,
      },
      create: parseInt((Date.now() / 1e3).toFixed()),
    };

    const response: any = await postQuery(
      API_PATHS.createProposal,
      formattedForm
    );

    if (response.success) {
      resetForm();
      notify(['green', t('notify.proposalCreated')]);
    } else {
      notify(['red', response.result.message]);
    }
    resetForm();
    navigate({ pathname: '/admin' });
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const previousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  useEffect(() => {
    console.log(form);
    console.log(
      'currentStep',
      currentStep,
      'form.name',
      form.name,
      form.body.length <= bodyCharactersLimit,
      validationErrors.name,
      !validationErrors.name,
      validationErrors.body,
      !validationErrors.body
    );
    console.log('isEdition', isEditing);
  }, [
    currentStep,
    form.name,
    form.body.length,
    form.choices,
    bodyCharactersLimit,
    validationErrors.name,
    validationErrors.body,
    dateEnd,
    dateStart,
    preview,
    form,
    isEditing,
  ]);

  useEffect(() => {
    const initializeData = async () => {
      if (formDraft) {
        setFormFromDraft();
      }
    };

    initializeData();
  }, []); // No dependencies, runs only once

  return (
    <TheLayout
      contentLeft={
        <div>
          {currentStep === Step.CONTENT && (
            <div className="mb-3 overflow-hidden px-4 md:px-0">
              <ButtonBack onClick={() => navigate({ pathname: '/admin' })} />
            </div>
          )}

          {/* Step 1 */}
          {currentStep === Step.CONTENT && (
            <SpaceCreateContent
              form={form}
              setForm={setForm}
              formDraft={formDraft}
              setFormDraft={setFormDraft}
              validationErrors={validationErrors}
              preview={preview}
              bodyLimit={bodyCharactersLimit}
            />
          )}

          {/* Step 2 */}
          {currentStep === Step.VOTING && (
            <SpaceCreateVoting
              form={form}
              setForm={setForm}
              formDraft={formDraft}
              userSelectedDateStart={userSelectedDateStart}
              setUserSelectedDateStart={setUserSelectedDateStart}
              setUserSelectedDateEnd={setUserSelectedDateEnd}
              dateStart={dateStart}
              dateEnd={dateEnd || 0}
              isEditing={isEditing}
            />
          )}
        </div>
      }
      sidebarRight={
        <BaseBlock className="lg:fixed lg:w-[320px]">
          {currentStep === Step.CONTENT ? (
            <TuneButton
              className="mb-2 block w-full"
              onClick={() => setPreview(!preview)}
            >
              {preview ? t('create.edit') : t('create.preview')}
            </TuneButton>
          ) : (
            <TuneButton className="mb-2 block w-full" onClick={previousStep}>
              {t('back')}
            </TuneButton>
          )}

          {currentStep === Step.VOTING ? (
            <TuneButton
              loading={queryLoading}
              className="block w-full"
              primary
              data-testid="create-proposal-publish-button"
              onClick={handleCreate}
            >
              {t('create.publish')}
            </TuneButton>
          ) : isConnected ? (
            <TuneButton
              className="block w-full"
              loading={validationLoading}
              disabled={(!stepIsValid && !!isConnected) || validationLoading}
              primary
              onClick={() => nextStep()}
            >
              {t('create.continue')}
            </TuneButton>
          ) : (
            <NavbarAccount />
          )}
        </BaseBlock>
      }
    />
  );
};

export default SpaceCreate;
