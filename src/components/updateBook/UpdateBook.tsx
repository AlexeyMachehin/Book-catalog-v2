import { updateBook } from '@/firebase/firebase';
import { getBookCoverLink } from '@/utils/getBookCoverLink';
import BookDataForm from '../BookDataForm/BookDataForm';
import { Typography } from '@mui/material';
import { FormikValues, IBook } from '@/types/IBook';

interface IEditFormProps {
  setBookForUpdate: React.Dispatch<React.SetStateAction<IBook | null>>;
  setIsLoaderOn: React.Dispatch<React.SetStateAction<boolean>>;
  bookForUpdate: IBook | null;
}

export default function UpdateBook({
  setIsLoaderOn,
  setBookForUpdate,
  bookForUpdate,
}: IEditFormProps) {
  const handleSubmit = async (values: FormikValues) => {
    setBookForUpdate(null);
    setIsLoaderOn(true);

    if (bookForUpdate) {
      updateBook(
        {
          title: values.title.trim(),
          author: values.author.join(', '),
          year: Number(values.year),
          rating: Number(values.rating),
          isbn: values.isbn,
          imageLink: await getBookCoverLink(
            values.title,
            values.author.join(','),
          ),
        },

        bookForUpdate.id,
      ).finally(() => setIsLoaderOn(false));
    }
  };

  const initialValues = {
    title: bookForUpdate?.title ? bookForUpdate.title : '',
    author: bookForUpdate?.author ? bookForUpdate.author.split(',') : [],
    year: bookForUpdate?.year ? bookForUpdate.year : null,
    rating: bookForUpdate?.rating ? bookForUpdate.rating : null,
    isbn: bookForUpdate?.isbn ? bookForUpdate?.isbn : '',
    imageLink: bookForUpdate?.imageLink ? bookForUpdate?.imageLink : '',
  };

  return (
    <div>
      <Typography gutterBottom variant="h5" component="h5">
        Edit book
      </Typography>

      <BookDataForm handleSubmit={handleSubmit} initialValues={initialValues} />
    </div>
  );
}
