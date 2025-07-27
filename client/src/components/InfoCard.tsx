import { FC } from 'react';
import type { LucideIcon } from 'lucide-react';

type InfoCardProps = {
  Icon: LucideIcon;
  label: string;
  value: string;
  color: string;
};

const InfoCard: FC<InfoCardProps> = ({ Icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
      <div
        className={`size-14 flexCenter .bold-26 ${color} rounded-full drop-shadow-xl`}
      >
        <Icon className="text-white" />
      </div>
      <div>
        <h6 className="regular-14 text-gray-500 mb-1">{label}</h6>
        <span className="bold-22">${value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
