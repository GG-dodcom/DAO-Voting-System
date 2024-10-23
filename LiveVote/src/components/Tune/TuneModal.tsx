import React, { Fragment, useEffect } from 'react';
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  Transition,
} from '@headlessui/react';
import { BaseButtonIcon } from '..';
import { IHoX } from '../../assets/icons';
import { useMediaQuery } from 'react-responsive';

interface Props {
  open: boolean;
  hideClose?: boolean;
  size?: 'big' | 'medium';
  onClose: () => void;
  children: React.ReactNode;
}

const TuneModal: React.FC<Props> = ({
  open,
  hideClose = false,
  size,
  onClose,
  children,
}) => {
  const sizeClass = React.useMemo(() => {
    switch (size) {
      case 'big':
        return 'md:w-[860px] w-full';
      case 'medium':
        return 'md:w-[578px] w-full';
      default:
        return 'md:w-[440px] w-full';
    }
  }, [size]);

  const closePositionClass = React.useMemo(() => {
    switch (size) {
      case 'big':
        return 'md:right-[28px] md:top-[16px] right-[10px] top-[10px]';
      case 'medium':
        return 'top-[12px] right-[10px]';
      default:
        return 'top-[12px] right-[10px]';
    }
  }, [size]);

  const breakpoints = {
    xs: '420px',
    sm: '544px',
    md: '768px',
    lg: '1012px',
    xl: '1280px',
    '2xl': '1536px',
  };

  // Use useMediaQuery to check if the screen size is at least 'md'
  const isDesktop = useMediaQuery({
    query: `(min-width: ${breakpoints.md}px)`,
  });

  const panelTransitionClasses = React.useMemo(() => {
    return isDesktop
      ? {
          enter: 'duration-300 ease-out',
          enterFrom: 'opacity-0 scale-95',
          enterTo: 'opacity-100 scale-100',
          leave: 'duration-200 ease-in',
          leaveFrom: 'opacity-100 scale-100',
          leaveTo: 'opacity-0 scale-95',
        }
      : {
          enter: 'duration-300 ease-out',
          enterFrom: 'opacity-0 translate-y-full',
          enterTo: 'opacity-100 translate-y-0',
          leave: 'duration-200 ease-in',
          leaveFrom: 'opacity-100 translate-y-0',
          leaveTo: 'opacity-0 translate-y-full',
        };
  }, [isDesktop]);

  // To handle body class based on open state
  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [open]);

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="bg-black/40 fixed inset-0" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex h-full items-end md:items-center justify-center md:p-4">
            <TransitionChild
              as={Fragment}
              enter={panelTransitionClasses.enter}
              enterFrom={panelTransitionClasses.enterFrom}
              enterTo={panelTransitionClasses.enterTo}
              leave={panelTransitionClasses.leave}
              leaveFrom={panelTransitionClasses.leaveFrom}
              leaveTo={panelTransitionClasses.leaveTo}
            >
              <DialogPanel
                className={`rounded-t-[20px] md:rounded-[20px] bg-skin-bg transform overflow-hidden align-middle transition-all ${sizeClass}`}
              >
                {!hideClose && (
                  <div className={`absolute ${closePositionClass}`}>
                    <BaseButtonIcon onClick={onClose}>
                      <span className="sr-only">Close</span>
                      <IHoX className="text-base" aria-hidden="true" />
                    </BaseButtonIcon>
                  </div>
                )}

                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TuneModal;
