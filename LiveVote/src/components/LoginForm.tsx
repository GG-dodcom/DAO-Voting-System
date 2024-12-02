/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useFlashNotification } from '../context';
import { BaseInput, BaseModal, TuneButton } from '.';
import { AdminAccount } from '../utils/interfaces';
import { useTranslation } from 'react-i18next';
import API_PATHS from '../utils/queries';
import { useRestfulAPI } from '../hooks';
import schemas from '../schemas';
import { useNavigate } from 'react-router-dom';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: (isAdmin: boolean) => void;
}

const LoginForm: React.FC<Props> = ({ open, onClose, onSuccess }) => {
  const { notify } = useFlashNotification();
  const { t } = useTranslation();
  const { postQuery, queryLoading } = useRestfulAPI();
  const navigate = useNavigate();

  const [form, setForm] = useState<AdminAccount>({
    username: '',
    password: '',
  });
  const properties = schemas.adminAccount.properties;

  const submit = async () => {
    // Send the FormData to the backend
    const response = await postQuery(API_PATHS.adminlogin, form);

    if (response.status == 200) {
      notify(['green', response.data.message]);
      onSuccess(true);
      // Reroute home page
      navigate('/');
    } else {
      notify(['red', response.status + ', ' + response.data.message]);
    }

    setForm({ username: '', password: '' });
  };

  return (
    <BaseModal open={open} hideClose={true} onClose={onClose}>
      {{
        header: (
          <div className="flex flex-row items-center justify-center">
            <h3>{t('login.header')}</h3>
          </div>
        ),
        children: (
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
            <div className=" p-4 text-center">
              <TuneButton
                type="submit"
                loading={queryLoading}
                primary
                className="w-full"
                onClick={submit}
              >
                {t('submit')}
              </TuneButton>
            </div>
          </div>
        ),
      }}
    </BaseModal>
  );
};

export default LoginForm;
