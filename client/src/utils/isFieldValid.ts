import { FormikProps } from 'formik';

/**
 * Returns a boolean, based on the provided Generic Fields
 * 
 * @param {keyof T} field 
 * @param {FormikProps<T>} formik 
 * @param {Set<string>} errorFields
 */
const isFieldValid = <T,>(field: keyof T, formik: FormikProps<T>, errorFields: Set<string>) => {
  return (
    formik.touched[field] && (formik.errors[field] || errorFields.has(field as string))
  )
};

export default isFieldValid;