import Store from '../store/commandes';

export const initialState = Store;

export default function commandesReducer(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_COMMANDES': {
      return {
        ...state,
        commandes: action.data,
      };
    }
    default:
      return state;
  }
}
