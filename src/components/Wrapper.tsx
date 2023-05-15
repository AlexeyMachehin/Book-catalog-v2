import { memo } from 'react';

function Wrapper(props: any) {
  return <div style={props.style}></div>;
}
export default memo(Wrapper);
// function areBookPropsEqual(
//   prevProps: Readonly<{ book: IBook }>,
//   nextProps: Readonly<{ book: IBook }>,
// ) {
//   const prevBook = prevProps.book;
//   const nextBook = nextProps.book;

//   return (
//     prevBook.name === nextBook.name &&
//     prevBook.author === nextBook.author &&
//     prevBook.imageLink === nextBook.imageLink &&
//     prevBook.isbn === nextBook.isbn &&
//     prevBook.rating === nextBook.rating &&
//     prevBook.year === nextBook.year
//   );
// }


