// /* eslint-disable react-refresh/only-export-components */
// import React from "react";
// import { observer } from "mobx-react-lite";
// import { FormikProps } from "formik";
// import useToggle from "@/hooks/useToggle";
// import { Input } from "../ui/input";
// import { cn } from "@/lib/utils";
// import { Eye } from "lucide-react";
// import isFieldValid from "@/utils/isFieldValid";
// import ErrorMessage from "../ErrorMessage";

// type PasswordProps = {
//   id: string;
//   title: string;
//   placeholder: string;
//   className?: string;
//   formik: FormikProps<>;
//   errorFields: Set<string>;
//   iconClassName?: string;
// };

// const PasswordInput: React.FC<PasswordProps> = ({
//   id,
//   title,
//   placeholder,
//   className,
//   formik,
//   errorFields,
//   iconClassName,
// }) => {
//   const [show, handleToggle] = useToggle();

//   const inputStyle =
//     className !== undefined && className.length > 0
//       ? className
//       : "rounded-2xl border border-slate-200";

//   const iconStyle =
//     iconClassName !== undefined && iconClassName.length > 0
//       ? iconClassName
//       : "size-4 stroke-slate-400 common-transition duration-150 hover:cursor-pointer hover:scale-105 hover:stroke-slate-600";

//   return (
//     <React.Fragment>
//       <div className="relative w-full h-fit my-2">
//         <Input
//           id={id}
//           title={title}
//           type={show ? "text" : "password"}
//           placeholder={placeholder}
//           disabled={formik.isSubmitting}
//           className={cn(inputStyle, {
//             "input-error": formik.touched.password && formik.errors.password,
//           })}
//           {...formik.getFieldProps(id)}
//         />
//         <span className="absolute inset-y-1/3 right-[3%]">
//           <Eye
//             onClick={handleToggle}
//             aria-label="toggle password input"
//             className={cn(iconStyle, {
//               "stroke-red-600": isFieldValid(id, formik, errorFields),
//             })}
//           />
//         </span>
//       </div>
//       <ErrorMessage field={id} formik={formik} errorFields={errorFields} />
//     </React.Fragment>
//   );
// };

// export default observer(PasswordInput);
