import { updateBook } from '@/firebase/firebase';
import { getBookCoverLink } from '@/utils/getBookCoverLink';
import BookDataForm from '../BookDataForm/BookDataForm';
import { Typography } from '@mui/material';
import { FormikValues, IBook } from '@/types/IBook';

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
  const handleSubmit = async (values: FormikValues) => {
    setIsEditBookModalOpen(false);
    setIsLoaderOn(true);

    if (editBook) {
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
          ).then(result => result),
        },

        editBook.id,
      ).finally(() => setIsLoaderOn(false));
    }
  };

  const initialValues = {
    title: editBook?.title ? editBook.title : '',
    author: editBook?.author ? editBook.author.split(',') : [],
    year: editBook?.year ? editBook.year : null,
    rating: editBook?.rating ? editBook.rating : null,
    isbn: editBook?.isbn ? editBook?.isbn : '',
    imageLink: editBook?.imageLink ? editBook?.imageLink : '',
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
