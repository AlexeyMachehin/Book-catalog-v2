import { memo } from 'react';
import TextField from '@mui/material/TextField';
import { Card } from '@mui/material';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { addBook } from '@/firebase/firebase';
import { getBookCoverLink } from '@/utils/getBookCoverLink';
import { useHandleBookFormik } from '@/hooks/useHandleBookFormik';
import classes from './addBook.module.css';

function AddBook({
  setIsLoaderOn,
}: {
  setIsLoaderOn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleSubmit = async (values: any) => {
    setIsLoaderOn(true);

    addBook({
      name: (values.title as any).trim(),
      author: values.author.trim(),
      year: Number(values.year),
      rating: Number(values.rating),
      isbn: values.isbn,
      imageLink: await getBookCoverLink(values.title, values.author).then(
        result => result,
      ),
    }).finally(() => setIsLoaderOn(false));

    formik.resetForm();
  };

  const initialValues = {
    title: '',
    author: '',
    year: '',
    rating: '',
    isbn: '',
  };

  const formik = useHandleBookFormik(
    {
      onSubmit: handleSubmit,
    },
    { initialValues: initialValues },
  );

  return (
    <Card className={classes.addBookCard}>
      <form className={classes.addBookForm} onSubmit={formik.handleSubmit}>
        <Typography variant="h5">Add new book</Typography>

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
          value={formik.values.year}
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
          value={formik.values.rating}
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

export default memo(AddBook);
