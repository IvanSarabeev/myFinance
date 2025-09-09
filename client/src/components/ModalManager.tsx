/* eslint-disable react-refresh/only-export-components */
import React, { lazy, Suspense } from 'react';
import { observer } from 'mobx-react-lite';
import useStore from '@/hooks/useStore';
import { MODAL_TYPES } from '@/defines';

const EmailVerificationModal = lazy(
  () => import('@/features/security/components/modals/EmailVerificationModal')
);
const ForgotPasswordModal = lazy(
  () => import('@/features/security/components/modals/ForgotPasswordModal')
);
const CreatelWalletModal = lazy(
  () => import('@/features/wallet/components/modals/InitialWalletSetupModal')
);
const CustomAccountStep = lazy(
  () => import('@/features/wallet/components/modals/steps/CustomAccountStep')
);
const CustomWalletStep = lazy(
  () => import('@/features/wallet/components/modals/steps/CustomWalletStep')
);
const CreateTransactionModal = lazy(
  () => import('@/features/transaction/modals/CreateTransactionModal')
);
const CreateIncomeTransactionModal = lazy(
  () => import('@/features/incomes/components/CreateIncomeModal')
);

const {
  EMAIL_VERIFICATION,
  FORGOTTEN_PASSWORD,
  INITIAL_WALLET_SETUP,
  CUSTOM_WALLET,
  CUSTOM_ACCOUNT,
  CREATE_TRANSACTION,
  CREATE_INCOME_TRANSACTION,
} = MODAL_TYPES;

const ModalManager: React.FC = () => {
  const { modalStore } = useStore();
  const { isOpen, modalName, modalProps } = modalStore;

  if (!isOpen) return null;

  switch (modalName) {
    case EMAIL_VERIFICATION: {
      return (
        <Suspense fallback={null}>
          <EmailVerificationModal
            email={modalProps.email as string}
            message={modalProps.message as string}
            onClose={() => modalStore.closeModal()}
          />
        </Suspense>
      );
    }
    case FORGOTTEN_PASSWORD:
      return (
        <Suspense fallback={null}>
          <ForgotPasswordModal
            email={modalProps.email as string}
            message={modalProps.message as string}
            onClose={() => modalStore.closeModal()}
          />
        </Suspense>
      );
    // Add case for the New Modal
    case INITIAL_WALLET_SETUP:
      return (
        <Suspense fallback={null}>
          <CreatelWalletModal
            email={modalProps.email as string}
            message={modalProps.message as string}
            onClose={() => modalStore.closeModal()}
          />
        </Suspense>
      );
    case CUSTOM_ACCOUNT:
      return (
        <Suspense fallback={null}>
          <CustomAccountStep
            email={modalProps.email as string}
            message={modalProps.message as string}
            onClose={() => modalStore.closeModal()}
            onNext={() => modalStore.openModal(MODAL_TYPES.CUSTOM_WALLET)}
          />
        </Suspense>
      );
    case CUSTOM_WALLET:
      return (
        <Suspense fallback={null}>
          <CustomWalletStep
            email={modalProps.email as string}
            message={modalProps.message as string}
            onClose={() => modalStore.closeModal()}
            onFinish={() => modalStore.closeModal()}
          />
        </Suspense>
      );
    case CREATE_TRANSACTION:
      return (
        <Suspense fallback={null}>
          <CreateTransactionModal onClose={() => modalStore.closeModal()} />
        </Suspense>
      );
    case CREATE_INCOME_TRANSACTION:
      return (
        <Suspense fallback={null}>
          <CreateIncomeTransactionModal
            onClose={() => modalStore.closeModal()}
          />
        </Suspense>
      );
    default:
      return null;
  }
};

export default observer(ModalManager);
