/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from '../hooks/useIntl';
import { useTranslation } from 'react-i18next';
import {
  AvatarEdit,
  BaseIcon,
  BaseLink,
  BaseMarkdown,
  LabelInput,
  LoadingSpinner,
  TuneErrorInput,
  TuneInput,
} from '.';
import Tippy from '@tippyjs/react';
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
  const [imageDragging, setImageDragging] = useState(false);
  const textAreaEl = useRef<HTMLTextAreaElement | null>(null);

  const [inputName, setInputName] = useState<string>(form.name);
  const [inputBody, setInputBody] = useState<string>(form.body);

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
      choices: formDraft?.choices || form.choices,
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

  const { upload, imageUploadError, isUploadingImage } = useImageUpload();

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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    for (const item of e.dataTransfer.files) {
      if (item.type.startsWith('image/')) {
        upload(item, injectImageToBody);
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
          choices: formDraft.choices || form.choices,
          start: form.start,
          end: form.end,
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
          address={parseInt((Date.now() / 1e3).toFixed()).toString()}
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
              onDrop={handleDrop}
              onDragOver={() => setImageDragging(true)}
              onDragLeave={() => setImageDragging(false)}
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
            {/* <label
              className={`relative flex items-center justify-between rounded-b-xl border border-t-0 px-2 py-1 peer-focus-within:border-skin-text ${
                validationErrors?.body ? 'tune-error-border' : ''
              }`}
            >
              <input
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                className="absolute bottom-0 left-0 right-0 top-0 ml-0 w-full p-[5px] opacity-0"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    upload(file, injectImageToBody);
                  }
                }}
              />
              <span className="pointer-events-none relative pl-1 text-sm">
                {isUploadingImage ? (
                  <span className="flex">
                    <LoadingSpinner small className="-mt-[2px] mr-2" />
                    {t('create.uploading')}
                  </span>
                ) : imageUploadError !== '' ? (
                  <span>{imageUploadError}</span>
                ) : (
                  <span>{t('create.uploadImageExplainer')}</span>
                )}
              </span>
              <Tippy content={t('create.markdown')}>
                <BaseLink
                  link="https://docs.github.com/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
                  hide-external-icon
                  className="relative inline"
                >
                  <BaseIcon name="markdown" className="text-skin-text" />
                </BaseLink>
              </Tippy>
            </label> */}
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
