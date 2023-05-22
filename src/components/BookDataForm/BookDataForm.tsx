import { MuiChipsInput } from 'mui-chips-input';
import { useState } from 'react';
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
  const [chipValue, setChipValue] = useState('');

  const onSubmit = async (values: FormikValues) => {
    await handleSubmit(values);
    formik.resetForm();
  };

  const formik = useHandleBookFormik(onSubmit, initialValues);

  const handleAuthorsBlur = () => {
    if (chipValue) {
      formik.setFieldValue('author', [...formik.values.author, chipValue]);
      setChipValue('');
    }

    formik.setFieldTouched('author', true);
  };

  return (
    <Card className={classes.addBookCard}>
      <form className={classes.addBookForm} onSubmit={formik.handleSubmit}>
        <TextField
          id="title"
          label="Title*"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          error={formik.touched.title && Boolean(formik.errors.title)}
        />

        {formik.touched.title && formik.errors.title && (
          <div className="error">{formik.errors.title}</div>
        )}

        <MuiChipsInput
          id="author"
          label="Authors*"
          onChange={value => {
            formik.setFieldValue('author', value);
            setChipValue('');
          }}
          onBlur={handleAuthorsBlur}
          value={formik.values.author}
          error={
            (formik.touched.author || formik.dirty) &&
            formik.values.author.length === 0 &&
            Boolean(formik.errors.author)
          }
          inputValue={chipValue}
          onInputChange={setChipValue}
        />

        {(formik.touched.author || formik.dirty) &&
          formik.values.author.length === 0 && (
            <div className="error">{formik.errors.author}</div>
          )}

        <TextField
          id="year"
          label="Year"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.year == null ? '' : formik.values.year}
          error={formik.touched.year && Boolean(formik.errors.year)}
        />

        {formik.touched.year && formik.errors.year && (
          <div className="error">{formik.errors.year}</div>
        )}

        <TextField
          id="rating"
          label="Rating"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.rating == null ? '' : formik.values.rating}
          error={formik.touched.rating && Boolean(formik.errors.rating)}
        />

        {formik.touched.rating && formik.errors.rating && (
          <div className="error">{formik.errors.rating}</div>
        )}

        <TextField
          id="isbn"
          label="ISBN"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.isbn}
          error={formik.touched.isbn && Boolean(formik.errors.isbn)}
        />

        {formik.touched.isbn && formik.errors.isbn && (
          <div className="error">{formik.errors.isbn}</div>
        )}

        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </form>
    </Card>
  );
}
