import { FC, memo } from 'react';
import { Outlet } from 'react-router';

/**
 * A functional component that serves as a layout container for transaction-related pages.
 *
 * @component
 * @returns {JSX.Element} A section element wrapping the provided children.
 */
const TransactionLayout: FC = (): JSX.Element => {
  return (
    <section className="container account-container">
      <Outlet />
    </section>
  );
};

export default memo(TransactionLayout);
