/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { observer } from "mobx-react-lite";
import BaseModal from "@/components/BaseModal";
import { StandardVerificationProps } from "@/types/modal";

const InitialWalletModal: React.FC<StandardVerificationProps> = ({
  email,
  message,
  onClose,
}) => {
  return (
    <BaseModal
      isOpen
      onClose={onClose}
      className="group w-80 sm:w-96 md:w-[440px] xl:w-[480px] space-y-2 rounded-lg group-hover:shadow-md"
    >
      <div>Open</div>
    </BaseModal>
  );
};

export default observer(InitialWalletModal);
