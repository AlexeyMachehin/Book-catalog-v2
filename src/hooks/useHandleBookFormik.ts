import * as Yup from 'yup';
import { useFormik } from 'formik';

interface IFormValue {
  title: string;
  author: string;
  year: number | string;
  rating: number | string;
  isbn: string;
}

interface IParams {
  onSubmit(values: IFormValue): void;
}

export const useHandleBookFormik = (
  { onSubmit }: IParams,
  { initialValues }: { initialValues: IFormValue },
) => {
  const validationSchema = Yup.object({
    title: Yup.string()
      .max(100, 'Must be 100 characters or less')
      .required('Required'),
    author: Yup.string().required('Required'),
    year: Yup.number()
      .typeError('Enter a number greater than 1800')
      .min(1800, 'Must be greater than 1800'),
    rating: Yup.number()
      .typeError('Enter a number 0-10')
      .min(0, 'Should be 0-10')
      .max(10, 'Should be 0-10'),
    isbn: Yup.string()
      .min(13, 'must be at least 13 characters long')
      .max(17, 'must be max 17 characters long')
      .matches(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/, 'error '),
  });

  return useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
};
