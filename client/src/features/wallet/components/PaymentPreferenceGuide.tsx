import { FC } from 'react';
import { Link } from 'react-router';
import { Landmark } from 'lucide-react';

const PaymentPreferenceGuide: FC = () => {
  return (
    <aside className="relative size-full h-fit md:max-h-48 flexColStart p-4 border-1 border-white-primary rounded-22 my-4 shadow-sm shadow-[#171a1f12] bg-white-primary overflow-hidden">
      <h3 className="bold-20 xl:bold-22 tracking-wide leading-8 text-[#212229FF]">
        Payment Preferences
      </h3>
      <p className="regular-14 font-normal text-[#9197A4FF] leading-6 tracking-normal text-balance whitespace-pre-wrap my-4">
        We will use your available balance when you shop online or send payment
        for "goods and services". If you do not have enough funds in <br /> your
        balance, we will ask you to choose another payment method during
        checkout.
      </p>
      <Link
        to="/account/settings"
        title="payment preference guidance"
        className="regular-16 2xl:regular-18 font-normal text-[#475284FF] leading-7 tracking-tight hover:underline"
      >
        More about payment preferences
      </Link>
      <div className="absolute -bottom-3.5 -right-12">
        <Landmark
          height={144}
          width={144}
          className="size-36 text-blue-300/40"
        />
        <span className="sr-only">Bank SVG</span>
      </div>
    </aside>
  );
};

export default PaymentPreferenceGuide;
