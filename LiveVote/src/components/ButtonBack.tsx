import React from 'react';
import { IHoArrowSmLeft } from '../assets/icons';
import { useTranslation } from 'react-i18next';

interface ButtonBackProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name?: string;
}

const ButtonBack: React.FC<ButtonBackProps> = ({ name, ...args }) => {
  const { t } = useTranslation();

  return (
    <button type="button" {...args}>
      <div className="inline-flex items-center gap-1 text-skin-text hover:text-skin-link">
        {/* Replace with the correct icon implementation */}
        <IHoArrowSmLeft />
        {name ? name : t('back')}
      </div>
    </button>
  );
};

export default ButtonBack;
