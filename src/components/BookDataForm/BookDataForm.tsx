import { useState } from 'react';
import { useHandleBookFormik } from '@/hooks/useHandleBookFormik';
import { MuiChipsInput } from 'mui-chips-input';
import { Button, Card, TextField } from '@mui/material';
import { FormikValues } from '@/types/IBook';
import classes from './BookDataForm.module.css';

interface INewBookFormProps {
  handleSubmit: (values: FormikValues) => Promise<void>;
  initialValues: FormikValues;
}

export default function BookDataForm({
  handleSubmit,
  initialValues,
}: INewBookFormProps) {
  // Необходимо для работы на мобильных устройствах.
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

  const showError = (value: keyof FormikValues): boolean => {
    return Boolean(formik.touched[value]) && Boolean(formik.errors[value]);
  };

  return (
    <Card className={classes.bookDataCard}>
      <form className={classes.bookDataForm} onSubmit={formik.handleSubmit}>
        <TextField
          id="title"
          label="Title*"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          error={showError('title')}
        />

        {showError('title') && (
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
          inputValue={chipValue}
          onInputChange={setChipValue}
          error={showError('author') && formik.values.author.length === 0}
        />

        {showError('author') && formik.values.author.length === 0 && (
          <div className="error">{formik.errors.author}</div>
        )}

        <TextField
          id="year"
          label="Year"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.year == null ? '' : formik.values.year}
          error={showError('year')}
        />

        {showError('year') && <div className="error">{formik.errors.year}</div>}

        <TextField
          id="rating"
          label="Rating"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.rating == null ? '' : formik.values.rating}
          error={showError('rating')}
        />

        {showError('rating') && (
          <div className="error">{formik.errors.rating}</div>
        )}

        <TextField
          id="isbn"
          label="ISBN"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.isbn}
          error={showError('isbn')}
        />

        {showError('isbn') && <div className="error">{formik.errors.isbn}</div>}

        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </form>
    </Card>
  );
}
