import { setFilter, setTopic, setAllClothings, setCurrentClothingItem, addToAllClothings } from '../actions';

const initialState = {
  filter: 'All',
  topic: 'All',
  allData: [],
  filteredData: [],
  currentClothingItem: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case setFilter:
      return {
        ...state,
        filter: action.filter
      };
    case setTopic:
      return {
        ...state,
        filter: action.topic
      };
    case setAllClothings: 
      return {
        ...state,
        allData: action.data
      }
    case setCurrentClothingItem:
      return {
        ...state,
        currentClothingItem: action.item
      }
    case addToAllClothings: {
      const data = state.allData;
      data.push(item);
      return {
        ...state,
        allData: data
      }
    }
    default:
      return state;
  }
}
