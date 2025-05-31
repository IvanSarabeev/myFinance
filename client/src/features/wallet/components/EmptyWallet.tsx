import { FC } from 'react';
import { WalletCards } from 'lucide-react';
import { Link } from 'react-router';

const EmptyWallet: FC = () => {
  return (
    <div className="w-full h-max bg-blue-100 p-6 rounded-2xl">
      <div className="text-center py-10">
        <div className="flexCenter mb-4 text-blue-300">
          <span className="sr-only">Wallet icon</span>
          <WalletCards height={60} width={60} />
        </div>
        <p className="regular-bold-18 text-gray-600">No wallets found</p>
        <p className="regular-14 text-gray-500">
          Start by adding a new wallet to track your finances.
        </p>
      </div>
      <Link
        to="/account/wallet/create-wallet"
        className="outline-none border-none ring-0"
      >
        <button className="flexCenter mt-4 px-4 py-2 mx-auto bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Add Wallet
        </button>
      </Link>
    </div>
  );
};

export default EmptyWallet;
