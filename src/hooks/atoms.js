import { atom } from 'recoil';

export const currentMyLocationAtom = atom({
  key: 'currentMyLocationAtom',
  default: { lat: 37.5666103, lng: 126.9783882 },
});