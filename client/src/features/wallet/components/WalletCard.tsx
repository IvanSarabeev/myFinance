import { FC, Fragment } from 'react';
import type { Wallet } from '@/types/user';
import { Button } from '@/components/ui/button.tsx';
import { Plus } from 'lucide-react';
import { AccountIconOptions } from '@/features/wallet/config';
import CurrencyBadge from '@/features/wallet/components/_comp/CurrencyBadge.tsx';
import { Link } from 'react-router';
import ActiveWalletBadge from '@/features/wallet/components/_comp/ActiveWalletBadge.tsx';

type WalletCardProps = {
  data: Wallet;
};

const WalletCard: FC<WalletCardProps> = ({ data }) => {
  const { _id, active, balance, currency, name, type, icon } = data;

  const formatType = type?.toUpperCase() as keyof typeof AccountIconOptions;
  const Icon = AccountIconOptions[formatType];

  return (
    <Fragment>
      <Link
        to={{
          pathname: '/account/wallet/edit-wallet',
          search: `?=_id=${_id}`,
        }}
        target="_self"
        className="outline-none border-none ring-0"
      >
        <div
          className={`flexStart gap-x-2.5 border rounded-md shadow-md p-2 ${!active && 'opacity-80'} hover:shadow-lg basic-transition hover:rounded-lg`}
        >
          {icon === undefined ? (
            <div className="size-fit shadow-sm">
              <span className="sr-only">Icon</span>
              <Icon height={48} width={48} className="size-10 md:size-12" />
            </div>
          ) : (
            <img
              src={icon || ''}
              alt={name || ''}
              className="size-14 aspect-auto object-center object-contain"
            />
          )}

          <div className="flexColStart">
            <p className="regular-bold-16 lg:regular-bold-18 text-slate-800">
              {name || '-'}
            </p>
            <span className="inline-flex items-center">
              <CurrencyBadge currency={currency} />
              <p className="regular-14 lg:regular-bold-16 text-gray-600">
                {balance.toFixed(2) || '-'}
              </p>
            </span>
          </div>

          {active && <ActiveWalletBadge />}
        </div>
      </Link>

      <Link target="_self" to="/account/wallet/create-wallet">
        <Button
          type="button"
          title="Add new wallet"
          className="w-full h-fit regular-14 md:regular-16 text-center rounded-xl mt-4 bg-blue-700/85"
        >
          <div>
            <Plus height={8} width={8} />
            <span className="sr-only">Plus Icon</span>
          </div>
          Add new account
        </Button>
      </Link>
    </Fragment>
  );
};

export default WalletCard;
