import { atom } from 'recoil';

export const priceAtom = atom({
  key: 'priceAtom',
  default: { isbn: "0" },
});