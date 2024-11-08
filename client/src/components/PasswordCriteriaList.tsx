import React, { memo } from "react";
import { cn, hasUpperCase } from "@/lib/utils";
import {
  IS_NUMERIC,
  SPECIAL_CHARACTER,
  UPPER_CASE_CHARACTER,
} from "@/lib/regex";

type PasswordCriteriaListProps = {
  password: string;
};

/**
 * For Future Use-case
 */
const PasswordCriteriaList: React.FC<PasswordCriteriaListProps> = ({
  password,
}) => {
  return (
    <ul>
      <li className={cn({ "text-green-600": password.length >= 8 })}>
        {password.length >= 8 ? "✅ Characters" : `❌ Minimum 8 characters`}
      </li>
      <li
        className={cn({
          "text-green-600": password.length >= 8 && password.length <= 20,
        })}
      >
        {password.length >= 8 && password.length <= 20
          ? "✅ Max 20 characters"
          : "❌ Character Length"}
      </li>
      <li
        className={cn({
          "text-green-600": UPPER_CASE_CHARACTER.test(password),
        })}
      >
        {hasUpperCase(password)
          ? "✅ Uppercase letter"
          : "❌ Missing uppercase"}
      </li>
      <li className={cn({ "text-green-600": IS_NUMERIC.test(password) })}>
        {IS_NUMERIC.test(password) ? "✅ Numeric symbol" : "❌ Numeric symbol"}
      </li>
      <li
        className={cn({ "text-green-600": SPECIAL_CHARACTER.test(password) })}
      >
        {SPECIAL_CHARACTER.test(password)
          ? "✅ Special symbol"
          : "❌ Special Symbol"}
      </li>
    </ul>
  );
};

const MemoPasswordCriteriaList = memo(PasswordCriteriaList);

export default MemoPasswordCriteriaList;
