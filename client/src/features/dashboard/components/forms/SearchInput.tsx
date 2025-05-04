import { ChangeEvent, FC, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input.tsx';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils.ts';
import useDebounce from '@/hooks/useDebounce.ts';

const SearchInput: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce(searchValue);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setSearchValue(event.target.value);
  };

  //   TODO: Implement deBounce technique to prevent multiple httpRequest on fetching Wallets
  useEffect(() => {
    if (debouncedValue) {
      console.log('Fetch Debounced Value: ', debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <div className="size-fit relative">
      <span className="absolute left-2 inset-y-1/4">
        <Search
          height={18}
          width={18}
          aria-disabled="true"
          className="cursor-auto"
        />
      </span>
      <Input
        id="search"
        type="search"
        aria-label="search for wallet/s latest data"
        aria-autocomplete="inline"
        placeholder="Search..."
        minLength={2}
        maxLength={40}
        value={searchValue}
        disabled={false}
        className={cn('pl-8')}
        onChange={(event) => handleInputChange(event)}
      />
    </div>
  );
};

export default SearchInput;
