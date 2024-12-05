/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import {
  TheLayout,
  ButtonBack,
  SpaceCreateContent,
  SpaceCreateVoting,
  BaseBlock,
  TuneButton,
} from '../components';
import { useCallback, useMemo, useState } from 'react';
import { t } from 'i18next';
import { useFormSpaceProposal } from '../hooks/useFormSpaceProposal';
import proposal from '../schemas/proposal.json';
import API_PATHS from '../utils/queries';
import { useFlashNotification } from '../context';

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
    userSelectedDateStart,
    userSelectedDateEnd,
    setUserSelectedDateEnd,
    setUserSelectedDateStart,
  } = useFormSpaceProposal(spaceType);
  const { notify } = useFlashNotification();

  const [preview, setPreview] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>(Step.CONTENT);
  const [loading, setLoading] = useState<boolean>(false);
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
      form.avatar.file &&
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
      !form.choices.some(
        (choice, index) => choice.text === '' && index === 0
      ) &&
      !form.choices.find(
        (choice: any) => choice.text.trim() !== '' && !choice.avatar?.file // Text exists but no image
      ) &&
      !form.choices.find(
        (choice: any) => choice.avatar?.file && choice.text.trim() === '' // Image exists but no text
      )
    ) {
      return true;
    }

    return false;
  }, [
    currentStep,
    form,
    form.name,
    form.avatar.file,
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
        avatar: {
          file: choice.avatar.file || null,
          url: choice.avatar.url,
        },
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
    setLoading(true);

    const formattedForm = getFormattedForm();
    const formData = new FormData();

    const jsonData = {
      title: formattedForm.name,
      body: formattedForm.body,
      symbol: 'VOTE',
      choices: formattedForm.choices.map((choice) => ({ name: choice.text })),
      startDate: formattedForm.start,
      endDate: formattedForm.end,
      type: formattedForm.type,
      numOfQR: formattedForm.numOfQR,
      createDate: parseInt((Date.now() / 1e3).toFixed()),
    };

    // Manually set the JSON part with a Blob and specify Content-Type as 'application/json'
    formData.append(
      'proposalData',
      new Blob([JSON.stringify(jsonData)], { type: 'application/json' })
    );

    // Append the main avatar file
    if (formattedForm.avatar.file)
      formData.append('files', formattedForm.avatar.file);

    // Append the choice avatars
    formattedForm.choices.forEach((choice) => {
      if (choice.avatar.file) formData.append('files', choice.avatar.file);
    });

    try {
      const response: any = await fetch(API_PATHS.createProposal, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log('result', result);

      if (response.ok) {
        resetForm();
        notify(['green', result.message]);
      } else {
        notify(['red', result.message || 'Fail to create proposal']);
      }
    } catch (error) {
      notify(['red', error]);
    } finally {
      setLoading(false);
    }
    resetForm();
    navigate('/');
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const previousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  // useEffect(() => {
  //   console.log('form', form);
  //   console.log('formDraft', formDraft);
  // }, [form]);

  return (
    <TheLayout
      contentLeft={
        <div>
          {currentStep === Step.CONTENT && (
            <div className="mb-3 overflow-hidden px-4 md:px-0">
              <ButtonBack onClick={() => navigate(-1)} />
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
              loading={loading}
              disabled={!stepIsValid}
              className="block w-full"
              primary
              data-testid="create-proposal-publish-button"
              onClick={handleCreate}
            >
              {t('create.publish')}
            </TuneButton>
          ) : (
            <div>
              <TuneButton
                className="block w-full"
                disabled={!stepIsValid}
                primary
                onClick={() => nextStep()}
              >
                {t('create.continue')}
              </TuneButton>
            </div>
          )}
        </BaseBlock>
      }
    />
  );
};

export default SpaceCreate;
