import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, TextField, Typography } from '@mui/material';
import { IBook } from '@/types/IBook';
import { updateBook } from '@/firebase/firebase';
import { checkIsbn } from '@/utils/checkIsbn';
import { getThumbnailLink } from '@/utils/getThumbnailLink';
import classes from './edit.Form.module.css';

interface IEditFormProps {
  setIsEditBookModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoaderOn: React.Dispatch<React.SetStateAction<boolean>>;
  editBook: IBook | null;
}

export default function EditForm({
  setIsLoaderOn,
  setIsEditBookModalOpen,
  editBook,
}: IEditFormProps) {
  const formik = useFormik({
    initialValues: {
      title: editBook?.name ? editBook.name : '',
      author: editBook?.author ? editBook.author : '',
      year: editBook?.year ? editBook.year : '',
      rating: editBook?.rating ? editBook.rating : '',
      isbn: editBook?.isbn ? editBook?.isbn.replace(/✔️|❌/g, '') : '',
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .max(100, 'Must be 100 characters or less')
        .required('Required'),
      author: Yup.string().required('Required'),
      year: Yup.number()
        .typeError('Enter a  number greater than 1800')
        .min(1800, 'Must be greater than 1800'),
      rating: Yup.number()
        .typeError('Enter a  number 1-10')
        .min(0, 'Must be a positive number')
        .max(10, 'Should less than 10'),
      isbn: Yup.string()
        .min(13, 'must be at least 13 characters long')
        .max(17, 'must be max 17 characters long')
        .matches(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/, 'error '),
    }),

    onSubmit: async values => {
      setIsEditBookModalOpen(false);
      setIsLoaderOn(true);
      if (editBook) {
        updateBook(
          {
            name: (values.title as string).trim(),
            author: values.author.trim(),
            year: Number(values.year),
            rating: Number(values.rating),
            isbn: await checkIsbn(values.isbn as string).then(result => result),
            imageLink: await getThumbnailLink(values.title as string).then(
              result => result,
            ),
          },

          editBook.id,
        ).finally(() => setIsLoaderOn(false));
      }
    },
  });

  return (
    <form className={classes.editForm} onSubmit={formik.handleSubmit}>
      <Typography variant="h5">Edit book</Typography>

      <TextField
        id="title"
        label="title"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
        required
        error={formik.touched.title && Boolean(formik.errors.title)}
      />

      {formik.touched.title && formik.errors.title ? (
        <div className="error">{formik.errors.title as string}</div>
      ) : null}

      <TextField
        id="author"
        label="author"
        required
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.author}
        error={formik.touched.author && Boolean(formik.errors.author)}
      />

      {formik.touched.author && formik.errors.author ? (
        <div className="error">{formik.errors.author as string}</div>
      ) : null}

      <TextField
        id="year"
        label="year"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.year}
        error={formik.touched.year && Boolean(formik.errors.year)}
      />

      {formik.touched.year && formik.errors.year ? (
        <div className="error">{formik.errors.year as string}</div>
      ) : null}

      <TextField
        id="rating"
        label="rating"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.rating}
        error={formik.touched.rating && Boolean(formik.errors.rating)}
      />

      {formik.touched.rating && formik.errors.rating ? (
        <div className="error">{formik.errors.rating as string}</div>
      ) : null}

      <TextField
        id="isbn"
        label="isbn"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.isbn}
        error={formik.touched.isbn && Boolean(formik.errors.isbn)}
      />

      {formik.touched.isbn && formik.errors.isbn ? (
        <div className="error">{formik.errors.isbn as string}</div>
      ) : null}

      <Button type="submit" variant="outlined">
        Submit
      </Button>
    </form>
  );
}
