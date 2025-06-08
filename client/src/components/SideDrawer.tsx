/* eslint-disable react-refresh/only-export-components */
import { FC, ReactNode, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { XIcon } from 'lucide-react';
import { observer } from 'mobx-react-lite';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: ReactNode;
}

const SideDrawer: FC<SideDrawerProps> = ({
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
      }, 20);
    } else {
      setIsAnimated(false);

      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-slate-700/90 transition-opacity duration-300 ${
        isAnimated ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`fixed top-0 right-0 size-full max-w-xl bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isAnimated ? 'translate-x-0' : 'translate-x-full'}
          ${className || ''}`}
      >
        <div className="min-w-xl h-full overflow-y-auto">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            title="Close"
            onClick={onClose}
            className="size-fit px-3 py-2 absolute top-4 right-4 text-gray-800 transition-transform duration-300 hover:scale-105"
          >
            <XIcon className="size-4 transition-transform duration-300 hover:rotate-180" />
          </Button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default observer(SideDrawer);
