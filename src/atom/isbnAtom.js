import { atom } from 'recoil';

export const isbnAtom = atom({
  key: 'isbnAtom',
  default: { isbn: "0" },
});