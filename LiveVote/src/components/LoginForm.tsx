/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useFlashNotification } from '../hooks/useFlashNotification';
import { BaseInput, BaseModal, TuneButton } from '.';
import { AdminAccount } from '../utils/interfaces';
import { useTranslation } from 'react-i18next';
import schemas from '../schemas';
import API_PATHS from '../utils/queries';
import { useRestfulAPI } from '../hooks';

interface LoginFormProps {
  account?: AdminAccount;
  open: boolean;
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ account, open, onClose }) => {
  const { notify } = useFlashNotification();
  const { t } = useTranslation();
  const { postQuery } = useRestfulAPI();

  const [form, setForm] = useState<AdminAccount>({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false); // State to manage loading
  const properties = schemas.adminAccount.properties;

  const submit = async () => {
    setLoading(true); // Set loading to true when the login starts

    // Convert the object to a JSON string
    const json = JSON.stringify(form);

    // Create a Blob from the JSON string
    const blob = new Blob([json], { type: 'application/json' });

    // Create a FormData object to send with the request
    const formData = new FormData();
    formData.append('account', blob);

    try {
      // Send the FormData to the backend
      const response = await postQuery(API_PATHS.adminlogin, formData);

      if (response.success) {
        // Handle successful login
        notify(['green', response.result.message]);
        // Reroute to admin home page
        window.location.href = '/admin';
      } else {
        // Handle unsuccessful login
        notify([
          'red',
          response.result.message ||
            'Login failed: Invalid username or password',
        ]);
      }
    } catch (error: any) {
      // Handle unexpected errors
      notify(['red', `An error occurred: ${error.message}`]);
    } finally {
      setLoading(false); // Set loading to false when the login process ends
      onClose();
    }
  };

  // Update form when modal opens
  useEffect(() => {
    if (open) {
      setForm({
        username: account?.username || '',
        password: account?.password || '',
      });
    }
  }, [open, account]);

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      header={
        <div className="flex flex-row items-center justify-center">
          <h3>{t('login.header')}</h3>
        </div>
      }
    >
      {/* Modal Body */}
      <div className="space-y-2 p-4">
        {/* Username Input */}
        <BaseInput
          value={form.username}
          onChange={(value) => setForm({ ...form, username: value })}
          title={t('login.username')}
          type="text"
          placeholder={t('login.usernamePlaceholder')}
          maxLength={properties.username.maxLength}
          focusOnMount
        />
        <BaseInput
          value={form.password}
          onChange={(value) => setForm({ ...form, password: value })}
          title={t('login.password')}
          type="password"
          placeholder={t('login.passwordPlaceholder')}
          maxLength={properties.password.maxLength}
          focusOnMount
        />
      </div>

      {/* Modal Footer */}
      <div className="p-4">
        <TuneButton
          type="submit"
          loading={loading}
          primary
          className="w-full"
          onClick={submit}
        >
          {t('submit')}
        </TuneButton>
      </div>
    </BaseModal>
  );
};

export default LoginForm;
