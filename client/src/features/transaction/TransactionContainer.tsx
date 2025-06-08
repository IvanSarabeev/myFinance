import { FC, lazy } from 'react';
import { Routes, Route } from 'react-router';
import TransactionLayout from '@/features/transaction/components/layouts/TransactionLayout.tsx';
import TransactionDashboard from '@/features/transaction/pages/TransactionDashboard.tsx';

const CreateTransactionPage = lazy(
  () => import('@/features/transaction/pages/CreateTransaction.tsx')
);

/**
 * Functional component that acts as the main container for managing
 * transaction-related routes within the application.
 *
 * This container ensures a seamless UX by dynamically rendering specific transaction-related pages.
 */
const TransactionContainer: FC = () => {
  return (
    <Routes>
      <Route element={<TransactionLayout />}>
        <Route index element={<TransactionDashboard />} />
        <Route path="create" element={<CreateTransactionPage />} />
      </Route>
    </Routes>
  );
};

export default TransactionContainer;
