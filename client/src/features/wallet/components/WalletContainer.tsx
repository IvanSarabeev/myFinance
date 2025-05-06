import { FC, Fragment } from 'react';
import PaymentPreferenceGuide from '@/features/wallet/components/_comp/PaymentPreferenceGuide.tsx';

const WalletContainer: FC = () => {
  return (
    <Fragment>
      <PaymentPreferenceGuide />
      Wallet
    </Fragment>
  );
};

export default WalletContainer;
