import { useLocation, useParams } from 'react-router-dom';

export const removeStringToEndOfUrl = (toRemove: string, url: string): string => {
  let to = url.indexOf(`/${toRemove}`);
  to = to === -1 ? url.length : to;
  return url.substring(0, to);
};

export const usePathnameWithoutBookId = (): string => {
  const { bookId } = useParams();
  const { pathname } = useLocation();
  return bookId ? removeStringToEndOfUrl(bookId, pathname) : pathname;
};
