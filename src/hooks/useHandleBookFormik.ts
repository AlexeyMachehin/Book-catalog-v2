import * as Yup from 'yup';
import { useFormik } from 'formik';
import { validateISBN } from '@/utils/validateISBN';
import { NewBook, FormikValues } from '@/types/IBook';

interface IParams {
  onSubmit(values: FormikValues): void;
}

export const useHandleBookFormik = (
  { onSubmit }: IParams,
  { initialValues }: { initialValues: NewBook },
) => {
  const validationSchema = Yup.object({
    title: Yup.string()
      .max(100, 'Must be 100 characters or less')
      .required('Required'),
    author: Yup.string().required('Required'),
    year: Yup.number()
      .typeError('Enter a number greater than 1800')
      .min(1800, 'Must be greater than 1800')
      .nullable(),
    rating: Yup.number()
      .typeError('Enter a number 0-10')
      .min(0, 'Should be 0-10')
      .max(10, 'Should be 0-10')
      .nullable(),
    isbn: Yup.string().test({
      name: 'isISBNValid',
      test: function (value) {
        const error = validateISBN(value);

        return error
          ? this.createError({
              message: error,
            })
          : true;
      },
    }),
  });

  return useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
};
