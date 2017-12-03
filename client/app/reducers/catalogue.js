import { setFilter, setAllClothings } from '../actions';

const initialState = {
  filter: '',
  topic: '',
  allData: [],
  filteredData: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case setFilter:
      return {
        ...state,
        filter: action.filter
      };
    case setAllClothings: 
      return {
        ...state,
        allData: action.data
      }
    default:
      return state;
  }
}
