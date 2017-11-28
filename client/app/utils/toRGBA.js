import { get } from 'lodash';

const colors = {
  black: '0, 0, 0',
  white: '255, 255, 255'
};

export function toRGBA(color, opacity = 1) {
  return `rgba(${get(colors, color)}, ${opacity})`;
}
