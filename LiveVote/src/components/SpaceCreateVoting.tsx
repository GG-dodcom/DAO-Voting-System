/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo } from 'react';
import { t } from 'i18next';
import {
  BaseBlock,
  BaseButtonRound,
  BaseIcon,
  InputSelectVoteType,
  SpaceCreateVotingDateStart,
  UiInput,
  SpaceCreateVotingDateEnd,
  AvatarEdit,
  TuneInput,
} from '.';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { IHoPlusSm } from '../assets/icons';

interface Props {
  form: any;
  setForm: any;
  formDraft: any;
  setFormDraft: any;
  userSelectedDateStart: any;
  setUserSelectedDateStart: any;
  setUserSelectedDateEnd: any;
  dateStart: number;
  dateEnd: number;
  isEditing: boolean;
}

const SpaceCreateVoting: React.FC<Props> = ({
  form,
  setForm,
  formDraft,
  setFormDraft,
  userSelectedDateStart,
  setUserSelectedDateStart,
  setUserSelectedDateEnd,
  dateStart,
  dateEnd,
  isEditing,
}) => {
  const disableChoiceEdit = useMemo(() => form.type === 'basic', [form.type]);

  const addChoices = (num: number) => {
    setForm((prev: { choices: any[] }) => ({
      ...prev,
      choices: [
        ...prev.choices,
        ...Array(num)
          .fill(0)
          .map((_, i) => ({
            key: prev.choices.length + i,
            text: '',
          })),
      ],
    }));

    setFormDraft(form);
  };

  const setDateStart = (ts: number) => {
    setForm((prev: any) => ({ ...prev, start: ts }));
    setUserSelectedDateStart(true);
  };

  const setDateEnd = (ts: number) => {
    setForm((prev: any) => ({ ...prev, end: ts }));
    setUserSelectedDateEnd(true);
  };

  useEffect(() => {
    const initializeForm = async () => {
      // Initialize the start date to current
      if (!formDraft && !userSelectedDateStart) {
        setForm((prev: any) => ({
          ...prev,
          start: Number((Date.now() / 1e3).toFixed()),
          choices: prev.choices || [], // Initialize choices if undefined
        }));
      }
    };

    initializeForm();
  }, []);

  useEffect(() => {
    console.log('voting', form);
  }, [form]);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const newChoices = Array.from(form.choices);
    const [reorderedItem] = newChoices.splice(result.source.index, 1);
    newChoices.splice(result.destination.index, 0, reorderedItem);
    setForm((prev: any) => ({ ...prev, choices: newChoices }));
  };

  return (
    <div className="mb-5 space-y-4">
      <BaseBlock title={t('create.voting')}>
        <InputSelectVoteType
          type={form.type}
          disabled={!!form.type}
          onChangeType={(value) =>
            setForm((prev: any) => ({ ...prev, type: value || '' }))
          }
        />
        <h4 className="mb-1 mt-3">{t('create.choices')}</h4>
        <div className="flex">
          <div className="w-full overflow-hidden">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="choices">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2"
                  >
                    {form.choices.map((choice: any, index: number) => (
                      <Draggable
                        key={choice.key}
                        draggableId={`choice-${choice.key}`}
                        index={index}
                        isDragDisabled={disableChoiceEdit}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="flex items-start">
                              <UiInput
                                value={choice.text}
                                onChange={(value) => {
                                  const newChoices = [...form.choices];
                                  newChoices[index].text = value as string;
                                  setForm((prev: any) => ({
                                    ...prev,
                                    choices: newChoices,
                                  }));
                                }}
                                maxLength={'32'}
                                disabled={disableChoiceEdit}
                                placeholder={index > 0 ? t('optional') : ''}
                                className="group flex-1 mr-4"
                                focusOnMount={index === 0}
                                data-testid={`input-proposal-choice-${index}`}
                              >
                                {{
                                  label: (
                                    <div
                                      className={`drag-handle flex cursor-grab items-center active:cursor-grabbing 
                                    ${
                                      disableChoiceEdit
                                        ? 'cursor-not-allowed active:cursor-not-allowed'
                                        : ''
                                    }`}
                                    >
                                      <BaseIcon
                                        name="draggable"
                                        size={'16'}
                                        className="mr-[12px]"
                                      />
                                      {t('create.choice', { 0: [index + 1] })}
                                    </div>
                                  ),
                                  info: (
                                    <span className="hidden text-xs text-skin-text group-focus-within:block">
                                      {`${choice.text.length}/32`}
                                    </span>
                                  ),
                                }}
                              </UiInput>
                              <div className="flex flex-col">
                                <AvatarEdit
                                  address={parseInt(
                                    (Date.now() / 1e3).toFixed()
                                  ).toString()}
                                  size="50"
                                  properties={`choices.${choice.key}.avatar`}
                                  form={form}
                                  setForm={setForm}
                                  // setFormDraft={setFormDraft}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          {!disableChoiceEdit && (
            <div className="ml-2 flex w-[48px] items-end">
              <BaseButtonRound size="42px" onClick={() => addChoices(1)}>
                <IHoPlusSm className="text-skin-link" />
              </BaseButtonRound>
            </div>
          )}
        </div>
      </BaseBlock>

      <BaseBlock title={t('create.votingQR')}>
        <TuneInput
          type={'number'}
          value={form.votes_num}
          onChange={(value) => {
            setForm((prev: any) => ({
              ...prev,
              votes_num: value,
            }));
          }}
          label={t('create.votes_num')}
          autofocus
        />
      </BaseBlock>

      <BaseBlock
        title={t('create.period')}
        information={t('create.votingPeriodExplainer')}
      >
        <div className="space-y-2 md:flex md:space-x-3 md:space-y-0">
          <SpaceCreateVotingDateStart
            date={dateStart}
            isEditing={isEditing}
            onSelect={(value) => setDateStart(value)}
          />

          <SpaceCreateVotingDateEnd
            date={dateEnd}
            isEditing={isEditing}
            onSelect={(value) => setDateEnd(value)}
          />
        </div>
      </BaseBlock>
    </div>
  );
};

export default SpaceCreateVoting;
