import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { AccountTypeOptions, CurrencyOptions } from "../../config";

const AccountForm: FC = () => {
  return (
    <form method="POST" className="flex flex-col">
      <div className="flex">
        <div className="flex flex-col gap-2 w-full">
          <Label>
            Account name:
            {/* TODO: Add asterix */}
          </Label>

          <Input type="text" id="name" placeholder="Account Name" />
        </div>
        <div className="flexCol gap-2 w-full">
          <Label>
            Currency:
            {/* TODO: Add asterix */}
          </Label>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Chose currency" />
            </SelectTrigger>
            <SelectContent>
              {/* TODO: Add Icons based on the SelectItem */}
              <SelectGroup>
                {Object.values(CurrencyOptions).map((currency) => {
                  return (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex">
        <div className="flexCol gap-2 w-full">
          <Label>Description:</Label>

          <Input type="text" id="description" placeholder="" className="" />
        </div>
        <div className="flexCol gap-2 w-full">
          <Label>
            Account type:
            {/* TODO: Add asterix */}
          </Label>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Chose type" />
            </SelectTrigger>
            <SelectContent>
              {/* TODO: Add Icons based on the SelectItem */}
              <SelectGroup>
                {Object.values(AccountTypeOptions).map((type) => {
                  return (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </form>
  );
};

export default AccountForm;
