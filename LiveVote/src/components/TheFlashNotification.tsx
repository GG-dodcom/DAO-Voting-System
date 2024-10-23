/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { IHoCheck, IHoExclamationCircle, IHoX } from '../assets/icons';
import { useFlashNotification } from '../context/useFlashNotification';

const TheFlashNotification: React.FC = () => {
  const { items } = useFlashNotification();
  const nodeRef = useRef(null); // Create a ref for the CSSTransition

  console.log('context:', items);

  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-60 mb-4 flex w-full flex-col items-center space-y-2">
      <TransitionGroup className={'fade'}>
        {items.map((item) => (
          <CSSTransition
            key={item.id}
            timeout={4000}
            classNames="fade"
            nodeRef={nodeRef}
          >
            <div className="pointer-events-auto w-full px-4 sm:max-w-[460px]">
              <div
                className={`flex w-full items-center justify-between rounded-full px-[18px] py-[12px] text-white 
                  ${item.type === 'red' ? 'bg-red' : 'bg-green'} `}
              >
                <div className="flex items-center gap-2 mr-2">
                  {item.type === 'red' && (
                    <IHoExclamationCircle className="shrink-0 text-base" />
                  )}
                  {item.type === 'green' && (
                    <IHoCheck className="shrink-0 text-base" />
                  )}
                  <span className="text-left">{item.message}</span>
                </div>

                <IHoX
                  className="shrink-0 cursor-pointer text-base"
                  onClick={item.remove}
                />
              </div>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default TheFlashNotification;
