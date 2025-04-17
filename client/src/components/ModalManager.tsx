/* eslint-disable react-refresh/only-export-components */
import React, { lazy, Suspense } from "react";
import { observer } from "mobx-react-lite";
import useStore from "@/hooks/useStore";
import { MODAL_TYPES } from "@/defines";

const EmailVerificationModal = lazy(
  () => import("@/features/security/components/modals/EmailVerificationModal")
);
const ForgotPasswordModal = lazy(
  () => import("@/features/security/components/modals/ForgotPasswordModal")
);
const CreatelWalletModal = lazy(
  () => import("@/features/wallet/components/modals/InitialWalletSetupModal")
);

const { EMAIL_VERIFICATION, FORGOTTEN_PASSWORD, INITIAL_WALLET_SETUP } =
  MODAL_TYPES;

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
    default:
      return null;
  }
};

export default observer(ModalManager);
