import { FC } from 'react';
import { Bell } from 'lucide-react';
import NavUser from '@/app/dashboard/sidebar/NavUser.tsx';
import useStore from '@/hooks/useStore.ts';
import SearchInput from '@/features/dashboard/components/forms/SearchInput.tsx';

const Header: FC = () => {
  const { userStore } = useStore();

  const user = userStore.getUserDetails();

  return (
    <header className="size-full min-h-16 block bg-inherit border-b border-slate-900">
      <div className="size-full flex justify-between px-2 lg:px-4 regular-14">
        <div className="flexCenter items-center">
          <SearchInput />
        </div>
        <div className="flexCenter gap-x-2 lg:gap-x-3">
          <span className="size-fit">
            <Bell
              height={22}
              width={22}
              alignmentBaseline="baseline"
              aria-disabled={'true'}
              className="cursor-pointer hover:scale-105 common-transition disabled:cursor-not-allowed"
            />
          </span>
          {user !== null && <NavUser user={user} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
