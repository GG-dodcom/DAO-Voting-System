import React from 'react';
import { CSSTransition } from 'react-transition-group';
import LoadingSpinner from './LoadingSpinner';
import { useTranslation } from 'react-i18next';

interface AvatarOverlayEditProps {
  loading: boolean;
  avatar?: string;
  isViewOnly?: boolean;
}

const AvatarOverlayEdit: React.FC<AvatarOverlayEditProps> = ({
  loading,
  avatar,
  isViewOnly,
}) => {
  const { t } = useTranslation();

  return (
    <CSSTransition in={!isViewOnly} timeout={300} classNames="fade">
      <div>
        {isViewOnly && (
          <div className="absolute bottom-0 left-0 right-0 top-0 cursor-not-allowed" />
        )}
        {!isViewOnly && (
          <div
            className={`group absolute bottom-0 left-0 right-0 top-0 flex cursor-pointer items-center justify-center rounded-full transition-colors ease-out ${
              loading ? 'bg-skin-border opacity-80' : ''
            } hover:bg-skin-border hover:opacity-80`}
          >
            {!loading ? (
              <div className="hidden transition-all ease-out group-hover:block">
                {avatar ? t('edit') : t('upload')}
              </div>
            ) : (
              <LoadingSpinner />
            )}
          </div>
        )}
      </div>
    </CSSTransition>
  );
};

export default AvatarOverlayEdit;
