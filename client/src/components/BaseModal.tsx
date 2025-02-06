/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";
import { observer } from "mobx-react-lite";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  className,
  children,
}) => {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);

      setTimeout(() => {
        setIsAnimated(true);
      }, 300);
    } else {
      setIsAnimated(false);

      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 flexCenter bg-slate-700/90 z-50 transition-opacity duration-300
    ${isAnimated ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`relative p-4 lg:p-6 rounded-md lg:rounded-lg 2xl:rounded-xl shadow-md xl:shadow-lg bg-white transition-transform duration-300 transform ${
          isAnimated ? "scale-100" : "scale-95"
        } ${className || ""}`}
      >
        <Button
          type="button"
          size="sm"
          variant="default"
          title="Close"
          onClick={onClose}
          className="size-fit px-3 py-2 absolute top-[5%] right-[5%] regular-14 lg:regular-16 text-gray-800 cursor-pointer transition-transform duration-300 hover:text-gray-800 hover:scale-105"
        >
          <XIcon className="size-2.5 transition-transform duration-300 hover:rotate-180" />
        </Button>
        {children}
      </div>
    </div>
  );
};

export default observer(BaseModal);
