import { images } from '../../images';
const { main } = images;
export const SWIPER_DATA = [
  {
    id: 'main_swiper_1',    
    image: main.swiper1,
    text: 'NEW WINTER 2018 CATALOGUE',
    button: {
      text: 'SHOP NOW',
      url: 'catalogue'
    }
  },
  {
    id: 'main_swiper_2',
    image: main.swiper2,
    text: 'GIRL IN A DRESS - IS A STEREOTYPE',
    button: {
      text: 'SHOP NOW',
      url: 'catalogue'
    }
  },
  {
    id: 'main_swiper_3',
    image: main.swiper3,
    text: 'IN WHICK COLOR CELEBRATE NEW 2018 YEAR?',
    button: {
      text: 'SHOP NOW',
      url: 'catalogue'
    }
  }
];

export const ROW_DATA = [
  {
    id: 'main_row_1',    
    image: main.mens,
    text: 'MEN‘ S',
  },
  {
    id: 'main_row_2',
    image: main.womans,
    text: 'WOMEN‘ S',
  },
  {
    id: 'main_row_3',
    image: main.juniors,
    text: 'JUNIOR‘ S',
  }
];