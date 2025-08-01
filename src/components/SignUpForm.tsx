import { IonButton, IonSpinner } from '@ionic/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import { FcGoogle } from 'react-icons/fc';
// import Button from './Button';
import Input from './Input';
import ErrorText from './ErrorText';
import useAuthModal from '../hooks/useAuthModal';
import useAuth from '../hooks/useAuth';
import useFirebaseErrorMessage from '../hooks/useFirebaseErrorMessage';
import { UserSignUp, userSignUpSchema } from '../constants/schemas/auth';

const SignUpForm = () => {
  const { openAuthModal } = useAuthModal();
  const { createUser, createUserMutation } = useAuth();
  const errorMessage = useFirebaseErrorMessage(
    (createUserMutation.error as any)?.code
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSignUpSchema) });

  const submit = (values: UserSignUp) => {
    createUser(values);
  };

  const signingUp = createUserMutation.isLoading;

  return (
    <div className='container h-fit my-auto'>
      <h2 className='font-medium text-lg text-center'></h2>
      <h2 className='mb-10 font-medium text-lg text-center'>
        Create CubeJKiddies account
      </h2>
      <form onSubmit={handleSubmit(submit)}>
        <Input
          type='email'
          label='Email'
          labelPlacement='floating'
          {...register('email')}
          errorText={errors.email?.message}
        />
        <Input
          label='First name'
          labelPlacement='floating'
          {...register('firstName')}
          errorText={errors.firstName?.message}
        />
        <Input
          label='Last name'
          labelPlacement='floating'
          {...register('lastName')}
          errorText={errors.lastName?.message}
        />
        <Input
          type='password'
          label='Password'
          labelPlacement='floating'
          {...register('password')}
          errorText={errors.password?.message}
        />
        <Input
          type='password'
          label='Confirm password'
          labelPlacement='floating'
          {...register('confirmPassword')}
          errorText={errors.confirmPassword?.message}
        />
        <IonButton
          id='checkoutFormButton'
          className='h-[50px] mt-[30px]'
          type='submit'
          expand='block'
          disabled={signingUp}
        >
          {signingUp && (
            <IonSpinner name='dots' className='inline-block mr-3' />
          )}
          Create account
        </IonButton>
        {errorMessage && (
          <div className='my-5 text-center'>
            <ErrorText text={errorMessage} hideHorizontalBar />
          </div>
        )}
      </form>
      <div className='mt-10 text-center text-[var(--ion-color-medium)]'>
        Already on CubeJKiddies?{' '}
        <span
          className='text-[var(--ion-color-primary)] font-medium cursor-pointer'
          onClick={() => openAuthModal('login')}
        >
          Log in
        </span>
      </div>
    </div>
  );
};

export default SignUpForm;
