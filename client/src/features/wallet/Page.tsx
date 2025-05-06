import { FC } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { MoveDownLeft, MoveUpRight } from 'lucide-react';
import WalletContainer from '@/features/wallet/components/WalletContainer.tsx';
import { Link } from 'react-router';

const WalletPage: FC = () => {
  const headerNavigation = () => {
    return (
      <header className="flexBetween items-center flex-wrap">
        <h2 className="bold-24 xl:bold-26 text-primary-black tracking-wide">
          My Wallet
        </h2>
        <div className="flexCenter gap-x-2 md:gap-x-2.5 xl:gap-x-3">
          <Link
            to="/account/activity/requests"
            className="size-fit outline-none"
          >
            <Button
              disabled={false}
              variant="outline"
              className="regular-14 xl:regular-16 font-bold tracking-wide border-offset rounded bg-white-secondary hover:scale-105 transition-transform"
            >
              <MoveDownLeft className="size-6" />
              Request
            </Button>
          </Link>
          <Link
            to="/account/activity/new-transfer"
            className="size-fit outline-none"
          >
            <Button
              disabled={false}
              variant="outline"
              className="regular-14 xl:regular-16 font-bold tracking-wide border-offset rounded bg-white-secondary hover:scale-105 transition-transform"
            >
              <MoveUpRight className="size-6" />
              Transfer
            </Button>
          </Link>
        </div>
      </header>
    );
  };

  return (
    <section className="container account-container">
      {headerNavigation()}
      <WalletContainer />
    </section>
  );
};

export default WalletPage;
