import React from "react";
import BaseModal from "@/components/BaseModal";
import { ForgotPasswordModalProps } from "@/types/modal";

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  message,
  onClose,
}) => {
  return (
    <BaseModal isOpen onClose={onClose} className="">
      <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
      <p className="mb-4">
        {message ?? `Please enter your email address to reset your password.`}
      </p>
      <form className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="border border-gray-300 p-2 rounded focus:outline-none focus:border-green-500"
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </BaseModal>
  );
};

export default ForgotPasswordModal;
