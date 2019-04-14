import Store from '../store/produits';

export const initialState = Store;

export default function produitsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_DEFAULT_PRODUITS': {
      return {
        ...state,
        produits: action.data,
      };
    }
    default:
      return state;
  }
}
