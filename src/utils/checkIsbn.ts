export function validateISBN(isbn?: string): string {
  if (isbn == null) {
    return '';
  }

  const cleanedISBN = isbn.replace(/[^0-9Xx]$|[^0-9Xx]+/g, '');

  if (cleanedISBN.length !== 10 && cleanedISBN.length !== 13) {
    return 'Quantity of symbols in the isbn number must be 10 or 13';
  }

  if (cleanedISBN.length === 10) {
    const regex = /^\d{9}[\dXx]$/;

    if (!regex.test(cleanedISBN)) {
      return 'ISBN must be 10 numbers or 9 numbers + "X"';
    }

    let sum = 0;

    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanedISBN.charAt(i)) * (10 - i);
    }

    const lastChar = cleanedISBN.charAt(9);

    if (lastChar === 'X' || lastChar === 'x') {
      sum += 10;
    } else {
      sum += parseInt(lastChar);
    }

    if (sum % 11 !== 0) {
      return 'Invalid checksum';
    }
  }

  if (cleanedISBN.length === 13) {
    const regex = /^\d{13}$/;

    if (!regex.test(cleanedISBN)) {
      return 'ISBN must be 13 numbers';
    }

    let sum = 0;

    for (let i = 0; i < 12; i++) {
      sum += parseInt(cleanedISBN.charAt(i)) * (i % 2 === 0 ? 1 : 3);
    }

    const lastDigit = parseInt(cleanedISBN.charAt(12));
    if ((10 - (sum % 10)) % 10 !== lastDigit) {
      return 'Invalid checksum';
    }
  }

  return '';
}
