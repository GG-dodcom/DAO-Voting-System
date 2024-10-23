/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from '../hooks/useIntl';
import { useTranslation } from 'react-i18next';
import {
  AvatarEdit,
  BaseMarkdown,
  LabelInput,
  TuneErrorInput,
  TuneInput,
} from '.';
import { useImageUpload } from '../hooks';

interface Props {
  form: any;
  setForm: any;
  formDraft: any;
  setFormDraft: any;
  validationErrors: any;
  preview: boolean;
  bodyLimit: number;
}

const SpaceCreateContent: React.FC<Props> = ({
  form,
  setForm,
  formDraft,
  setFormDraft,
  validationErrors,
  preview,
  bodyLimit,
}) => {
  const { t } = useTranslation();
  const { formatNumber } = useIntl();
  const textAreaEl = useRef<HTMLTextAreaElement | null>(null);

  const [inputName, setInputName] = useState<string>(formDraft.name);
  const [inputBody, setInputBody] = useState<string>(formDraft.body);

  useEffect(() => {
    // Update form when inputBody changes
    setForm((prevForm: any) => ({
      ...prevForm,
      name: inputName,
      body: inputBody,
    }));

    // Update draft
    setFormDraft({
      ...formDraft,
      name: inputName,
      body: inputBody,
      isBodySet: inputBody.trim() !== '', // Set to true if body is not empty
    });
  }, [inputBody, inputName]);

  const injectImageToBody = (image: { name: string; url: string }) => {
    const cursorPosition = textAreaEl.current?.selectionStart ?? 0;
    const currentBody = textAreaEl.current?.value ?? '';
    const currentBodyWithImage = `${currentBody.substring(
      0,
      cursorPosition
    )} \n![${image.name}](${image.url})${currentBody.substring(
      cursorPosition as number
    )}`;

    setForm({ ...form, body: currentBodyWithImage });
  };

  const { upload } = useImageUpload();

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    for (const item of e.clipboardData.items) {
      if (item.kind === 'file' && item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          upload(
            new File([file], 'image', { type: file.type }),
            injectImageToBody
          );
        }
      }
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      if (formDraft) {
        // Update form and set inputBody from formDraft
        setForm({
          name: formDraft.name,
          body: formDraft.body,
          type: form.type,
        });
        setInputBody(formDraft.body);
      }
    };

    initializeData();
  }, []); // No dependencies, runs only once

  return (
    <div className="mb-5 px-4 md:px-0">
      <div className="flex flex-col space-y-3">
        <LabelInput>{t('create.avatar')}</LabelInput>
        <AvatarEdit
          size="80"
          properties={'avatar'}
          form={form}
          setForm={setForm}
          setFormDraft={setFormDraft}
        />

        {preview ? (
          <h1 className="w-full break-all">
            {form.name || t('create.untitled')}
          </h1>
        ) : (
          <TuneInput
            value={inputName}
            onChange={(value) => setInputName(value as string)}
            label={t('create.proposalTitle')}
            error={validationErrors?.name}
            autofocus
            data-testid="input-proposal-title"
          />
        )}

        {!preview && (
          <>
            <div className="flex justify-between">
              <LabelInput>{t('create.proposalDescription')}</LabelInput>
              <div className="text-xs">
                {formatNumber(form.body.length)} /{formatNumber(bodyLimit)}
              </div>
            </div>
            <div
              className={`peer min-h-[240px] overflow-hidden rounded-t-xl border focus-within:border-skin-text ${
                validationErrors?.body ? 'tune-error-border' : ''
              }`}
            >
              <textarea
                ref={textAreaEl}
                value={inputBody}
                onChange={(e) => setInputBody(e.target.value)}
                className="s-input mt-0 h-full min-h-[240px] w-full !rounded-xl border-none pt-0 text-base"
                data-testid="input-proposal-body"
                onPaste={handlePaste}
              />
            </div>
            {validationErrors?.body && (
              <TuneErrorInput error={validationErrors.body} />
            )}
          </>
        )}

        {form.body && preview && (
          <div className="mb-4">
            <BaseMarkdown body={form.body} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SpaceCreateContent;
