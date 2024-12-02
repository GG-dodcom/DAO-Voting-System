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
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IHoPlusSm } from '../assets/icons';

interface Props {
  form: any;
  setForm: any;
  userSelectedDateStart: any;
  setUserSelectedDateStart: any;
  setUserSelectedDateEnd: any;
  dateStart: number;
  dateEnd: number;
  isEditing: boolean;
}

const SortableChoice = ({
  id,
  choice,
  index,
  form,
  setForm,
  disableChoiceEdit,
}: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : undefined,
  };

  return (
    <div>
      <div
        className="flex items-start"
        ref={setNodeRef}
        style={style}
        {...attributes}
      >
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
                {...listeners} // Spread listeners on the drag handle
              >
                <BaseIcon name="draggable" size={'16'} className="mr-[12px]" />
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
            size="50"
            properties={`choices.${choice.key}.avatar`}
            form={form}
            setForm={setForm}
          />
        </div>
      </div>
    </div>
  );
};

const SpaceCreateVoting: React.FC<Props> = ({
  form,
  setForm,
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
      if (!userSelectedDateStart) {
        setForm((prev: any) => ({
          ...prev,
          start: Number((Date.now() / 1e3).toFixed()),
        }));
      }
    };

    initializeForm();
  }, []);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = form.choices.findIndex(
        (choice: any) => choice.key.toString() === active.id
      );
      const newIndex = form.choices.findIndex(
        (choice: any) => choice.key.toString() === over.id
      );

      const newChoices = arrayMove(form.choices, oldIndex, newIndex);
      setForm((prev: any) => ({ ...prev, choices: newChoices }));
    }
  };

  useEffect(() => {
    console.log('voting start', dateStart);
    console.log('voting end', dateEnd);
  }, [dateStart, dateEnd]);

  return (
    <div className="mb-5 space-y-4">
      <BaseBlock title={t('create.voting')}>
        <InputSelectVoteType
          type={form.type}
          disabled={!!form.type}
          onChangeType={(value) =>
            setForm((prev: any) => ({ ...prev, type: value }))
          }
        />
        <h4 className="mb-1 mt-3">{t('create.choices')}</h4>
        <div className="flex">
          <div className="w-full overflow-hidden">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={form.choices.map((choice: any) => choice.key.toString())}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {form.choices.map((choice: any, index: number) => (
                    <SortableChoice
                      key={choice.key.toString()}
                      id={choice.key.toString()}
                      choice={choice}
                      index={index}
                      form={form}
                      setForm={setForm}
                      disableChoiceEdit={disableChoiceEdit}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
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
          value={form.numOfQR}
          onChange={(value) => {
            setForm((prev: any) => ({
              ...prev,
              numOfQR: value,
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
