import { FC, memo } from 'react';
import { Button } from '@/components/ui/button.tsx';
import useStore from '@/hooks/useStore.ts';
import { MODAL_TYPES } from '@/defines.ts';

/**
 * TransactionDashboard is a functional component designed to render the Transaction Dashboard view.
 *
 * This component is responsible for displaying the interface or data related to the transaction dashboard.
 * It serves as a top-level container for transaction-related content and may be styled or enhanced as needed
 * with additional state or props.
 *
 * @constant {Function} TransactionDashboard - A functional component to represent the Transaction Dashboard.
 */
const TransactionDashboard: FC = () => {
  const { modalStore } = useStore();

  const openTransactionModal = () => {
    modalStore.openModal(MODAL_TYPES.CREATE_TRANSACTION);
  };

  return (
    <div>
      <h1>Transaction Dashboard</h1>
      <Button onClick={openTransactionModal}>Create transaction</Button>
    </div>
  );
};

export default memo(TransactionDashboard);
