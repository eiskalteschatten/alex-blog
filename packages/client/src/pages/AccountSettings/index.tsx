import React from 'react';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ChangePasswordData, UserUpdate, passwordRegex } from '@frb/shared';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changePassword, update } from '@/store/entities/account';
import usePageTitle from '@/lib/usePageTitle';
import PageTitle from '@/components/PageTitle';
import Form from '@/components/Form';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Card from '@/components/Card';
import CardTitle from '@/components/CardTitle';

interface ChangePasswordForm extends ChangePasswordData {
  confirmPassword: string;
}

const AccountSettings: React.FC = () => {
  const { t } = useTranslation(['account', 'common']);
  const { isLoading, user } = useAppSelector(state => state.account);
  const dispatch = useAppDispatch();

  const updateForm = useForm<UserUpdate>();
  const onUpdateSubmit: SubmitHandler<UserUpdate> = values => dispatch(update(values));
  const passwordForm = useForm<ChangePasswordForm>();
  const onPasswordSubmit: SubmitHandler<ChangePasswordForm> = values => dispatch(changePassword(values));

  usePageTitle(t('account:accountSettings'));

  if (!user) {
    return null;
  }

  return (
    <div className='container mx-auto px-8'>
      <PageTitle>{t('account:accountSettings')}</PageTitle>

      <div className='flex flex-col lg:flex-row gap-12'>
        <Card className='w-full'>
          <CardTitle>{t('account:personalInformation')}</CardTitle>

          <Form onSubmit={updateForm.handleSubmit(onUpdateSubmit)}>
            <Input
              type='email'
              label={t('account:emailAddress')}
              defaultValue={user.email}
              required
              fullWidth
              {...updateForm.register('email', { required: true })}
            />

            <Input
              type='text'
              label={t('account:firstName')}
              defaultValue={user.firstName}
              required
              fullWidth
              {...updateForm.register('firstName', { required: true })}
            />

            <Input
              type='text'
              label={t('account:lastName')}
              defaultValue={user.lastName}
              required
              fullWidth
              {...updateForm.register('lastName', { required: true })}
            />

            <div className='text-center'>
              <Button type='submit' primary showLoader={isLoading}>{t('common:save')}</Button>
            </div>
          </Form>
        </Card>

        <Card className='w-full'>
          <CardTitle>{t('account:changeYourPassword')}</CardTitle>

          <Form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
            <Input
              type='password'
              label={t('account:currentPassword')}
              error={passwordForm.formState.errors.currentPassword?.message}
              required
              fullWidth
              {...passwordForm.register('currentPassword', { required: true })}
            />

            <Input
              type='password'
              label={t('account:password')}
              error={passwordForm.formState.errors.password?.message}
              required
              fullWidth
              {...passwordForm.register('password', {
                required: true,
                validate: {
                  matchesSchema: value => passwordRegex.test(value) || t('account:passwordSchemaInvalid'),
                },
              })}
            />

            <Input
              type='password'
              label={t('account:confirmPassword')}
              error={passwordForm.formState.errors.confirmPassword?.message}
              required
              fullWidth
              {...passwordForm.register('confirmPassword', {
                required: true,
                validate: {
                  passwordsEqual: value => value === passwordForm.getValues().password || t('account:passwordsDontMatch'),
                  matchesSchema: value => passwordRegex.test(value) || t('account:passwordSchemaInvalid'),
                },
              })}
            />

            <div className='text-center'>
              <Button type='submit' primary showLoader={isLoading}>{t('common:save')}</Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default AccountSettings;
