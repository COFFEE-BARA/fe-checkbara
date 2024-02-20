import { atom } from 'recoil';

export const currentMyLocationAtom = atom({
  key: 'isbnAtom',
  default: { isbn: "0" },
});