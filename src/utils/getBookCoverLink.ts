import { toast } from 'react-hot-toast';

export async function getBookCoverLink(
  title: string,
  author: string,
): Promise<string | null> {
  const data = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      `intitle:${title} inauthor:${author}`,
    )}`,
  )
    .then(response => response.json())
    .catch(() => toast('Error while get book cover'));

  if (data.items) {
    const itemWithCover = data.items.find(
      (item: { volumeInfo: { imageLinks: string } }) =>
        item.volumeInfo.imageLinks,
    );

    return itemWithCover?.volumeInfo.imageLinks.thumbnail || null;
  }

  return null;
}
