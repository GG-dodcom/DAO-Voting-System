import { useTranslation } from 'react-i18next';

export default function NavbarAccount() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center">
      <w3m-button
        label={t('connectWallet')}
        balance="show"
        size="md"
        loadingLabel="Connecting"
      />
    </div>
  );
}
