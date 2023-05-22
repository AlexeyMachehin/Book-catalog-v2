import { addBook } from '@/firebase/firebase';
import { memo } from 'react';
import { getBookCoverLink } from '@/utils/getBookCoverLink';
import BookDataForm from '../BookDataForm/BookDataForm';
import { Typography } from '@mui/material';
import { FormikValues } from '@/types/IBook';

function AddBook({
  setIsLoaderOn,
}: {
  setIsLoaderOn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleSubmit = async (values: FormikValues) => {
    setIsLoaderOn(true);

    addBook({
      title: values.title.trim(),
      author: values.author.join(', '),
      year: Number(values.year),
      rating: Number(values.rating),
      isbn: values.isbn,
      imageLink: await getBookCoverLink(values.title, values.author.join(',')),
    }).finally(() => setIsLoaderOn(false));
  };

  const initialValues = {
    title: '',
    author: [],
    year: null,
    rating: null,
    isbn: '',
    imageLink: '',
  };

  return (
    <div>
      <Typography gutterBottom variant="h5" component="h5">
        Add Book
      </Typography>

      <BookDataForm handleSubmit={handleSubmit} initialValues={initialValues} />
    </div>
  );
}

export default memo(AddBook);
