import { toast } from 'react-hot-toast';

export async function checkIsbn(isbn: string): Promise<string> {
  if (isbn === '') {
    return isbn;
  }

  const response = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);

  if (response.ok) {
    return isbn + '✔️';
  }

  if (response.status !== 404) {
    console.log(`Error: ${response.status}`);
    toast.error(`Error while check isbn: ${response.status}`);
  }

  return isbn + '❌';
}

function validateISBN(isbn: string): boolean {
  const cleanedISBN = isbn.replace(/\D/g, '');

  if (cleanedISBN.length !== 10 && cleanedISBN.length !== 13) {
    toast.error('Quantity of symbols in the isbn number must be 10 or 13');
    return false;
  }

  if (cleanedISBN.length === 10) {
    const regex = /^\d{9}[\dX]$/;

    if (!regex.test(cleanedISBN)) {
      toast.error('ISBN must be 10 numbers or 9 numbers + "X"');
      return false;
    }

    let sum = 0;

    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanedISBN.charAt(i)) * (10 - i);
    }

    const lastChar = cleanedISBN.charAt(9);

    if (lastChar === 'X') {
      sum += 10;
    } else {
      sum += parseInt(lastChar);
    }

    if (sum % 11 !== 0) {
      toast.error('Invalid checksum');
      return false;
    }
  }

  if (cleanedISBN.length === 13) {
    const regex = /^\d{13}$/;

    if (!regex.test(cleanedISBN)) {
      toast.error('ISBN must be 13 numbers');
      return false;
    }

    let sum = 0;

    for (let i = 0; i < 12; i++) {
      sum += parseInt(cleanedISBN.charAt(i)) * (i % 2 === 0 ? 1 : 3);
    }

    const lastDigit = parseInt(cleanedISBN.charAt(12));
    if ((10 - (sum % 10)) % 10 !== lastDigit) {
      toast.error('Invalid checksum');
      return false;
    }
  }

  return true;
}

const isbn1 = '978-5-4370-089-2';
console.log(validateISBN(isbn1)); // true
