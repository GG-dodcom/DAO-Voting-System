import { TuneLoadingSpinner } from '../index';
// import { useApp } from './hooks/useApp';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'danger' | 'white';
  primary?: boolean;
  loading?: boolean;
  disabled?: boolean;
  useWhiteText?: boolean;
  children?: React.ReactNode;
}

const TuneButton: React.FC<ButtonProps> = ({
  type = 'button',
  variant,
  primary = false,
  loading = false,
  disabled = false,
  useWhiteText = false,
  className,
  children,
  ...args
}) => {
  //TODO: add useApp()
  // const { domain } = useApp();

  return (
    <button
      type={type}
      className={[
        'tune-button',
        primary ? 'primary' : '',
        variant === 'white' ? 'white-border' : '',
        variant === 'danger' ? 'danger' : '',
        disabled || loading ? 'disabled' : '',
        primary && !useWhiteText ? '!text-skin-bg' : '',
        className,
      ].join(' ')}
      disabled={disabled || loading}
      {...args}
    >
      {loading ? (
        <div className="mx-auto">
          <TuneLoadingSpinner />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default TuneButton;
