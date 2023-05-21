import { useHandleBookFormik } from '@/hooks/useHandleBookFormik';
import { Button, Card, TextField } from '@mui/material';
import { FormikValues } from '@/types/IBook';
import classes from './BookDataForm.module.css';

interface INewBookFormProps {
  handleSubmit: (values: FormikValues) => Promise<void>;
  initialValues: FormikValues;
}

export default function NewBookForm({
  handleSubmit,
  initialValues,
}: INewBookFormProps) {
  const onSubmit = async (values: FormikValues) => {
    await handleSubmit(values);
    formik.resetForm();
  };

  const formik = useHandleBookFormik(onSubmit, initialValues);

  return (
    <Card className={classes.addBookCard}>
      <form className={classes.addBookForm} onSubmit={formik.handleSubmit}>
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
          <div className="error">{formik.errors.title}</div>
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
          <div className="error">{formik.errors.author}</div>
        ) : null}

        <TextField
          id="year"
          label="year"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.year == null ? '' : formik.values.year}
          error={formik.touched.year && Boolean(formik.errors.year)}
        />

        {formik.touched.year && formik.errors.year ? (
          <div className="error">{formik.errors.year}</div>
        ) : null}

        <TextField
          id="rating"
          label="rating"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.rating == null ? '' : formik.values.rating}
          error={formik.touched.rating && Boolean(formik.errors.rating)}
        />

        {formik.touched.rating && formik.errors.rating ? (
          <div className="error">{formik.errors.rating}</div>
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
          <div className="error">{formik.errors.isbn}</div>
        ) : null}

        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </form>
    </Card>
  );
}
