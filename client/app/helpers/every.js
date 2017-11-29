import { partialRight, every } from 'lodash';

export const everyTrue = partialRight(every, Boolean);
export const everyFalse = partialRight(every, (el) => !el);