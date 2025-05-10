import { FC, Fragment } from 'react';
import PaymentPreferenceGuide from '@/features/wallet/components/_comp/PaymentPreferenceGuide.tsx';
import MyWalletsLists from '@/features/wallet/components/_comp/MyWalletsLists.tsx';

const WalletContainer: FC = () => {
  return (
    <Fragment>
      <PaymentPreferenceGuide />
      <MyWalletsLists />
      {/* TODO: Add Card of the following Components: */}
      {/* Total Balance based on all the wallets*/}
      {/* Recent Transactions*/}
      {/* Report based on daily, weekly, mothly and yearly bases */}
    </Fragment>
  );
};

export default WalletContainer;
