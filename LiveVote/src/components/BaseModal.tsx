import React, { useEffect, useRef } from 'react';
import { useWindowSize } from 'react-use'; // Similar to @vueuse/core
import { CSSTransition } from 'react-transition-group'; // For transition effects
import { BaseButtonIcon } from '.';
import '../assets/css/BaseModal.scss';
import { IHoX } from '../assets/icons';

interface BaseModalProps {
  open: boolean;
  hideClose?: boolean;
  maxHeight?: string;
  onClose?: () => void | undefined;
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({
  open,
  hideClose = false,
  maxHeight = '420px',
  onClose,
  children,
  header,
  footer,
}) => {
  const { height } = useWindowSize();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.style.setProperty('--height-style', `${height}px`);
    }
  }, [height]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (open) {
      document.body.classList.add('overflow-hidden');
      document.addEventListener('keydown', handleKeydown);
    } else {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', handleKeydown);
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <CSSTransition in={open} timeout={300} classNames="fade" unmountOnExit>
      <div className="modal z-50 mx-auto w-screen">
        <div className="backdrop" onClick={onClose} />
        <div
          className="shell relative overflow-hidden rounded-none md:rounded-3xl"
          ref={modalRef}
        >
          {/* Header */}
          {header && <div className="pt-3 text-center">{header}</div>}

          {/* Modal Body */}
          <div className="modal-body" style={{ maxHeight: maxHeight }}>
            {children}
          </div>

          {/* Footer */}
          {footer && <div className="border-t p-4 text-center">{footer}</div>}

          {/* Close Button */}
          {!hideClose && (
            <BaseButtonIcon
              className="absolute right-[20px] top-[20px]"
              onClick={onClose}
            >
              <IHoX className="text-[17px]" />
            </BaseButtonIcon>
          )}
        </div>
      </div>
    </CSSTransition>
  );
};

export default BaseModal;
